#어떤 이미지로부터 새로운 이미지를 생성할지를 지정
FROM node:10

#Dockerfile 을 생성/관리하는 사람
MAINTAINER Yunjeong <melangyun@gmail.com>

# /app 디렉토리 생성
RUN mkdir -p /app
# /app 디렉토리를 WORKDIR 로 설정
WORKDIR /app
# 현재 Dockerfile 있는 경로의 모든 파일을 /app 에 복사
ADD . /app
# npm install 을 실행
RUN npm install

#가상 머신에 오픈할 포트
EXPOSE 3000
CMD ["npm", "start"]