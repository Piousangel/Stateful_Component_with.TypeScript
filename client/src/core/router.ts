import { frontURL } from "@/constants";
import { $, closest } from "@/utils/dom";
import { HtmlTagObject } from "html-webpack-plugin";

let currentObserver = null;

export const routerObserve = (selector: Function, cb: Function): void => {
    currentObserver = cb;
    selector();
    currentObserver = null;
};

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

    /**
        React에서 페이지 전환할때 react-router는 history.push를 통해 마치
        SSR 처럼 브라우저 주소를 바꿔주고 동시에 Root 엘리먼트의 내용물도 바꿔주는데,
        JS, TS에서 구현할 때는 history.pushState를 사용하자! -> 페이지 이동없이 주소만 변경
        브라우저 페이지를 이동하게 되면 window.onpopstate 라는 이벤트가 발생하게 되는데, pushState 를 했을때는 popstate 이벤트가 발생하지않고, 뒤 / 앞으로 가기를 클릭 했을때 popstate 이벤트가 발생하게 된다.
        즉, pushState 와 popstate 둘을 이용하여 SPA 의 페이지 전환을 구현할 수 있다.
        기본 형태 - history.pushState(state, title, url);
        State : 브라우저 이동 시 넘겨줄 데이터 (popstate 에서 받아서 원하는 처리를 해줄 수 있음)
        Title : 변경할 브라우저 제목 (변경 원치 않으면 null)
        Url : 변경할 주소
     */
    public push(href: string): void {
        const prevhref = "/" + this.pathList()[0];
        history.pushState({ href, prevhref }, null, href);
        this.render();
    }

    /**
     *  e.preventDefault() , e.stopPropagation()
     *
     *  html에서 a태그나 submit 태그는 고유의 동작이 있죠 페이지를 이동시키거나 form 안의 Input을 전송한다거나?
     *  - e.preventDefault()는 그 동작을 중단시킵니다.
     *  - e.stopPropagation()는 이벤트가 상위 엘리먼트에 전달되지 않게 막아줍니다.
     *
     *  - HTMLAnchorElement 인터페이스 : 하이퍼링크(hyperlink) 기능을 갖는 요소(<a>)를 다루며 이러한 기능을 위한 특별한 속성과 메소드를 제공하는 인터페이스
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
    }

    private unmount(): void {
        if (!history.state) return;
        const { href, prevhref } = history.state;
        if (href === prevhref) return;
        this.pages[prevhref].componentWillUnmount();
    }

    /**
     *  history.state로 라우팅 기능을 구현했어요.
     *  popstate 이벤트와, Anchor Tag 클릭 이벤트를 처리해요.
     *  Props로 페이지 컴포넌트를 받아와서, 요청받은 주소에 따른 페이지를 마운팅/언마운팅을 해요.
     *  새로고침 했을 경우에는 webpack historyApiFallback 설정을 통해 해당 페이지를 제공해요.
     */
    private render(): void {
        this.unmount();
        const href = `/${this.pathList()[0]}`;
        const $main = $("main");
        $main.innerHTML = "";
        if (this.pages[href]) {
            $main.appendChild(this.pages[href].mount());
        }
        this.observers.forEach((observer) => observer());
    }
}

export default Router;
