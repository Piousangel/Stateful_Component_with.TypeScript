import { routerObserve } from "./router";
import { storeObserve } from "./store";

/**
 *  컴포넌트 구현 시, 중복 코드를 줄이고 컴포넌트들이 모두 동일한 라이프 사이클을 가지게 하여 유지보수를 편하게 하기!
 *
 *  옵저버 패턴의 구독, 알림 형태를 차용하여 부모노드의 상태 변경 -> 자식노드 상태 변경
 *  this 는 함수가 호출될 때 마다 각각의 함수에 바인딩 됩니다!
 *
 *  클래스형 컴포넌트의 componenetDidMount, componentDidUpdate, componentWillUnmount 생명주기 차용
 *
 *  ps. prototype 객체는 원형 즉, 원래의 모습이에요. 같은 생성자로부터 만들어진 객체들은 모두 이 원형 객체를 공유해요
 */

class Component<IProps = unknown, IState = unknown> {
    /**
     *   $container : document.createElement("div");
     */
    protected $container: HTMLElement = document.createElement("div");
    protected $observer: HTMLElement;
    protected children: Component[] = [];
    protected props: IProps;
    protected state: IState = {} as IState;
    private events: {
        type: keyof HTMLElementEventMap;
        handler: EventListener;
    }[] = [];

    /**
     * 상속을 통해 사용하려고 해요.
     * 인자로 props를 넘겨받을 수 있어요.
     * setUp()을 실행해요.
     */
    constructor(props?: IProps) {
        this.props = props;
        this.setUp();
    }

    protected useSelector(): void {}
    protected usePathName(): void {}
    protected bindEvents(): void {}
    protected initDom(): void {}
    protected initChildren(): void {}
    protected componentWillMount(): void {}
    protected componentWillUpdate(): void {}
    protected render(): void {}

    protected componentDidUpdate(): void {
        this.children.forEach((child) => child.updateComponent());
    }

    /**
     *   처음 생성자가 만들어지면 seUp()을 실행해요.
     *   initDom, initChilren 함수를 통해
     *   ex) createElement등과 부모 노드, 자식 노드를 연결할 수 있고,
     *   storeObserve, routerObserve를 통해
     *   setUp과정에서
     *   useSelector()에서 스토어의 데이터 사용 유무 확인 -> 값이 변할 때 updateComponent()를 실행해요.
     * , usePathName()에서 라우팅의 pathname이 참조되는지 확인 -> pathname이 변경될 때마다 render()를 실행해요.
     */
    protected setUp(): void {
        this.initDom();
        this.initChildren();
        storeObserve(
            () => this.useSelector(),
            () => this.updateComponent()
        );
        routerObserve(
            () => this.usePathName(),
            () => this.render()
        );
    }

    /**
     *  mount
     *  Component가 새롭게 생성되는 시점이에요.
     *  Component 함수가 실행되고 결과물로 나온 Element들이 가상 DOM에 삽입되고 실제 DOM을 업데이트하기까지 과정이에요.
     *  componentWillMount 컴포넌트가 렌더링 되기 전 실행 / 주로 스토어에 dispatch를 보내는 역할을 해요.
     *  render 컴포넌트 렌더링해요.
     *  bindEvents 필요한 이벤트를 바인딩 해요.
     *
     */
    public mount(): HTMLElement {
        this.componentWillMount();
        this.render();
        this.bindEvents();
        this.children.forEach((child) => {
            this.$container.appendChild(child.mount());
        });
        return this.$container;
    }

    public returnRoot(): HTMLElement {
        return this.$container;
    }

    private renderChildren(): void {
        this.children.forEach((child) => {
            this.$container.appendChild(child.returnRoot());
        });
    }

    /**
     *  updateComponent가 핵심이에요!
     *  해당 컴포넌트와 child에 대해 appendChild 하며 부모노드와 자식노드를 연결해요.
     */
    protected updateComponent(): void {
        this.componentWillUpdate();
        this.render();
        this.renderChildren();
        this.componentDidUpdate();
    }

    /**
     * componentDidMount에서 등록된 이벤트를 DOM에서 제거해요.
     * 부모노드에서 연결된 자식노드까지 removeEventListener를 사용해 제거해요
     */
    public componentWillUnmount(): void {
        this.events.forEach(({ type, handler }) => {
            this.$container.removeEventListener(type, handler);
        });
        this.children.forEach((child) => child.componentWillUnmount());
    }

    /**
     *  HTMLElementEventMap, EventListener를 인자로 받아요
     *  interface HTMLElementEventMap extends ElementEventMap, DocumentAndElementEventHandlersEventMap, GlobalEventHandlersEventMap
     *  ex) this.rootEvent("click", (e: Event) => this.handleButtonClick(e)) 이런식으로 사용하려고 해요.
     *  결국... addEventListner!
     *  이벤트 캡쳐링을 통해 rootEvent를 찾는다?
     *  click이라는 이벤트 타입, 등록할 이벤트 핸들러는 this.handleButtonClick(e)) 란뜻
     *  그리고 addEventListner에 등록한다.
     *  직점 돔에 접근하는 과정?
     */
    protected rootEvent(
        type: keyof HTMLElementEventMap,
        handler: EventListener
    ): void {
        this.events = [...this.events, { type, handler }];
        this.$container.addEventListener(type, handler);
    }

    /**
     *
     *  @param nextState
     *  setState()에서 updateComponent를 호출해요!
     *  setState를 통해 리랜더링 된다고 생각할게요. 왜냐 updateComponent에서 this.render 호출하게 구현했으니..
     *  전역상태가 아닌 Component클래스를 상속받은 클래스와 그 자식 클래스
     */
    public setState(nextState: IState): void {
        this.state = nextState;
        this.updateComponent();
    }
}

export default Component;
