const socket = io()

const welcome = document.getElementById("welcome")
const form = welcome.querySelector("form")

function handleRoomSubmit(event){
    event.preventDefault()
    const input = form.querySelector("input")
    // "enter_room" 이라는 이름의 event 발생, payload:input.value 라는 JS object와 서버에서 실행할 익명함수를 파라미터로 보냄
    socket.emit("enter_room", { payload : input.value }, () => {console.log("Server is done!")})
    input.value=""
}
form.addEventListener("submit", handleRoomSubmit)