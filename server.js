const io=require('socket.io')(5000);

io.on('connection',socket=>
{
    console.log('new User');
    socket.emit('chat-message','Hello World')
})