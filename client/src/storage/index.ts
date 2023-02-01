import storage from "@/core/storage";
import { Category, Contents } from "@/types";

export const interestCategoryStorage = new storage<Category>("category");
export const bookmarkStorage = new Storage<Contents>("bookmark");
