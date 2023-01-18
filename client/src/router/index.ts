import { PATH } from "@/constants";
import Component from "@/core/component";
import Router from "@/core/router";
import { Home } from "@/pages";
import Category from "@/pages/Category";

type IPage = Record<PATH, Component>;

const router = new Router<IPage>({
    [PATH.HOME]: new Home(),
    [PATH.POPULARITY]: new Category(),
    [PATH.NEWS]: new Category(),
    [PATH.SPORTS]: new Category(),
    [PATH.WEBTOON]: new Category(),
    [PATH.DICTIONARY]: new Category(),
});

export default router;
