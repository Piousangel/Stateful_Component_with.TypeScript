import { UPDATE_MENUBAR_REQUEST } from "@/actions/menubar";
import Component from "@/core/component";
import menuBarStore from "@/stores/menubarStore";
import { newElement } from "@/utils/dom";

interface MenuBarState {
    data: {
        interest: boolean;
        bookMark: boolean;
    };
}

class MenuBar extends Component<{}, MenuBarState> {
    protected useSelector() {
        return menuBarStore.getState();
    }

    protected initDom(): void {
        this.$container = newElement(`<aside class="collect_sidebar"/>`);
    }

    protected bindEvents(): void {
        this.rootEvent("click", (e: Event) => this.handleButtonClick(e));
    }

    private handleButtonClick({ target }): void {
        const id = target.id;
        const { data } = this.useSelector();
        const value = data[id];
        menuBarStore.dispatch(UPDATE_MENUBAR_REQUEST([id, value]));
    }

    protected render(): void {
        const { data } = this.useSelector();
        this.$container.innerHTML = `
        <nav>
          <ul>
            <li class=${data.interest ? "selected" : ""}>
              <div>
                <button id="interest">
                  <i class="nav_icon interest"></i>
                  관심사 선택
                </button>
              </div>
            </li>
            <li class=${data.bookMark ? "selected" : ""}>
              <div>
                <button id="bookMark">
                  <i class="nav_icon saved"></i>
                  저장한 콘텐츠
                </button>
              </div>
            </li>
          </ul>
        </nav>
        `;
    }
}

export default MenuBar;
