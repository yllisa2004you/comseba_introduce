import express from "express";
//express 라이브러리 가져오기기기기기기기긱
import path from "path";
import fs from "fs";

const __dirname = path.resolve();
//현재 파일 경로를 가져옴
const app = express();
//서버 생성 할꺼임 ㅉㅉ
app.use(express.static("frontend"));
//html파일들 기본경로 forntend로 뿜뿜
app.use(express.json());
//서버에서 json해석할수 있도록 해줌
app.use(express.urlencoded({ extended: true }));
//post 요청 시 request.body를 가져올 수 있게 하는 옵션
console.log(app);

const port = 80;
//url의 포트 설저ㅏㅇ

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/frontend/src/html/home.html");
  //메인 페이지가 드렁노는 경오 home과 연결
});
app.get("/guest", (req, res) => {
  res.sendFile(__dirname + "/frontend/src/html/guestBook.html");
  //서버로 들어오는 경우 guestbook으로 연결
});
app.get("/map", (req, res) => {
  res.sendFile(__dirname + "/frontend/src/html/map.html");
  //서버에 들어오는 경우 guestbook으로 연결
});
app.get("/comment", (req, res) => {
  const db = JSON.parse(fs.readFileSync("DB.json"));
  //readfile을 활용하면 버퍼 혀앹로 값을 가져오는데,json.parse로 감싸주면서 이를json형태로 바꿔준다
  res.json(db);
  //받아온 json을 그대로 전송해준다.
});

app.post("/createcomment", (req, res) => {
  const data = req.body;
  console.log(data);

  const db = JSON.parse(fs.readFileSync("DB.json"));
  //db를 읽어옴

  db.commentList.unshift(data);
  //db의 commentList에 data를 추가

  fs.writeFileSync("DB.json", JSON.stringify(db));
  //추가한 데이터를 db에 반영

  res.json(data);
  //받아온 json을 그대로 전송해준다.
  //큰 의미는 없고,정상적으로 api를 반환했는다는 표시
});

app.listen(port, () => {
  console.log(`server is listening at localhost: 80`);
});
//서버가 처음 생성되었을떄 실행되는 함수
