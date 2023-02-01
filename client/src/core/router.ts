import { frontURL } from "@/constants";
import { $, closest } from "@/utils/dom";

let currentObserver = null;

export const routerObserve = (selector: Function, cf: Function): void => {
    currentObserver = cf;
    selector();
    currentObserver = null;
};

/**
  *  React에서 페이지 전환할때 react-router는 history.push를 통해 마치
  *  SSR 처럼 브라우저 주소를 바꿔주고 동시에 Root 엘리먼트의 내용물도 바꿔주는데,
  *  JS, TS에서 구현할 때는 history.pushState를 사용하자! -> 페이지 이동없이 주소만 변경
  *  브라우저 페이지를 이동하게 되면 window.onpopstate 라는 이벤트가 발생하게 되는데, pushState 를 했을때는 popstate 이벤트가 발생하지않고, 
  *  뒤 / 앞으로 가기를 클릭 했을때 popstate 이벤트가 발생하게 된다.
  *  즉, pushState 와 popstate 둘을 이용하여 SPA 의 페이지 전환을 구현할 수 있다.
  *  기본 형태 - history.pushState(state, title, url);
  *  - State : 브라우저 이동 시 넘겨줄 데이터 (popstate 에서 받아서 원하는 처리를 해줄 수 있음)
  *  - Title : 변경할 브라우저 제목 (변경 원치 않으면 null)
  *  - Url : 변경할 주소
*/
class Router<IPage> {
    protected observers: Set<Function>;
    constructor(readonly pages: IPage) {
        this.bindEvents();
        this.observers = new Set();
    }

    public pathList(): string[] {
        const list = this.pathname().split("/");
        list.shift();
        return list;
    }

    public pathname(): string {
        if (currentObserver) this.observers.add(currentObserver);
        return (
            history.state?.href ?? window.location.href.replace(frontURL, "")
        );
    }

    public back(): void {
        const prevhref = history.state?.prevhref;
        if (!prevhref) return;
        this.push(prevhref);
    }

    public push(href: string): void {
        const prevhref = "/" + this.pathList()[0];
        history.pushState({ href, prevhref }, null, href);
        this.render();
    }

    /**
     *  Anchor Tag 클릭 이벤트를 처리용.
     *  e.preventDefault() , e.stopPropagation()
     *  html에서 a태그나 submit 태그는 고유의 동작이 있죠 페이지를 이동시키거나 form 안의 Input을 전송한다거나?
     *  - e.preventDefault()는 새로고침을 막아 -> spa를 사용하는 사용자 경험을 좋게합니다.
     *  - e.stopPropagation()는 이벤트가 상위 엘리먼트에 전달되지 않게 막아줘요.
     *
     *  - HTMLAnchorElement 인터페이스 : 하이퍼링크(hyperlink) 기능 a태그를 다루며 이러한 기능을 위한 특별한 속성과 메소드를 제공하는 인터페이스
     */
    private bindEvents(): void {
        window.addEventListener("click", (e: Event) => {
            e.preventDefault();
            const target = e.target as HTMLElement;
            const anchor = closest(target, "a") as HTMLAnchorElement;
            if (!anchor) return;

            const link = anchor.href.replace(frontURL, "");
            this.push(link);
        });

        window.addEventListener("popstate", () => this.render());
    }

    // history.state에 저장되어있는 경로, 이전 경로를 불러와 이전경로를 언마운트 해줍니다.
    private unmount(): void {
        if (!history.state) return;
        const { href, prevhref } = history.state;
        if (href === prevhref) return;
        this.pages[prevhref].componentWillUnmount();
    }

    // 현재 경로에 대해 지금 노드와 자식 노드에게 
    private render(): void {
        this.unmount();
        const href = `/${this.pathList()[0]}`;
        const $main = $("main");
        $main.innerHTML = "";
        if (this.pages[href]) {
            $main.appendChild(this.pages[href].mount());
        }
        //구독자에게 알림 해당 랜더를 한 모든 컴포넌트 클래스에게 발행합니다.
        this.observers.forEach((observer) => observer()); 
    }
}

export default Router;
