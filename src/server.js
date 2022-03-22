import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

console.log("CONSOLE_LOG");
console.log("__dirname : " + __dirname);

//set views
app.set("view engine", "pug");
app.set("views", __dirname + "/views");

// user가 /public 으로 가면, "__dirname + /public" 폴더를 보여주게 한다.
// 애초에 public파일들("public/js/app.js")은 FrontEnd에서 구동되는 코드임.
// server.js는 프론트가 아님.
app.use("/public",express.static(__dirname + "/public"));

//route
app.get("/", (req, res) => res.render("home"));
// 유저가 어떤 url로 이동하던지, Home으로 돌려보낸다!
app.get("/*", (req, res) => res.redirect("/"));

// 포트 3000을 listening - express가 지금은 http를 다루지만 ws를 다루게 할 것이다.
const handleListen = () => console.log("Listening on http://localhost:3000");
// app.listen(3000, handleListen);

// http server 만들기
const server = http.createServer(app);

// web socket server 만들기(※ parameter는 넣어도 그만 안 넣어도 그만)
const wss = new WebSocket.Server({server});
// 아무튼 지금은 같은 서버에서 http, ws 둘다 같은 port에서 작동. (ws만 하고싶으면 http 서버는 지우고, ws의 파라미터를 제거)

// connection 이라는 event를 기다린다. event 발생 시 아래의 람다 함수 실행
wss.on("connection", (socket) =>{
    // 여기서의 socket은 브라우저를 뜻한다.
    console.log("Connected to Browser ✅");
    socket.on("close",()=>{
        console.log("Disconnected from the Browser ❌")
    })
    socket.on("message", message =>{
        console.log(message.toString('utf-8'));
    })
    socket.send("Hello!!");
});

server.listen(3000, handleListen);
