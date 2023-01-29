import { Contents, MenuBar } from "@/components/Home";
import Component from "@/core/component";
import { newElement } from "@/utils/dom";

class Home extends Component {
    protected initDom(): void {
        this.$container = newElement(`<div class="render"/>`);
    }

    protected initChildren(): void {
        const menuBar = new MenuBar();
        const contents = new Contents();
        this.children = [menuBar, contents];
    }
}

export default Home;
