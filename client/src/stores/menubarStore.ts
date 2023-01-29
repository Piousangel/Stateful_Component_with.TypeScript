import actions from "@/actions";
import { menuSelector } from "@/constants";
import Store from "@/core/store";


interface MenuBarState {
    data: {
        interest: boolean;
        bookMark: boolean;
    };
}

const initialState: MenuBarState = {
    data: {
        interest: true,
        bookMark: false,
    },
};

class MenuBarStore extends Store<MenuBarState> {
    protected reducer = {
        [actions.GET_REQUEST]: ({ data }): void => {
            const target: string = data[0];
            const isMarked: boolean = data[1];
            const noneTarget =
                target === menuSelector.interest
                    ? menuSelector.bookMark
                    : menuSelector.interest;

            this.setState({
                ...this.state,
                data: {
                    ...this.state.data,
                    [target]: !isMarked,
                    [noneTarget]: isMarked,
                },
            });
        },
    };
}

const menuBarStore = new MenuBarStore(initialState);
export default menuBarStore;
