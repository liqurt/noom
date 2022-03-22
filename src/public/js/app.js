// nodemon.json 의 "ignore": ["src/public/*"] 가 있으면, src/public/js/app.js 에 변경이 있어도 

// 여기서의 socket은 서버와의 연결이다.
const socket = new WebSocket(`ws://${window.location.host}`)

const messageList = document.querySelector("ul")
const messageForm = document.querySelector("#message")
const nickForm = document.querySelector("#nick")

socket.addEventListener("open", ()=>{
    console.log("Connected to Server ✅")
})

socket.addEventListener("message", (message) =>{
    const li = document.createElement("li")
    li.innerText = message.data
    messageList.append(li)
})

socket.addEventListener("close", () => {
    console.log("Disconnected from Server ❌")
})

// setTimeout(() => {
//     socket.send("hello from the browser!");
// }, 10000)

function handleSubmit(event){
    event.preventDefault()
    const input = messageForm.querySelector("input")
    socket.send(makeMessage("new_message",input.value))
    input.value = ""
}

function handleNickSubmit(event){
    event.preventDefault()
    const input = nickForm.querySelector("input")
    // text가 아니라 Json으로 서버에 전송
    socket.send(makeMessage("nickname",input.value))
}

function makeMessage(type, payload){
    const msg = {type, payload}
    return JSON.stringify(msg)
}

messageForm.addEventListener("submit", handleSubmit)
nickForm.addEventListener("submit", handleNickSubmit)