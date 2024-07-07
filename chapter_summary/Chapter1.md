# node.js의 동작

-   V8 JS Engine
    -   C++ 작성된 엔진이며 JS 코드를 기계어 코드로 변환해준다.
-   Non-blocking
    -   node.js는 Event와 callback을 이용하여 비동기를 실현한다.
-   Single Threaded
-   Event Loop
    -   논블로킹 I/O 작업을 수행하기 위해 이벤트 루프를 사용한다.
    -   예를 들어 네트워크 요청을 하면 기다리지 않고 나머지 코드를 실행하며, 요청이 완료되면 콜백을 트리거하여 이벤트 대기열에 추가한다.

<br><br>

# node.js 세팅

```cpp
npm init
```

-   프로젝트를 초기화시킨다.
-   이후, 폴더에서 엔트리 파일을 만들어야 하는데 보통 `index.js`를 사용한다.
-   만약 서버만 존재한다면 window와 document 객체를 사용할 수 없다. 대신 `window → global`, `document → process`로 대체하여 진행한다.
