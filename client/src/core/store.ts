let currentObserver = null;

export const storeObserve = (selector: Function, cb: Function): void => {
    currentObserver = cb;
    selector();
    currentObserver = null;
};

class Store<Istate> {
    protected state: Istate;
    protected reducer: Record<string, Function>;
    protected observers: Set<Function>;

    constructor(initState: Istate) {
        this.state = initState;
        this.observers = new Set();
    }

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
