import Layout from "./components/Layout";
import Component from "./core/component";
import router from "./router";
import { $ } from "./utils/dom";

class App extends Component {
    protected initDom(): void {
        this.$container = $("#app");
    }

    protected initChildren(): void {
        const layout = new Layout();
        this.children = [layout];
        this.mount();
        router.push(router.pathname());
    }
}

export default App;
