/**
 *  Intersection Observer API
 *  페이지 스크롤 시 이미지를 Lazy-loading(지연 로딩)할 때
 *  Infinite scrolling(무한 스크롤)을 통해 스크롤할 때 새로운 콘텐츠를 불러올 때
 */

interface IOptions {
    $root: Element;
    rootMargin: string;
    threshold: number;
}

/**
 *   callback : 타켓 Element가 교차되었을 때 실행할 함수
 *   entries: IntersectionObserverEntr객체의 리스트
 *   배열 형식으로 반환하기 때문에 forEach를 사용해서 처리를 하거나, 단일 타겟의 경우 배열인 점을 고려해서 코드를 작성해야 해요.
 *   
 *   options
 *   - root
 * 
 *   threshold
 *   - default: 0
 *   0.0부터 1.0 사이의 숫자 혹은 이 숫자들로 이루어진 배열로, 타겟 엘리먼트에 대한 교차 영역 비율을 의미해요.
 *   0.0의 경우 타겟 엘리먼트가 교차영역에 진입했을 시점에 observer를 실행하는 것을 의미하고, 
 *   1.0의 경우 타켓 엘리먼트 전체가 교차영역에 들어왔을 때 observer를 실행하는 것을 의미해요
 * 
 *   IntersectionObserver.observe(targetElement)
 *   타겟 엘리먼트에 대한 IntersectionObserver를 등록할 때(관찰을 시작할 때) 사용해요
 */

class IO {
    constructor(options: IOptions, $target: Element, readonly cb: Function) {
        const observer = new IntersectionObserver(
            this._onObserve.bind(this),
            options
        );
        observer.observe($target);
    }

    private _onObserve(entries: IntersectionObserverEntry[]): void {
        if (entries[0].isIntersecting) this.cb();
    }
}
