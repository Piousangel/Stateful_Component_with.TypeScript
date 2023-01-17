import Component from "@/core/component";
import { newElement } from "@/utils/dom";

class Main extends Component {
    protected initDom(): void {
        this.$container = newElement(`<main/>`);
    }
}

export default Main;
