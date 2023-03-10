import Component from "@/core/component";
import { newElement } from "@/utils/dom";
import Navigator from "./Navigator";

class Header extends Component {
    protected initDom(): void {
        this.$container = newElement(`<header class="wrapper"/>`);
    }

    protected initChildren(): void {
        const navigator = new Navigator();
        this.children = [navigator];
    }

    protected render(): void {
        this.$container.innerHTML = ``;
    }
}

export default Header;
