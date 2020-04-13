# Kakao 로그인

<br>

간단한 회원가입과, 로그인, 카카오 계정 연동을 위한 서버 프로그램 입니다.

<br>

<br>

## STACK

<br>

1. 개발환경 : nodeJS, typescript, Ubuntu(Linux)
2. Framework : nestJS
3. DB : MariaDB, typeorm
4. API : Kakao API
5. Deploy : EC2 , RDS

<br>

<br>

## 시작하기

<br>

1. git clone
2. 터미널에 npm install 을  사용하여 필요한 모듈을 다운 받습니다.
   - npm audit fix가 필요할 수도 있습니다.
3. MariaDB를 사용한 설정이 필요합니다.
   - MariaDB 다운로드, 설정 후 `.env`파일을 local option에 맞게 설정해 주세요
4. `npm start`를 실행하면, `3000`번 포트 혹은 `env`에 설정한 포트로 서버가 켜집니다.

<br>

- http://54.161.111.8:3000/ 주소에 서버 코드가 배포되어 있습니다.

<br>

<br>

## Database Schema

[erd cloud](https://www.erdcloud.com/d/8KrHb4KZykiAKdD2f)

![erd](https://user-images.githubusercontent.com/52588452/79096762-f361df00-7d98-11ea-8384-841497cea889.png)

<br>

<br>

# API

<br>

> `http://54.161.111.8:3000/api/`에 접속하시면 간편히 API테스트를 시도 할 수 있습니다.

<br>

<br>

***

## / (GET)

기본 API입니다. `Hello world` text 가 반환됩니다.

<br>

***

## /auth/signup (POST)

회원가입을 위한 API입니다. password는 password조건**(대-소문자, 특수문자, 숫자 모두 포함 8~16자 사이)**을, email은 email의 양식, phone은 핸드폰 번호의 양식으로 맞추어야 정상 요청됩니다.<br>

`kakaoAccessToken`과, `kakaoRefreshToken`, `userId` 는 카카오 관련 정보로, 카카오 로그인이 아닐 경우  null로 요청합니다.<br>

> 카카오로 회원가입의 경우 `auth/kakao (GET)`요청이 선행되어야 하며, 카카오 인증절차 후 받은 응답으로 `kakaoAccessToken`, `kakaoRefreshToken`, `userId` 항목을 요청보내야 합니다.

*배포되어 있는 `http://54.161.111.8:3000/api/` 를 사용할 경우, 아직 RDS의 MariaDB 한글 설정이 완료되지 않아 한글 입력시 Internal Servel Error가 발생 할 수 있습니다. 가급적 영어로 이용해 주세요. 빠(이 안내가 남아있다면 아직 업데이트 되지 않은것입니다.)*

<br>

<br>

***

## /auth/login (POST)

로그인을 위한 API입니다. email형식이 맞아야 정상 요청됩니다. 정상 로그인 시 user email과 가입시에 기재하였던 nickname, 로그인 token이 발급됩니다.

<br>

<br>

***

## /auth/kakao/login (POST)

카카오 로그인을 위한 API입니다. 

> 카카오로 로그인의 경우 `auth/kakao (GET)`요청이 선행되어야 하며, 카카오 인증절차 후 받은 응답으로 `kakaoAccessToken`, `kakaoRefreshToken`, `userId` 항목을 요청보내야 합니다.<br>

등록된 카카오 회원이 아닐때엔 토큰이 발급되지 않습니다.

<br>

<br>

***

## /auth/kakao/code (GET)

카카오 로그인 과정을 위한 url입니다. **직접 요청을 보내지 않아야 합니다.**

<br>

<br>

***

## /auth/kakao (GET)

카카오 로그인 인증절차를 위한 요청입니다. client로 이어지는 `url`이 반환되며, 이 url 을 browser로 직접 접속하여 진행해야 합니다.`kakaoAccessToken`, `kakaoRefreshToken`, `userId`, `userEmail`이 반환되며, **카카오로 로그인(auth/kakao/login (POST))** 혹은 **카카오 계정 연동 (auth/kakao (POST)**,혹은 **회원가입 (auth/signup (POST))**에 정보를 이용할 수 있습니다.

<br>

<br>

***

## /auth/kakao (POST)

선 회원 가입 , 후 카카오 계정 연동을 위한 요청입니다. 로그인(로그인 토큰)이 필요하며 token인증방식은 `bearer`입니다. 

`http://54.161.111.8:3000/api/` 혹은 `localhost:port/api/`주소를 이용하여 `swagger`를 이용한다면, 우상단 `Authorize`에서 로그인을 간단히 설정 할 수 있습니다. (발급받은 token을 복사하여 입력하기만 하면 됩니다)

<br>

<br>

<br>

<br>
