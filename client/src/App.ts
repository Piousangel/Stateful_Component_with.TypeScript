import Component from "./core/component";
import { $ } from "./utils/dom";

class App extends Component {
    protected initDom(): void {
        this.$container = $("#app");
    }
}

export default App;
