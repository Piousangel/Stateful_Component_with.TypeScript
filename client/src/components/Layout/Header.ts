import Component from "@/core/component";
import { newElement } from "@/utils/dom";

class Header extends Component {
    protected initDom(): void {
        this.$container = newElement(`<header class="wrapper"/>`);
    }

    protected initChildren(): void {}

    protected render(): void {
        this.$container.innerHTML = `<h1>Header</h1>`;
    }
}

export default Header;
