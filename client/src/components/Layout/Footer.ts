import Component from "@/core/component";
import { newElement } from "@/utils/dom";

class Footer extends Component {
    protected initDom(): void {
        this.$container = newElement(`<footer/>`);
    }

    protected render(): void {
        this.$container.innerHTML = `<h1>Footer</h1>`;
    }
}

export default Footer;
