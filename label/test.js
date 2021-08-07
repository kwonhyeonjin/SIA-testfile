const container = document.querySelector(".area");
const box = container.querySelector(".area__box");

const {width: containerWidth, height:containerHeight} = container.getBoundingClientRect();
const {width:boxWidth, height:boxHeight} = box.getBoundingClientRect();
let isDragging = null;
let originLeft = null;
let originTop = null;
let originX = null;
let originY = null;

box.addEventListener("mousedown", (e) =>{
    isDragging = true; //마우스 이동 시작을 전역으로 알림.
    originX=e.clientX; //브라우저를 기준으로 한 마우스 X축 포인터
    originY=e.clientY; //Y축 포인터
    originLeft=box.offsetLeft; //container 기준으로 한 bx좌표
    originTop=box.offsetTop; // by좌표
});

document.addEventListener("mouseup", (e) => {
    isDragging = false;

});

document.addEventListener("mousemove", (e) => {
    if(isDragging) { //마우스 이동 시작을 전역으로 알렸을 경우 적용
        const diffX = e.clientX - originX; //이동한 거리(x)
        const diffY = e.clientY - originY; //이동한 거리 (y)
        //컨테이너 기준 처음 박스 좌표 + 이동한 거리 (x,y)
        const endOfXPoint = containerWidth - boxWidth;
        const endOfYPoint = containerHeight - boxHeight;
        box.style.left = `${Math.min(Math.max(0, originLeft+diffX),endOfXPoint)}px`;
        box.style.top = `${Math.min(Math.max(0, originTop + diffY), endOfXPoint)}px`;
        //left가 -값이 되면 0이 최댓 값이 되므로 박스는 경계선을 벗어 날 수 없음.
    }
});