import { Action } from "@/types";
import actions from ".";

export const UPDATE_MENUBAR_REQUEST = (data): Action => {
    return { type: actions.GET_REQUEST, data };
};
