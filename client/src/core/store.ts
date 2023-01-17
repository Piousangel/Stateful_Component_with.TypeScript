let currentObserver = null;

export const storeObserve = (selector: Function, cb: Function): void => {
    currentObserver = cb;
    selector();
    currentObserver = null;
};

/**
 *  주로 상속을 통해 사용하려고 해요.
 */
class Store<Istate> {
    protected state: Istate;
    protected reducer: Record<string, Function>;
    protected observers: Set<Function>;


    constructor(initState: Istate) {
        this.state = initState;
        this.observers = new Set();
    }

    /**
     *  해당 스토어의 리듀서의 타입과 props로 받을 데이터를 통해 리덕스로 사용할 수 있어요!
     */
    public dispatch({ type, data = null }): void {
        this.reducer[type]({ data });
    }

    public getState(): Istate {
        if (currentObserver) {
            this.observers.add(currentObserver);
        }
        return this.state;
    }

    protected setState(nextState: Istate): void {
        this.state = nextState;
        this.observers.forEach((observer) => observer());
    }
}

export default Store;
