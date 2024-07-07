# fs module

```jsx
// import fs, { read } from "fs";
import fs from "fs/promises";

/// readFile() - async callback
// fs.readFile("./test.txt", "utf8", (err, data) => {
//     if (err) throw err;
//     console.log(data);
// });

// // readFileSync() - sync version
// const data = fs.readFileSync("./test.txt", "utf8");
// console.log(data);

//// readFile() - Promise .then()
// fs.readFile("./test.txt", "utf8")
//     .then((data) => {
//         console.log(data);
//     })
//     .catch((err) => {
//         console.log(err);
//     });

// readFile() - async/await
const readFile = async () => {
    try {
        const data = await fs.readFile("./test.txt", "utf8");
        console.log(data);
    } catch (error) {
        console.log(error);
    }
};

// writeFile()
const writeFile = async () => {
    try {
        await fs.writeFile("./test.txt", "Hellow, I am writing to this file");
        console.log("File written to...");
    } catch (error) {
        console.log(error);
    }
};

// appendFile()
const appendFile = async () => {
    try {
        await fs.appendFile("./test.txt", "\nThis is appended text");
        console.log("File appended to...");
    } catch (error) {
        console.log(error);
    }
};

writeFile();
appendFile();
readFile();
```

-   fs → 동기
    -   `fs.readFileSync('./readme.txt')`
-   fs → 비동기
    -   `fs.readFile('./readme.txt', (err, data) => {}`
-   fs/promises → 비동기
    -   `fs.readFile().then().catch()`
-   fs/promises (async, await) → 비동기
    -   `const appendFile = async () => { await …}`

<br><br>

# path module

```jsx
import path from "path";
import url from "url";

const filePath = "./dir1/dir2/test.txt";

// basename() --> print 'text.txt'
console.log(path.basename(filePath));

// dirname() --> print './dir1/dir2'
console.log(path.dirname(filePath));

// extname() --> print '.txt'
console.log(path.extname(filePath));

/* 
parse()
{
  root: '',
  dir: './dir1/dir2',
  base: 'test.txt',
  ext: '.txt',
  name: 'test'
}
*/
console.log(path.parse(filePath));

// C:\Users\DNA\DEV\nodejs-crash\pathDemo.js
// C:\Users\DNA\DEV\nodejs-crash
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__filename + "\n" + __dirname);

// join() --> 운영체제별로 path 구분자 다른 것을 알아서 수정해서 join
// C:\Users\DNA\DEV\nodejs-crash\dir1\dir2\test.txt
const filePath2 = path.join(__dirname, "dir1", "dir2", "test.txt");
console.log(filePath2);

// resolve()
// C:\Users\DNA\DEV\nodejs-crash\dir1\dir2\test.txt
const filePath3 = path.resolve(__dirname, "dir1", "dir2", "test.txt");
console.log(filePath3);
```

-   `join`
    -   여러 인자를 넣으면 하나의 경로를 합쳐 반환.
    -   상대경로를 표시하는 `..` 와 현 위치를 표시하는 `.` 도 반영한 결과를 return
    -   상대경로와 절대경로를 인자로 전달한 경우 이를 반영한 결과를 return
-   `resolve`
    -   오른쪽부터 읽다가 `/folder_nmae` 형태의 path가 등장하면 절대 경로로 인식하고, 그 path를 바로 return한다.
    -   따라서 절대 경로가 아닌 경우 상대경로 형태의 표기(`./folder_name`)하여 절대 경로가 아님을 구분해야 한다.
    -   전달된 인자의 조합으로 절대경로가 생성되지 않으면, working directory를 추가하여 절대경로를 만든다.
    -   어떤 인자도 전달하지 않는다면 현재 working directory 를 return

<br><br>

# OS module

```jsx
import os from "os";

/*
userInfo()
{
  uid: -1,
  gid: -1,
  username: 'DNA',
  homedir: 'C:\\Users\\DNA',
  shell: null
}
*/
console.log(os.userInfo());
// console.log(os.userInfo().username);

// totalmem() --> print 16415313920 (byte)
console.log(os.totalmem());

// freemem() --> print 1683087360 (byte)
console.log(os.freemem());

/*  cpus()
[
  {
    model: 'AMD Ryzen 7 7840HS w/ Radeon 780M Graphics     ',
    speed: 3793,
    times: { user: 33437, nice: 0, sys: 149515, idle: 70368031, irq: 3015 }
  },
  {
    model: 'AMD Ryzen 7 7840HS w/ Radeon 780M Graphics     ',
    speed: 3793,
    times: { user: 21781, nice: 0, sys: 31328, idle: 70497546, irq: 562 }
  },
  .
  .
  .
] */
console.log(os.cpus());
```

-   `freemem()` → 사용 가능한 메모리 용량
-   `cpus()` → 컴퓨터 코어들의 상태

<br><br>

# URL module

