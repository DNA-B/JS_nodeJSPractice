# 파일 로드

-   협업을 하다 보면 서로의 폴더 구조와 이름이 다를 확률이 높다.
-   이 경우 상대 경로를 지정하여 서버를 실행할 수 있게 해야 한다.
-   JS에는 기본적으로 지정해 놓은 변수들이 있다. → 이러한 변수들은 이름 앞에 `__`가 붙는다.
    -   `__filename` → 현재 파일의 주소
    -   `__dirname` → 현재 파일이 속해 있는 디렉토리 주소
    -   위의 변수들은 ES module을 사용하는 경우 단순 선언으로 동작하지 않는다. 때문에 변수를 초기화해주어야 한다.
-   위와 같은 문제 때문에 변수를 초기화해야 하는데 이때, url과 path 모듈을 사용한다. 이 둘은 js의 내장 모듈이다.

    ```jsx
    import url from "url";
    import path from "path";
    ```

    ```jsx
    // Get current path
    const __filename = url.fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    console.log(__filename, __dirname);

    // C:\Users\DNA\DEV\nodejs-crash\server.js
    // C:\Users\DNA\DEV\nodejs-crash
    ```

    -   `url` 모듈의 `fileURLToPath`를 통해 현재 파일의 위치를 알 수 있고,
    -   `path`의 `dirname`을 통해 파일이 속해 있는 디렉토리 위치를 알 수 있다.

<br><br>

# Promises

-   이제 이 주소를 바탕으로 파일을 불러와야 한다.

    ```jsx
    import fs from "fs/promises";

    const server = http.createServer(async (req, res) => {
        try {
            // Check if GET request
            if (req.method === "GET") {
                let filePath;
                if (req.url === "/") {
                    filePath = path.join(__dirname, "public", "index.html");
                } else if (req.url === "/about") {
                    filePath = path.join(__dirname, "public", "about.html");
                } else {
                    throw new Error("Not Found");
                }
                const data = await fs.readFile(filePath);
                res.setHeader("Content-Type", "text/html");
                res.write(data);
                res.end();
            } else {
                throw new Error("Method not allowed");
            }
        } catch (error) {
            res.writeHead(500, { "Content-Type": "text/plane" });
            res.end("Server Error");
        }
    ```

    -   `fs` → file system이다. fs는 `'fs'`가 있고, `'fs/promises'`가 있다. 쉽게 생각해서 동기, 비동기로 생각하면 좋을 것 같다.
    -   비동기 작업을 순차적으로 실행하기 위해 JavaScript에서는 콜백 함수를 사용한다. 콜백 함수는 특정 로직이 끝났을 때 원하는 코드를 실행할 수 있다. 하지만 콜백에 또 콜백을 계속 호출하게 되면 코드가 복잡해지고 에러도 처리하기 어렵다.
    -   **Promise는 비동기 함수가 반환하는 객체이다**. 함수의 성공 또는 실패 상태를 알려준다. 콜백을 직접 호출하는 방법 대신, Promise로 콜백을 부를 수 있다.
    -   이런 특징 때문에 Promise를 사용하면 비동기 처리 시점, 비동기 함수의 결과를 쉽게 확인할 수 있고, 에러도 어디서 일어났는지 파악하기 편리하다.
    -   Promsie가 대기 상태에서 상태가 바뀌면 `then()`, `catch()` 함수를 사용해서 성공 상태의 Promise, 실패 상태의 Promise를 각각 처리할 수 있다.
    -   하지만 Promise에도 콜백과 비슷한 문제가 일어날 수 있다. `then()` 체인을 길게 이어 나가면 콜백 체인과 마찬가지로 코드의 가독성이 떨어지고 에러가 어디서 일어났는지 보기 어렵다.

<br><br>

# async/await

```jsx
http.createServer(async (req, res) => …
	const data = await fs.readFile(filePath);
```

-   위 코드의 일부분을 가져왔다. `async`를 함수 앞에 붙이면, **“이 함수는 비동기적인 함수이고 Promise를 반환한다”라고 선언하는 것**. 반환 값이 Promise 생성 함수가 아니어도 반환되는 값을 Promise 객체에 넣는다.
-   `await`는 `async` 함수 안에만 사용할 수 있는 특별한 문법이다. Promise를 반환하는 함수 앞에 `await`를 붙이면, 해당 Promise의 상태가 바뀔 때까지 기다린다. **Promise가 성공 상태 또는 실패 상태로 바뀌기 전까지는 다음 연산을 시작하지 않는 것.**
-   사실상 `await`는 `then()`과 같은 역할을 하는데, 콜백 함수를 등록할 필요가 없기 때문에 더 편리하다. 체이닝으로 인해 코드가 복잡해질 일도 없다.

<br><br>

# 간단한 API 작성

```jsx
// server2.js

import { create } from "domain";
import { createServer } from "http";

const PORT = process.env.PORT;
const users = [
    { id: 1, name: "BSH" },
    { id: 2, name: "DNA" },
    { id: 3, name: "GOOD" },
];

const server = createServer((req, res) => {
    res.setHeader("Content-Type", "application/json");

    if (req.url === "/api/users" && req.method === "GET") {
        res.write(JSON.stringify(users));
        res.end();
    } else if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === "GET") {
        const id = req.url.split("/")[3];
        const user = users.find((user) => user.id === parseInt(id));

        if (user) {
            res.write(JSON.stringify(user));
        } else {
            res.statusCode = 404;
            res.write(JSON.stringify({ message: "User Not Found" }));
        }
    } else {
        res.statusCode = 404;
        res.write(JSON.stringify({ message: "Route Not Found" }));
    }

    res.end();
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

-   보기만해도 코드가 복잡해 보인다. express.js를 사용하면 더 간단하게 코드 작성이 가능하지만, 바닐라 js에서는 위와 같이 코드의 중복도 많고, 전체적으로 가독성이 떨어진다.
-   특히 가장 큰 문제점은 개별 유저를 검색하는 api인 `/api/users/{user_id}` 주소를 사용하는 api를 만들려면 정규식을 통해 `else if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === "GET")`와 같이 써주어야 한다는 점이다.
