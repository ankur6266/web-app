let socket = io();

socket.on('connect',function () {
    console.log('connected to server');
})

socket.on('disconnect', () => {
    console.log('diconnected from server ')
})

socket.on('newMsg',function (msg) {
    console.log(msg);
})  