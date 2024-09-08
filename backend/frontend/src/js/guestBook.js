async function getComment() {
  const response = await fetch("http://comseba.onrender.com/comment");
  const jsonData = await response.json();

  return jsonData;
}
//console.log(getComment());

const postComment = async (param) => {
  // console.log(param);
  const res = await fetch("http://comseba.onrender.com/createcomment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(param),
  });
  return await res.json();
};
//console.log(getComment());
getComment();

const elapsedTime = (start, end) => {
  const diff = (end - start) / 1000;

  const times = [
    { name: "년", milliSeconds: 60 * 60 * 24 * 365 },
    { name: "개월", milliSeconds: 60 * 60 * 24 * 30 },
    { name: "일", milliSeconds: 60 * 60 * 24 },
    { name: "시간", milliSeconds: 60 * 60 },
    { name: "분", milliSeconds: 60 },
  ];
  for (const value of times) {
    const betweenTime = Math.floor(diff / value.milliSeconds);

    if (betweenTime > 0) {
      return `${betweenTime}${value.name} 전`;
    }
  }
  return "방금 전";
};

const makeComment = async () => {
  //api를 사용할 예정이기 떄문에 async/await 함수 사용ㅇㅇㅇ
  const db = await getComment();
  //서버로부터  DB를 받아온다.

  const commentArea = document.querySelector(".guest__comment-area");
  //댓글 추가하기위해 영역을 선택

  //이전에 배열내장함수인 map과 백틱을 활용하여 htmlㄹ을 문자열ㄹ 형태로 직접 만들어 준다.
  const htmlList = db.commentList.map((info) => {
    const date = info.time.split("-");
    //"-"로 구분자로 년-월-일-시-분-초를 배열에 저장

    const time = new Date(...date);
    //(스프레드 연산자)를 활용해서 넣어주면 해당 값들로 data객체를 만들 수 있음(나중에 시도 ㄱㄱ)
    const curTime = new Date(); //현재 시간 가져오기

    console.log(time, curTime);

    const timeStr = elapsedTime(time, curTime);
    console.log(info.time.split("-"));

    return `<div class="guest__comment">
    <div class="guest__comment__left">
    <div class="guest__comment__left__name">${info.name}</div>
    </div>
    <div class="guest__comment__right">
      <div class="guest__comment__right__text">
        ${info.comment}
      </div>
      <div class="guest__comment__right__time">${timeStr}</div>
    </div>
    <div class="guest__commnet_right__del">
      <button>delete</button>
    </div>
  </div>`;
  });

  //htmlList는 배열이기 떄문에 reduce 내장함수를 ㅇ활용하여 이를 붙여준다.
  //reduce가 이해하기 어렵다면 for문을 활용해서 만들어보자!
  const html = htmlList.reduce((a, c) => a + c, "");

  commentArea.innerHTML = html;
};

makeComment();

const commentBtn = document.querySelector(".guest__form button");
//버튼 추가

commentBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  //form 태그안의 버트ㄴ은 누르면 새로고침되는 성징이 있어서 이것을 막아줌

  const name = document.querySelector(".guest__form input");
  const comment = document.querySelector(".guest__form textarea");
  //input과 text-area 부분을 선택

  const time = new Date();
  const timeStr = `${time.getFullYear()}-${time.getMonth()}-${time.getDate()}-${time.getHours()}-${time.getMinutes()}-${time.getSeconds()}`;
  //시간을 date객체가 아닌,문자열 형태로 저장하기 위함

  console.log(name.value, comment.value, timeStr);

  //app 작업이기에 await 붙임
  const state = await postComment({
    name: name.value,
    comment: comment.value,
    time: timeStr,
  });
  console.log(state);
  if (state) {
    window.location.reload();
  }
});
