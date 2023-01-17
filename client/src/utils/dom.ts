export const $ = (
    selector: string,
    target: Document | HTMLElement = document
): HTMLElement => target.querySelector(selector) as HTMLElement;

/**
 * 
 * @param target 
 * @param selector 
 * @returns 
 * 현재 엘리멘트에서 가장 가까운 조상을 반환해요
 * 만약 조상이 없다면 null값을 반환
 */
export const closest = (target: HTMLElement, selector: string): HTMLElement =>
    target.closest(selector) as HTMLElement;

/**
 *  템플릿 엔진들은 유용하지만 문자열로 처리되기에 어쩔 수 없는 문제점들을 내포한다. 
 *  XSS 공격에 노출될 위험이 있으며, innerHTML의 사용이 강제된다. DOM API들을 템플릿에 사용할 수 없어요
 *  이러한 문제들을 해결하기 위해 템플릿의 문자열 처리를 지양하고 엘리먼트로 처리하는 방법으로 Template Element 가 표준으로 만들졌어요
 * @param element 
 * @returns 
 */ 
export const newElement = (element: string): HTMLElement => {
    const template = document.createElement("template");
    template.innerHTML = element;
    return template.content.children[0] as HTMLElement;
};
