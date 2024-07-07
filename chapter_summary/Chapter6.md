# MiddleWare

-   Request와 Response 객체를 변경해야하는 경우가 있다. 이 때, 미들웨어를 사용할 수 있다.
-   **미들웨어 함수**는 **req(요청)** 객체, **res(응답)** 객체, 그리고 어플리케이션 **요청-응답 사이클** 도중 그 **다음의 미들웨어 함수**에 대한 엑세스 권한을 갖는 함수이다. 간단하게 말하면 클라이언트에서 요청이 오고, 서버가 응답 **중간(미들)에 거쳐가는 함수들**이라고 보면 된다.
-   미들웨어의 특징
    -   모든 코드를 실행
    -   **다음 미들웨어 호출**(미들웨어가 순차적으로 실행)
    -   **res, req 객체 변경 가능**
    -   **요청-응답 주기를 종료**(response methods를 이용)
-   `다음 미들웨어 호출`
    ```jsx
    const logger = (req, res, next) => {
        console.log(`${req.method} ${req.url}`);
        next();
    };
    ```
    -   요청이 들어오면 logger 함수를 먼저 거친 후에 next()를 통해 다음 함수가 실행된다.
-   `req, res` 객체 변경

    ````jsx
    var express = require('express');
    var app = express();

        var requestTime = function (req, res, next) {
          req.requestTime = Date.now();
          next();
        };

        app.use(requestTime);

        app.get('/', function (req, res) {
          var responseText = 'Hello World!';
          responseText += 'Requested at: ' + req.requestTime + '';
          res.send(responseText);
        });

        app.listen(3000);
        ```
    ````

<br><br>

# MiddleWare를 이용한 Cleanup

```jsx
import { create } from "domain";
import { createServer } from "http";

const PORT = process.env.PORT;
const users = [
    { id: 1, name: "BSH" },
    { id: 2, name: "DNA" },
    { id: 3, name: "GOOD" },
];

// Logger middleware
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
};

// JSON middleware
const jsonMiddleware = (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    next();
};

// Route handler for GET /api/users
const getUsersHandler = (req, res) => {
    res.write(JSON.stringify(users));
    res.end();
};

// Route handler for GET /api/users/:id
const getUserByIdHandler = (req, res) => {
    const id = req.url.split("/")[3];
    const user = users.find((user) => user.id === parseInt(id));

    if (user) {
        res.write(JSON.stringify(user));
    } else {
        res.statusCode = 404;
        res.write(JSON.stringify({ message: "User Not Found" }));
    }
};

// Not Found Handler
const notFoundHandler = (req, res) => {
    res.statusCode = 404;
    res.write(JSON.stringify({ message: "Route Not Found" }));
    res.end();
};

const server = createServer((req, res) => {
    logger(req, res, () => {
        jsonMiddleware(req, res, () => {
            if (req.url === "/api/users" && req.method === "GET") {
                getUsersHandler(req, res);
            } else if (req.url.match(/\/api\/users\/([0-9]+)/) & (req.method === "GET")) {
                getUserByIdHandler(res, res);
            } else {
                notFoundHandler(req, res);
            }
        });
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```
