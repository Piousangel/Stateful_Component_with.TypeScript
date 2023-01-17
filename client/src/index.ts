import "@/style";
import App from "./App";

const render = () => {
    new App();
};

/**
 *  DOMContentLoaded – 브라우저가 HTML을 전부 읽고 DOM 트리를 완성하는 즉시 발생, 이미지 파일(<img>)이나 스타일시트 등의 기타 자원은 기다리지 않아요.
 *  DOM이 준비된 것을 확인한 후 원하는 DOM 노드를 찾아 핸들러를 등록해 인터페이스를 초기화할 때
 * 
 *  load 이벤트와의 차이점은?
    load는 돔트리 이후 모든 리소스까지 완벽히 끝난 후 발생하는 이벤트
    DOMContentLoaded는 돔트리까지만 형성되면 발생하는 이벤트
 */
window.addEventListener("DOMContentLoaded", render);
