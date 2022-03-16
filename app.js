const express = require("express");
const http = require("http");
const app = express();
const path = require("path");
const server = http.createServer(app);
const socketIO = require("socket.io");
const moment = require("moment");
const io = socketIO(server);


app.use(express.static(path.join(__dirname,"src")));  // __dirname: 프로젝트 폴더 이름

const PORT = process.env.PORT || 5000;

// 서버에서 받아주기
io.on("connection",(socket)=>{
    socket.on("chatting",(data)=>{
        const {name, msg} = data;
        io.emit("chatting",{
            name,
            msg,
            time: moment(new Date()).format("h:mm A")   // 현재시간 가져오기
        })
    })
});

// app.listen(PORT, ()=>console.log(`server is running ${PORT}`));
server.listen(PORT, ()=>console.log(`server is running ${PORT}`));
