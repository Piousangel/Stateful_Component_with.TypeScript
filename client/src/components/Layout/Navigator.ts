import { CategoryTitle, PATH } from "@/constants";
import Component from "@/core/component";
import router from "@/router";
import { newElement } from "@/utils/dom";

class Navigator extends Component {
    protected usePathName(): string {
        return router.pathname();
    }

    protected initDom(): void {
        this.$container = newElement(`<div class="wrap"/>`);
    }

    private checkPath(path: string): boolean {
        return this.usePathName() === path;
    }

    protected render(): void {
        this.$container.innerHTML = `
      <div class="inner">
      <nav class="tabs">
        <ul>
          <li class="selected">
            <a href="/">
              HOME
            </a>
          </li>
          <li class=${this.checkPath(PATH.MYFEED) ? "marked" : "selected"}>
            <a href="${PATH.MYFEED}">
              ${CategoryTitle.myfeed}
            </a>
          </li>
          <li class=${this.checkPath(PATH.POPULARITY) ? "marked" : "selected"}>
            <a href="${PATH.POPULARITY}">
              ${CategoryTitle.popularity}
            </a>
          </li>
          <li class=${this.checkPath(PATH.NEWS) ? "marked" : "selected"}>
            <a href="${PATH.NEWS}">
              ${CategoryTitle.news}
            </a>
          </li>
          <li class=${this.checkPath(PATH.SPORTS) ? "marked" : "selected"}>
            <a href="${PATH.SPORTS}">
              ${CategoryTitle.sports}
            </a>
          </li>
          <li class=${this.checkPath(PATH.WEBTOON) ? "marked" : "selected"}>
            <a href="${PATH.WEBTOON}">
              ${CategoryTitle.webtoon}
            </a>
          </li>
          <li class=${this.checkPath(PATH.DICTIONARY) ? "marked" : "selected"}>
            <a href="${PATH.DICTIONARY}">
              ${CategoryTitle.dict}
            </a>
          </li>
        </ul>
       <nav/>
      <div/>
        `;
    }
}

export default Navigator;
