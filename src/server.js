import http from "http"
import express from "express"
import SocketIO from "socket.io"

const app = express()

console.log("CONSOLE_LOG")
console.log("__dirname : " + __dirname)

//set views
app.set("view engine", "pug")
app.set("views", __dirname + "/views")

// user가 /public 으로 가면, "__dirname + /public" 폴더를 보여주게 한다.
// 애초에 public파일들("public/js/app.js")은 FrontEnd에서 구동되는 코드임.
// server.js는 프론트가 아님.
app.use("/public",express.static(__dirname + "/public"))

//route
app.get("/", (req, res) => res.render("home"))
// 유저가 어떤 url로 이동하던지, Home으로 돌려보낸다!
app.get("/*", (req, res) => res.redirect("/"))

// 포트 3000을 listening - express가 지금은 http를 다루지만 ws를 다루게 할 것이다.
const handleListen = () => console.log("Listening on http://localhost:3000")
// app.listen(3000, handleListen);

// http server 만들기
const server = http.createServer(app)
// socket.io server 만들기
const wsServer = SocketIO(server)

wsServer.on("connection", socket=>{
    console.log(socket)
})

server.listen(3000, handleListen)