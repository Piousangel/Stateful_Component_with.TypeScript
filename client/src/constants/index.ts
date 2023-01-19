export const frontURL = "http://localhost:3000";
export const backURL = "http://localhost:8080";

export enum PATH {
    HOME = "/",
    POPULARITY = "/popularity",
    NEWS = "/news",
    SPORTS = "/sports",
    WEBTOON = "/webtoon",
    DICTIONARY = "/dictionary",
}

export enum CategoryTitle {
    popularity = "인기",
    news = "뉴스",
    sports = "스포츠",
    webtoon = "웹툰",
    dict = "사전",
}

export const TIMEOUT = 5000;
export const SERVER_ERROR = new Error("Server Error!");
