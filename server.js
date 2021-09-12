const path = require('path');
const http = require('http');
const express = require('express');
const app = express();
const PORT = 80 || process.env.PORT;
const fs = require("fs");
let dictionary;
fs.readFile("dictionary.json", (err, content) => {
    dictionary = JSON.parse(content);
})
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})
const httpServer = http.createServer(app);
httpServer.listen(PORT, () => {
    console.log(`server @${PORT}`)
});
const io = require('socket.io')(httpServer);

io.on("connection", socket => {
    socket.on("conversion", msg => {
        let tempArray = msg.split(" ");
        for (let i = 0; i < tempArray.length; i++) {
            let index = -1;
            index = parseInt(getKeyByVal(dictionary, tempArray[i]));
            // console.log(typeof index);

            if(!index){
                continue;
            }
            tempArray[i] = dictionary[index + 7];
        }
        let dataToSend = tempArray.join(" ");
        socket.emit("done", dataToSend);
    })
});

function getKeyByVal(obj, val){
    for(let elem in obj){
        if(obj.hasOwnProperty(elem)){
            // console.log(elem)
            if(obj[elem] === val){
                return elem;
            }
        }
    }
}