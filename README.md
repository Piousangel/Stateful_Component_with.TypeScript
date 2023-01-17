# 프로젝트 만들어 나가는 과정


# 폴더

- `client`, `server` 폴더를 생성합니다.
- 각 폴더에서 `$ yarn init` 을 통해 `package.json`을 생성합니다.
- client 폴더에서 `$ yarn global add typescript`을 통해 TypeScript를 설치합니다.
- `$ tsc --init`을 통해 셋업 과정을 거칩니다 => `tsconfig.json` 생성됩니다.
-  SPA로써 `public`에 `index.html` => 웹팩으로 번들링 후 빌드 시 `bundle.js` 생성합니다.
-  폴더 구조는 나중에 트리구조로 기록하겠습니다.


### 웹팩 
- `$ yarn add -D webpack webpack-cli webpack-dev-server webpack-merge`을 통해 웹팩 관련 노드 모듈을 생성합니다.
### 웹팩 플러그인, 로더 
- `$ yarn add -D html-webpack-plugin style-loader css-loader mini-css-extract-plugin` => `yarn.lock` 생성됩니다.
- `style-loader`를 사용하는 이유 : `dev`에서는 `css`를 여러 번 수정하더라도 `style`태그에 주입하는 것이 훨씬 빨리 작동하기 때문에 `style-loader`를 사용합니다.
### 바벨
- `$ yarn add -D @babel/core babel-loader` , `yarn add -D @babel/preset-env` (오래된 브라우저에서 동작하기)
### 타입스크립트
`$ yarn add -D typescript @babel/preset-typescript`
