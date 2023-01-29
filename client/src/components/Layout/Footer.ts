import Component from "@/core/component";
import { newElement } from "@/utils/dom";

class Footer extends Component {
    protected initDom(): void {
        this.$container = newElement(`<footer class="footer"/>`);
    }

    protected render(): void {
        this.$container.innerHTML = `
            <span>저자 : Piousangel </span><br/>
            <span>이메일 : yyh7654@gmail.com</span><br/>
            <span>Copyright 2023. Piousagnel. All Rights Reserved.</span>
        `;
    }
}

export default Footer;
