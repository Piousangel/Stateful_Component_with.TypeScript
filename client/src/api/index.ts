import { backURL, SERVER_ERROR, TIMEOUT } from "@/constants";

const controller = new AbortController();
const signal = controller.signal;

const request = async (endPoint: string, time: number) => {
    const timer = setTimeout(() => controller.abort(), time);
    const response = await fetch(backURL + endPoint, { signal });
    const data = await response.json();
    if (!response.ok) {
        throw SERVER_ERROR;
    }
    clearTimeout(timer);
    return data;
};

const api = {
    getContents: () => request("/contents", TIMEOUT),
};

export default api;
