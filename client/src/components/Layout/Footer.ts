import Component from "@/core/component";
import { newElement } from "@/utils/dom";

class Footer extends Component {
    protected initDom(): void {
        this.$container = newElement(`<footer/>`);
    }
}

export default Footer;
