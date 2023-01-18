import { PATH } from "@/constants";
import Component from "@/core/component";
import router from "@/router";
import { newElement } from "@/utils/dom";

class Navigator extends Component {
    protected usePathName(): string {
        return router.pathname();
    }

    protected initDom(): void {
        this.$container = newElement(`<nav/>`);
    }

    private checkPath(path: string): boolean {
        return this.usePathName() === path;
    }

    protected render(): void {
        const HOME = "HOME";

        this.$container.innerHTML = `
        <ul class="menu-container">
            <li class=${this.checkPath(PATH.HOME) ? "clicked" : ""}>
                <a data-id="home" href="${PATH.HOME}">
                    ${HOME}
                </a>
            </li>
            <li class=${this.checkPath(PATH.HOME) ? "clicked" : ""}>
                <a data-id="home" href="${PATH.HOME}">
                    ${HOME}
                </a>
            </li>
            <li class=${this.checkPath(PATH.HOME) ? "clicked" : ""}>
                <a data-id="home" href="${PATH.HOME}">
                    ${HOME}
                </a>
            </li>
        </ul>
        `;
    }
}

export default Navigator;
