import Component from "@/core/component";
import { newElement } from "@/utils/dom";

class Home extends Component {
    protected initDom(): void {
        this.$container = newElement(`<div class="render"/>`);
    }

    protected initChildren(): void {}
}

export default Home;
