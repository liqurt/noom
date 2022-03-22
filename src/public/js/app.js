// nodemon.json 의 "ignore": ["src/public/*"] 가 있으면, src/public/js/app.js 에 변경이 있어도 

// 여기서의 socket은 서버와의 연결이다.
const socket = new WebSocket(`ws://${window.location.host}`)

socket.addEventListener("open", ()=>{
    console.log("Connected to Server ✅")
})

socket.addEventListener("message", (message) =>{
    console.log("New message: ", message.data)
})

socket.addEventListener("close", () => {
    console.log("Disconnected from Server ❌")
})

setTimeout(() => {
    socket.send("hello from the browser!");
}, 10000);