import Component from "@/core/component";
import { interestCategoryStorage } from "@/storage";
import { Category } from "@/types";
import { newElement } from "@/utils/dom";

class Contents extends Component<{ data: boolean }> {
    protected initDom(): void {
        this.$container = newElement(`<section class="collect_container"/>`);
    }

    protected bindEvents(): void {
        this.rootEvent("click", (e: Event) => this.handleButtonClick(e));
    }

    private handleButtonClick({ target }): void {
        const id = target.id;
        const interestCategories = interestCategoryStorage.get();
        let updateInterestCategories: Category[] = [];

        if (interestCategories.includes(id)) {
            updateInterestCategories = interestCategories.filter(
                (element) => element != id
            );
        } else {
            updateInterestCategories = [...interestCategories, id];
        }
        interestCategoryStorage.set(updateInterestCategories);

        this.updateComponent();
    }

    protected render(): void {
        const interestCategories = interestCategoryStorage.get();

        this.$container.innerHTML = `
    <div class="title_wrap">
      <h2>관심사 선택</h2>
      
      <p class="interest_notice">
        <i class="icon"></i>
        <strong>관심사를 선택</strong>해주세요! 선택한 관심사의 최신 이슈를&nbsp;
        <strong>내 피드에서 확인</strong>하실 수 있습니다.
      </p>
    </div>

    <div class="interest_list">
      <ul>
        <li>
          <div>
            <button id="popularity" class=${
                interestCategories.includes("popularity") ? "selected" : ""
            }>
              <i class="icon popular"></i>
                인기
              <span class="blind"></span>
            </button>
          </div>
        </li>
        <li>
          <div>
            <button id="news" class=${
                interestCategories.includes("news") ? "selected" : ""
            }>
              <i class="icon economy"></i>
                뉴스
              <span class="blind"></span>
            </button>
          </div>
        </li>
        <li>
          <div>
            <button id="sports" class=${
                interestCategories.includes("sports") ? "selected" : ""
            }>
              <i class="icon sports "></i>
                스포츠
              <span class="blind"></span>
            </button>
          </div>
        </li>
        <li>
          <div>
            <button id="webtoon" class=${
                interestCategories.includes("webtoon") ? "selected" : ""
            }>
              <i class="icon culture"></i>
                웹툰
              <span class="blind"></span>
            </button>
          </div>
        </li>
        <li>
          <div>
            <button id="dict" class=${
                interestCategories.includes("dict") ? "selected" : ""
            }>
              <i class="icon biz"></i>
                사전
              <span class="blind"></span>
            </button>
          </div>
        </li>
      </ul>
    </div>

      `;
    }
}

export default Contents;
