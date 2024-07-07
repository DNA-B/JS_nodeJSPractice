# Request Body
- 바닐라 js에서는 request body를 얻어내는 것이 express.js보다 번거롭다.
    
    ```jsx
    // Route Handler for POST /api/users
    const createUserHandler = (req, res) => {
        let body = "";
        // Listen for data
        req.on("data", (chunk) => {
            body += chunk.toString();
        });
        req.on("end", () => {
            const newUser = JSON.parse(body);
            users.push(newUser);
            res.statusCode = 201;
            res.write(JSON.stringify(newUser));
            res.end();
        });
    };
    ```
    
    - body 변수에 request body의 `chunk`를 하나씩 더해주어야 한다.
    - 이후 js 객체로 변환시켜주기 위해 `JSON.parse(body)`를 해주고 데이터베이스에 추가해준다.
    - POST의 성공 코드는 201