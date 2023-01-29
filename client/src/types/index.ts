export interface PageInfo {
    title: string;
    href: string;
}

export interface Contents {
    index: number;
    category: string;
    link: string;
    origin: string;
    isBookMarked: boolean;
}

export const Categories = {
    myfeed: "myfeed",
    popularity: "popularity",
    news: "news",
    sports: "sports",
    webtoon: "webtoon",
    dict: "dict",
} as const;

export type Category = typeof Categories[keyof typeof Categories];

export enum ApiStatus {
    LOADING = "LOADING",
    DONE = "DONE",
    FAIL = "FAIL",
}

export interface ContentsList {
    contents: Contents[];
    hasMore: boolean;
    lastKey: number;
}

export interface Action<T = unknown> {
    type: string;
    data?: T;
    error?: string;
}
