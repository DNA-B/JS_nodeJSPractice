# `npm script`

```jsx
{
    "name": "nodejs-crash",
    "version": "1.0.0",
    "description": "Node.js practice",
    "main": "index.js",
    "type": "module",
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start": "node server.js"
    },
    "author": "DNA",
    "license": "MIT"
}

```

-   `node server.js`말고 `npm` 명령어를 이용해서 프로그램을 실행시켜보자.
    -   `start` → start 명령어 안에 실행할 수 있는 기본적인 서버 혹은 파일의 주소를 넣으면 그 주소를 실행한다.
    -   `run` → npm에 기본적으로 설정된 start(시작), stop(정지), restart(재시작), test(테스트) 이외의 scripts를 실행하는 명령어.
    -   dev는 기본으로 설정된 명령어가 아니기 때문에 run을 이용해서 실행하는 것
-   만약 scripts 내에 아무 명령어도 없다면 `npm start` 입력시 자동으로 `node server.js`가 실행된다.

<br><br>

# nodemon

-   업데이트를 반영하기 위해 서버를 계속 껐다 키는 것이 매우 번거롭다.
-   여기서 nodemon이라는 module을 설치하면 서버를 켜놓아도 업데이트를 반영해준다.

```jsx
npm i -D nodemon
```

-   D 옵션을 추가한 경우 devDependencies에 패키지들이 추가된다.
-   이 경우, --production 옵션을 추가하여 배포할 프로젝트를 빌드할 때, devDependencies에 있는 패키지들은 포함되지 않는다.
-   `npm install`을 진행하면 `node_modules` 폴더가 생성되는데 이 거대한 폴더를 github에 올리지 않아도 된다.
-   github에서 pull을 하여 `package.json`을 받아왔다면 `npm install`만 실행하여 dependency에 적혀있는 module을 설치할 수 있기 때문이다.

```jsx
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start": "nodemon server.js"
    }
```

-   nodemon을 설치했다면 start의 `node`를 `nodemon`으로 바꿔주면 된다.
-   이후 `npm start`를 통해 서버를 실행하면 프로그램을 껐다 키지 않아도 업데이트가 자동으로 반영된다.

<br><br>

# `node --watch`
```jsx
    "scripts": {
        "start": "node server.js",
        "dev": "node --watch server.js"
    }
```

- Node.js 18.11.0 버전 이상부터 코드 변경 사항이 있을 시 프로세스를 재시작 해주는 watch 기능이 추가됐다.
- 따라서 nodemon 대신 스크립트에서 `watch`를 사용하여 자동으로 재시작해주는 기능을 사용할 수 있다.

<br><br>

# `.env` 파일

-   환경변수를 저장해놓을 파일이다. 보통 .env로 작성한다.

```jsx
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start": "nodemon --env-file=.env server.js"
    },
```

-   .env를 서버에 적용시키려면 package.json의 script를 위와 같이 변경해주어야 한다.
-   `--env-file=.env`를 통해 env 파일의 환경변수를 모든 파일에서 접근할 수 있게 된다.

```jsx
// server.js
const PORT = process.env.PORT;
```

-   변수에 접근할 때는 위와 같이 사용한다.
