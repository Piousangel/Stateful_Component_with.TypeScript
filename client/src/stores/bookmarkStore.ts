import actions from "@/actions";
import { GET_CONTENTS_SUCCESS } from "@/actions/contents";
import { Store } from "@/core";


interface IState {
    data: BookMarkContents[] | null;
}

const initialState: IState = {
    data: [],
};

class BookMarkStore extends Store<IState> {
    protected reducer = {
        [actions.ADD_REQUEST]: ({ data }): void => {
            // contentsStore.dispatch(GET_CONTENTS_SUCCESS(data));
        },
    };
}

const bookMarkStore = new BookMarkStore(initialState);
export default bookMarkStore;
