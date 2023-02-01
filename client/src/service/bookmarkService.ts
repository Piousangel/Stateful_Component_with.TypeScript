import { bookmarkStorage } from "@/storage";
import { GET_BOOKMARK_SUCCESS, ADD_BOOKMARK_SUCCESS } from "@/actions/bookmark";
import bookMarkStore from "@/stores/bookMarkStore";
import { Contents } from "@/types";

const bookmarkService = {
    getBookmark: (): void => {
        const data = bookmarkStorage.get();
        bookMarkStore.dispatch(GET_BOOKMARK_SUCCESS(data));
    },
    addBookmark: (data: Contents): void => {
        const updatedData = [data, ...bookmarkStorage.get()];
        bookmarkStorage.set(updatedData);
        bookMarkStore.dispatch(ADD_BOOKMARK_SUCCESS(updatedData));
    },
};

export default bookmarkService;