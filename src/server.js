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

// 포트 3000을 listening
const handleListen = () => console.log("Listening on http://localhost:3000");
app.listen(3000, handleListen);