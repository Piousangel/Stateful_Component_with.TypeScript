import Component from "@/core/component";
import { newElement } from "@/utils/dom";

class Main extends Component {
    protected initDom(): void {
        this.$container = newElement(`<main/>`);
    }

    protected render(): void {
        this.$container.innerHTML = `<h1>Main</h1>`;
    }
}

export default Main;
