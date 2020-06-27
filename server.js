const http = require("http");
const WebSocket = require("ws");
const express = require("express");

const port = 3000;
const server = http.createServer(express)
const wss = new WebSocket.Server({server});

var messages = []


wss.on("connection",ws=>{

    for(i=0;i<messages.length;i++){
        ws.send(messages[i])
    }

    ws.on("message",data=>{
        wss.clients.forEach(client=>{
            if(client !== ws && client.readyState == WebSocket.OPEN){
                client.send(data);
            }
        })

        if(data == "An user joined!") return;

        messages.push(data)
    })
})

server.listen(port, ()=>{
    console.log(`Server running at http://${server.address()}/`)
})
