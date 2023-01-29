import actions from "@/actions";
import Store from "@/core/store";
import { contentService } from "@/service";
import { ApiStatus, Categories, Contents } from "@/types";

interface IState {
    status?: ApiStatus;
    data: {
        [Categories.myfeed]: Contents[];
        [Categories.popularity]: Contents[];
        [Categories.sports]: Contents[];
        [Categories.news]: Contents[];
        [Categories.webtoon]: Contents[];
        [Categories.dict]: Contents[];
    };
    category?: typeof Categories;
    error?: string;
}

const initialState: IState = {  
    status: undefined,
    data: {
        [Categories.myfeed]: new Array<Contents>(),
        [Categories.popularity]: new Array<Contents>(),
        [Categories.sports]: new Array<Contents>(),
        [Categories.news]: new Array<Contents>(),
        [Categories.webtoon]: new Array<Contents>(),
        [Categories.dict]: new Array<Contents>(),
    },
    category: undefined,
    error: undefined,
};

class ContentsStore extends Store<IState> {
    protected reducer = {
        [actions.GET_REQUEST]: (): void => {
            contentService.getContents();
        },

        [actions.GET_SUCCESS]: ({ data }): void => {
            const { category } = data;
            this.setState({
                ...this.state,
                status: ApiStatus.DONE,
                data,
            });
        },
        [actions.GET_FAIL]: ({ error }): void => {
            this.setState({ ...this.state, status: ApiStatus.FAIL, error });
        },
    };
}

const contentsStore = new ContentsStore(initialState);
export default contentsStore;
