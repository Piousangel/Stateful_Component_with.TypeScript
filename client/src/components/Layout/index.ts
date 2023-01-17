import Component from "@/core/component";
import { newElement } from "@/utils/dom";
import Header from "./Header";
import Main from "./Main";

class Layout extends Component {
    protected initDom(): void {
        this.$container = newElement(`<div/>`);
    }

    protected initChildren(): void {
        const header = new Header();
        const main = new Main();
    }
}

export default Layout;
