"use strict"
window.addEventListener("load", () => {
    const socket = io();
    const sub = document.querySelector("button");
    sub.addEventListener("click", function convert() {
        let msg = document.querySelector("input").value;
        socket.emit("conversion", msg);
    });
    socket.on("done", msg=>{
        document.getElementById("display").innerHTML = msg;
    })
})