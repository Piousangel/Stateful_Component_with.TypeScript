import { routerObserve } from "./router";
import { storeObserve } from "./store";

/**
 *  코어 폴더 컴포넌트 : 컴포넌트 구현 시, 중복 코드를 줄이고 컴포넌트들이 모두 동일한 라이프 사이클을 가지게 해
 *  유지보수를 편리하게 하기 위한 컴포넌트들의 기본 구조
 *
 *  옵저버 패턴의 구독, 알림 형태를 차용하여 부모의 상태 변경 -> 자식 상태 변경
 *  this 는 함수가 호출될 때 마다 각각의 함수에 바인딩 됩니다!
 * 
 *  자바스크립트 생성자 함수
 *  
 *  ps. prototype 객체는 원형 즉, 원래의 모습이에요. 같은 생성자로부터 만들어진 객체들은 모두 이 원형 객체를 공유해요
 */
class Component<IProps = unknown, IState = unknown> {
    protected $container: HTMLElement = document.createElement("div");
    protected $observer: HTMLElement;
    protected children: Component[] = [];
    protected props: IProps;
    protected state: IState = {} as IState;

    /** events는 type, handle 프로퍼티를 가짐*/
    private events: {
        type: keyof HTMLElementEventMap;
        handler: EventListener;
    }[] = [];

    /**
     * new 클래스 이름으로 생성해서 사용하려고 해요. 
     * 인자로 props를 넘겨받을 수 있어요.
     * setUp()을 실행해요. 
     */
    constructor(props?: IProps) {
        this.props = props;
        this.setUp();
    }

    protected useSeletor(): void {}
    protected usePathName(): void {}
    protected bindEvents(): void {}
    protected initDom(): void {}
    protected initChildren(): void {}
    protected componentWillMount(): void {}
    protected componentWillUpdate(): void {}

    /**
     * 우리가 어떤 DOM을 만들게 될지, 내부에 있는 태그들에 어떤 값을 전달해 줄지 정의
     */
    protected render(): void {}

    protected componentDidUpdate(): void {
        this.children.forEach((child) => child.updateComponent());
    }

    /**
     * initDom -> 해당 컴포넌트의 Container가 될 Element를 등록해요.
     * initChildren -> 자식 컴포넌트를 등록해요.
     * storeObserveruseSelector -> useSelector에서 특정 스토어의 데이터가 쓰이는지 확인, 
     * 쓰인다면 해당 컴포넌트를 스토어의 옵저버로 등록하고, 스토어의 상태값이 변할때마다 updateComponent 메서드를 실행해요.
     * 
     * routerObserverusePathName -> usePathname에서 라우팅의 pathname이 참조되는지 확인하고
     * 참조된다면 해당 컴포넌트를 라우터의 옵저버로 등록 및
     * pathname이 변경될 때 마다 render 메서드 실행하여 리렌더링해요.
     */
    protected setUp(): void {
        this.initDom();
        this.initChildren();
        storeObserve(
            () => this.useSeletor(),
            () => this.updateComponent()
        );
        routerObserve(
            () => this.usePathName(),
            () => this.render()
        );
    }

    /**
     *  브라우저에 나타나게 되면 호출되며, 예를 들어 외부 라이브러리를 사용했을 때, 특정 DOM에 그려주세요, 네트워크 요청, API, Ajax 요청을 할 때 사용해요.
     *  우리가 만든 컴포넌트가 브라우저에 나타난 그 시점에 어떤 작업을 하겠다.
     * 
     *  componentWillMount 컴포넌트가 렌더링 되기 전 실행 / 주로 스토어에 dispatch를 보내는 역할을 해요.
     *  render 컴포넌트 렌더링해요.
     *  bindEvents 필요한 이벤트를 바인딩 해요.
     *  children mounting 등록된 자식 컴포넌트를 마운팅해요.
     */
    public mount(): HTMLElement {
        this.componentWillMount();
        this.render();
        this.bindEvents();

        // 해당 자식들도 mount 시켜줘야 해요!
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
     *   작업을 마치고 컴포넌트가 업데이트 되었을 때 호출되는 함수. 주로 state가 바귀었을 때, 
     *   이전 상태와 지금 상태의 페이지가 바뀌었을 때
     *   this.state.page, pre.state.page 가 다를때 어떤 작업을 해요.
     */
    protected updateComponent(): void {
        this.componentWillMount();
        this.render();
        this.renderChildren();
        this.componentDidUpdate();
    }

    /**
     * componentDidMount에서 등록된 이벤트를 해당 자식까지 모두 없애요. -> 마운트 해제
     */
    public componentWillUnmount(): void {
        this.events.forEach(({ type, handler }) => {
            this.$container.removeEventListener(type, handler);
        });
        this.children.forEach((child) => child.componentWillUnmount());
    }

    /**
     * HTMLElementEventMap, EventListener를 인자로 받아요
     * ex) this.rootEvent("click", (e: Event) => this.handleButtonClick(e)) 이런식으로 사용하려고 해요.
     */
    protected rootEvent(
        type: keyof HTMLElementEventMap,
        handler: EventListener
    ): void {
        this.events = [...this.events, { type, handler }];
        this.$container.addEventListener(type, handler);
    }

    public setState(nextState: IState): void {
        this.state = nextState;
        this.updateComponent();
    }
}

export default Component;
