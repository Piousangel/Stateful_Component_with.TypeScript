import { GET_CONTENTS_REQUEST } from "@/actions/contents";
import { CardList, Error } from "@/components/Shared";
import Loader from "@/components/Shared/Loader";
import Component from "@/core/component";
import router from "@/router";
import { interestCategoryStorage } from "@/storage";
import contentsStore from "@/stores/contentStore";
import { ApiStatus, Category as CategoryType, Contents } from "@/types";
import { newElement } from "@/utils/dom";

interface IState {
    status: ApiStatus | null;
    category: CategoryType;
}

class Category extends Component<{}, IState> {
    protected useSelector() {
        return contentsStore.getState();
    }

    protected initDom(): void {
        this.$container = newElement(`<div class="render"/>`);
        // this.$observer = newElement(`<div class="observer"/>`);
    }

    private handleGetMoreData(): void {
        contentsStore.dispatch(GET_CONTENTS_REQUEST(this.state.category));
    }

    private getInterestContentList(data): Contents[] {
        const interestCategories = interestCategoryStorage.get();
        let interestContentList: Contents[] = [];

        for (let i = 0; i < interestCategories.length; i++) {
            interestContentList.push(...data[interestCategories[i]]);
        }

        return interestContentList;
    }

    private handleButtonClick({ target }): void {
        const id = target.id;
        let { data } = this.useSelector();

        // const bookMarkedContentList = data[this.state.category].filter(
        //     (data) => data.link === id
        // );

        // const getIdex = data[this.state.category].indexOf(
        //     bookMarkedContentList[0]
        // );

        // data[this.state.category][getIdex] = {
        //     ...bookMarkedContentList[0],
        //     isBookMarked: true,
        // };
        // bookMarkedContentList[0].isBookMarked = true;

        // const tempStorage = bookmarkStorage.get();
        // const updateBookMarkedList = [...tempStorage, bookMarkedContentList[0]];

        // bookmarkStorage.set(updateBookMarkedList);
    }

    protected componentWillMount(): void {
        const category = router.pathname().replace("/", "") as CategoryType;

        this.setState({
            ...this.state,
            category,
        });

        this.handleGetMoreData();
    }

    protected render(): void {
        this.rootEvent("click", (e: Event) => this.handleButtonClick(e));

        const { status, data } = this.useSelector();
        const interestContentList = this.getInterestContentList(data);

        const renderByStatus = {
            [ApiStatus.LOADING]: (): string =>
                data[this.state.category]
                    ? `${CardList({
                          contentsList: data[this.state.category],
                      })}`
                    : Loader(),
            [ApiStatus.DONE]: (): string =>
                router.pathname().replace("/", "") === "myfeed"
                    ? CardList({
                          contentsList: interestContentList ?? [],
                      })
                    : CardList({
                          contentsList: data[this.state.category] ?? [],
                      }),
            [ApiStatus.FAIL]: (): string => Error(),
        };
        this.$container.innerHTML = `
          ${status ? renderByStatus[ApiStatus.DONE]() : ""}
          
        `;
    }
}

export default Category;
