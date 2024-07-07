# commonJS에서의 export/import

```jsx
// utils.js
function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

function celciusToFahrenheit(celcius) {
    return (celcius * 9) / 5 + 32;
}

module.exports = { generateRandomNumber, celciusToFahrenheit };
```

-   utils.js에서 작성한 함수들을 index,.js에서 사용하고 싶다면 위와 같이 exports를 진행한다.

```jsx
// index.js
const { generateRandomNumber, celciusToFahrenheit } = require("./utils");

console.log(`Random Number: ${generateRandomNumber()}`);
console.log(`Celcius to fahrenheit ${celciusToFahrenheit(36)}`);
```

-   export된 함수들은 index.js에서 import하여 불러올 수 있다.

<br><br>

# ES module을 이용한 export/import

```jsx
// postsController.js
const posts = [
    { id: 1, title: "post one" },
    { id: 2, title: "post two" },
];

const getPosts = () => posts;
export { getPosts };
export const getPostsLength = () => posts.length;
// export default getPosts;
```

-   함수를 작성한 뒤 그냥 export로 보내주기만 하면 된다.
    -   `export const getPosts = () ⇒ posts;`와 같이 람다함수로 바로 보낼 수도 있고
    -   `export { getPosts };`와 같이 중괄호를 이용하여 보낼 수도 있다.
    -   여러 함수 중에서 대표 함수를 설정하기 위해서는 `export default 함수;`로 보내면 된다.

```jsx
// index.js
import { getPosts, getPostsLength } from "./potsController.js";
// import getPosts from "./potsController.js";
console.log(getPosts());
console.log(`data length : ${getPostsLength()}`);
```

-   import를 하기 위해서는 중괄호를 이용하여 함수를 받아오면 된다.
-   그러나 default 함수의 경우 중괄호를 제거해야 한다.
