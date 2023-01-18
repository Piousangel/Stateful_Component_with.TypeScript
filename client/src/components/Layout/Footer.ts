import Component from "@/core/component";
import { newElement } from "@/utils/dom";

class Footer extends Component {
    protected initDom(): void {
        this.$container = newElement(`<footer/>`);
    }

    protected render(): void {
        this.$container.innerHTML = `
        <span>
            This Area is Footer
        </span>
        `;
    }
}

export default Footer;
