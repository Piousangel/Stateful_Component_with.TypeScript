import actions from "@/actions";
import Store from "@/core/store";
import { ApiStatus, Category, Contents } from "@/types";

interface IState {
    status: ApiStatus | null;
    data: {
        [key: string]: {
            contents: Contents[];
        };
    };
    error: string | null;
}

const initialData = {
    hasMore: true,
    lastKey: 0,
    contents: [],
};

const initialState = {
    state: null,
    data: {
        [Category.popularity]: initialData,
        [Category.sports]: initialData,
        [Category.news]: initialData,
        [Category.webtoon]: initialData,
        [Category.dict]: initialData,
    },
    error: null,
};

class ContentsStore extends Store<IState> {

    protected reducer = {
        [actions.GET_REQUEST]: ({ data: category }): void => {
          const { status, data } = this.state;
          const { hasMore, lastKey } = data[category];
          if (!hasMore || status === ApiStatus.LOADING) return;
          this.setState({
            ...this.state,
            status: ApiStatus.LOADING,
          });
          contentsService.getContents(category, lastKey);
        },
        [actions.GET_SUCCESS]: ({ data }): void => {
          const { category, hasMore, lastKey, contents } = data;
    
          const prevContents = this.state.data[category].contents;
          const newData = {
            hasMore,
            lastKey,
            contents: [...prevContents, ...contents],
          };
          this.setState({
            ...this.state,
            status: ApiStatus.DONE,
            data: { ...this.state.data, [category]: newData },
          });
        },
        [actions.GET_FAIL]: ({ error }): void => {
          this.setState({ ...this.state, status: ApiStatus.FAIL, error });
        },
      };
}
