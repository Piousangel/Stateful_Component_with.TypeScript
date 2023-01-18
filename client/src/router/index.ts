import { PATH } from "@/constants";
import Component from "@/core/component";
import Router from "@/core/router";
import { Home } from "@/pages";
// import Category from "@/pages/Category";

type IPage = Record<PATH, Component>;

const router = new Router<IPage>({
    [PATH.HOME]: new Home(),
    [PATH.POPULARITY]: new Home(),
    [PATH.NEWS]: new Home(),
    [PATH.SPORTS]: new Home(),
    [PATH.WEBTOON]: new Home(),
    [PATH.DICTIONARY]: new Home(),
});

export default router;
