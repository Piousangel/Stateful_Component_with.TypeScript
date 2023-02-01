/**
 *
 *  유틸 폴더에는 여러 계산이나 처리를 대신하는 변수를 모아놨습니다.
 */

/**
 *  querySelector를 통해 태그를 쉽게 찾으려고 만들어 사용했어요.
 */
export const $ = (
    selector: string,
    target: Document | HTMLElement = document
): HTMLElement => target.querySelector(selector) as HTMLElement;

/**
 *
 *  현재 element에서 가장 가까운 조상노드을 반환해요!
 *  만약 조상노드가 없다면 null을 반환합니다.
 */
export const closest = (target: HTMLElement, selector: string): HTMLElement =>
    target.closest(selector) as HTMLElement;

/**
 *  템플릿 엔진들은 문자열로 처리되기에 어쩔 수 없는 문제점들을 내포해요.
 *  XSS 공격 노출 위험, innerHTML 사용의 강제...
 *  Template Element는 자바스크립트 코드로 많은 양의 코드를 적지 않아도 됨.
 *  조건에 따라 DOM 변경 가능
 *  스크립트와 스타일도 포함한다.
 *  new Element를 만들 때, Template Element로 해당 태그를 감싸 반환하려고 해요!
 *  요소는 페이지를 불러온 순간 즉시 그려지지는 않지만, 이후 JavaScript를 사용해 인스턴스를 생성
 */
export const newElement = (element: string): HTMLElement => {
    const template = document.createElement("template");
    template.innerHTML = element;
    return template.content.children[0] as HTMLElement;
};
