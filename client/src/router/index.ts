import { PATH } from "@/constants";
import Component from "@/core/component";
import Router from "@/core/router";
import { Home } from "@/pages";

type Ipage = Record<PATH, Component>;

const router = new Router<Ipage>({
    [PATH.HOME]: new Home(),
});

export default router;
