class Component<IProps = unknown, IState = unknown> {
    protected $container: HTMLElement = document.createElement("div");
    protected initDom(): void {}
}

export default Component;
