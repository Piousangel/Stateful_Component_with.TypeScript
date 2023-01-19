import { Action, Category, ContentsList } from "@/types";
import actions from ".";

export const GET_CONTENTS_REQUEST = (data: Category): Action => {
    return { type: actions.GET_REQUEST, data };
};

export const GET_CONTENTS_SUCCESS = (data: ContentsList): Action => {
    return { type: actions.GET_SUCCESS, data };
};

export const GET_CONTENTS_FAIL = (error: string): Action => {
    return { type: actions.GET_FAIL, error };
};
