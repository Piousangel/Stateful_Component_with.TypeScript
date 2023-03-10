export const frontURL = "http://localhost:3000";
export const backURL = "http://localhost:8080";

export enum PATH {
    HOME = "/",
    MYFEED = "/myfeed",
    POPULARITY = "/popularity",
    NEWS = "/news",
    SPORTS = "/sports",
    WEBTOON = "/webtoon",
    DICTIONARY = "/dict",
}

export enum CategoryTitle {
    myfeed = "내 피드",
    popularity = "인기",
    news = "뉴스",
    sports = "스포츠",
    webtoon = "웹툰",
    dict = "사전",
}

export const TIMEOUT = 5000;
export const SERVER_ERROR = new Error("Server Error!");

export enum menuSelector {
    interest = "interest",
    bookMark = "bookMark",
}
