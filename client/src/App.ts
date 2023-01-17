
import Component from "./core/component";
import { $ } from "./utils/dom";


class App extends Component {
    protected initDom(): void {
        this.$container = $("#app");
    }

    protected initChildren(): void {
        const layout = new Layout();
        this.children = [layout];
        this.mount();
        router
        
    }
}

export default App;
