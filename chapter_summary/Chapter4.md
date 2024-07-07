# req Object

```jsx
console.log(req.url);
console.log(req.method);
```

-   Request 객체에는 url과 method 필드가 있다.
-   url은 현재 요청이 들어온 url을 갖고 있고, method는 GET, POST와 같은 http method를 갖고 있다.

<br><Br>

# Router

```jsx
import http from "http";

const PORT = process.env.PORT;
const server = http.createServer((req, res) => {
    try {
        // Check if GET request
        if (req.method === "GET") {
            if (req.url === "/") {
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end("<h1>Homepage</h1>");
            } else if (req.url === "/about") {
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end("<h1>About</h1>");
            } else {
                res.writeHead(404, { "Content-Type": "text/html" });
                res.end("<h1>Not Found</h1>");
            }
        } else {
            throw new Error("Method not allowed");
        }
    } catch (error) {
        res.writeHead(500, { "Content-Type": "text/plane" });
        res.end("Server Error");
    }
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```
