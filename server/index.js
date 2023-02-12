import { WebSocket, WebSocketServer } from 'ws';
import {v4 as uuidv4} from 'uuid';
import express from 'express';
const app = express();

app.get('/', () => {
    console.log("This is it overhere");
})
const wss = new WebSocketServer({ port: 3000 })

wss.on("connection", ws => {
    ws.id = uuidv4();
    console.log(`New user connected with id: ${ws.id}`)
    ws.onmessage = ({ data }) => {
        console.log(`The data is ${data}`)
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(`${data}`);
            }
        })
    };

    ws.onclose = function () {
        console.log(`The connection has been closed`);
    };

    ws.onerror = err => {
        console.log("this is the error that occured %s", err)
    }
});
