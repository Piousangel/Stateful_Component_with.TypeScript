import { GET_CONTENTS_FAIL, GET_CONTENTS_SUCCESS } from "@/actions/contents";
import api from "@/api";
import contentsStore from "@/stores/contentStore";

const contentService = {
    getContents: async (): Promise<void> => {
        try {
          const data = await api.getContents();
          contentsStore.dispatch(GET_CONTENTS_SUCCESS(data));
        } catch (error) {
          contentsStore.dispatch(GET_CONTENTS_FAIL(error));
        }
      },
}

export default contentService;