```jsx
import url from "url";

const urlString = "https://www.google.com/search?q=hello+world";

/* URL Object
URL {
  href: 'https://www.google.com/search?q=hello+world',
  origin: 'https://www.google.com',
  protocol: 'https:',
  username: '',
  password: '',
  host: 'www.google.com',
  hostname: 'www.google.com',
  port: '',
  pathname: '/search',
  search: '?q=hello+world',
  searchParams: URLSearchParams { 'q' => 'hello world' },
  hash: ''
} s*/
const urlObj = new URL(urlString);
// console.log(urlObj);
// console.log(urlObj.hostname);

// format() --> print String type 'https://www.google.com/search?q=hello+world'
console.log(url.format(urlObj));

// import.meta.url --> print file URL 'file:///C:/Users/DNA/DEV/nodejs-crash/urlDemo.js'
console.log(import.meta.url);

// fileURLToPath() --> print convert file URL to Path 'C:\Users\DNA\DEV\nodejs-crash\urlDemo.js'
console.log(url.fileURLToPath(import.meta.url));

// URLsearchParams() --> print URLSearchParams { 'q' => 'hello world' }
const params = new URLSearchParams(urlObj.search);
console.log(params);
// print 'hello world'
console.log(params.get("q"));

// append() --> print URLSearchParams { 'q' => 'hello world', 'limit' => '5' }
params.append("limit", "5");
console.log(params);

// delete() --> print URLSearchParams { 'q' => 'hello world' }
params.delete("limit");
console.log(params);
```

<br><br>

# crypto module

```jsx
import crypto, { Cipher } from "crypto";
import { CLIENT_RENEG_LIMIT } from "tls";

// createHash() --> print b9c950640e1b3740e98acb93e669c65766f6670dd1609ba91ff41052ba48c6f3
const hash = crypto.createHash("sha256");
hash.update("password1234");
console.log(hash.digest("hex"));

// randomBytes() --> print random string c28ee63bbef70e8ab7cab46115c99e6c
crypto.randomBytes(16, (err, buf) => {
    if (err) throw err;
    console.log(buf.toString("hex"));
});

// createCipheriv & createDecipheriv
const algorithm = "aes-256-cbc";
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

// print encrypte bc33012dc108d3fe870d5bc0f9977b3f
const cipher = crypto.createCipheriv(algorithm, key, iv);
let encrypted = cipher.update("Hello, this is a secret message", "utf8", "hex");
encrypted += cipher.final("hex");
console.log(encrypted);

// print decrypte
const decipher = crypto.createDecipheriv(algorithm, key, iv);
let decrypted = decipher.update(encrypted, "hex", "utf8");
decrypted += decipher.final("utf-8");
console.log(decrypted);
```

-   Hash Algorithm → md5, sha1, sha256, sha512
-   `createHash` → 사용할 해시 알고리즘을 입력한다. `md5,sha1, sha256, sha512`등이 가능하다.
-   `update` → 변환할 문자열을 입력
-   `digest` → 인코딩할 알고리즘을 입력. 주로 `base64, hex, latin1` 사용한다.
-   대칭형 암호화
    -   `createCipher` → 암호화 알고리즘과 key를 넣어준다.
    -   `update` → 암호화 할 문자열과 문자열의 인코딩, 출력 문자열의 인코딩을 입력
    -   `final` → 출력된 문자열의 인코딩을 입력
    -   `createDecipheriv` → 인코딩의 반대

<br><br>

# event module

```jsx
import { EventEmitter } from "events";

const myEmitter = new EventEmitter();

function greetHandler(name) {
    console.log(`Hello World ${name}`);
}

function goodbyeHandler(name) {
    console.log(`Goodbye World ${name}`);
}

// Register event listeners
myEmitter.on("greet", greetHandler);
myEmitter.on("goodbye", goodbyeHandler);

// Emit events
myEmitter.emit("greet", "DNA");
myEmitter.emit("goodbye", "DNA");

// Error handling
myEmitter.on("error", (err) => {
    console.log("An Error Occured: ", err);
});

// Simulate error
myEmitter.emit("error", new Error("Something went wrong"));
```

-   `EventEmitter` → 이벤트 기반 프로그래밍에서 사용하는 클래스
-   `on()` → 이벤트 리스너를 등록하는 함수
-   `emit()` → 등록한 콜백 함수를 실행시키는 함수

<br><br>

# process module

```jsx
/* argv
PS C:\Users\DNA\DEV\nodejs-crash\demo> node .\processDemo.js import
[
  'C:\\Program Files\\nodejs\\node.exe',
  'C:\\Users\\DNA\\DEV\\nodejs-crash\\demo\\processDemo.js',
  'import'
]*/
console.log(process.argv);

// process.env
console.log(process.env);

// process.LOGNAME
console.log(process.env.LOGNAME);

// pid --> print 43380
console.log(process.pid);

// cwd() --> C:\Users\DNA\DEV\nodejs-crash\demo
console.log(process.cwd());

// title --> C:\WINDOWS\System32\WindowsPowerShell\v1.0\powershell.exe
console.log(process.title);

/* memoryUsage()
{
  rss: 27459584,
  heapTotal: 4890624,
  heapUsed: 4476008,
  external: 1699535,
  arrayBuffers: 11670
} */
console.log(process.memoryUsage());

// uptime() --> print 0.0484557
console.log(process.uptime());

// process event listener
process.on("exit", (code) => {
    console.log(`About to exit with code : ${code}`);
});

// exit()
process.exit(0);
```
