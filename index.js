var jsforce = require('jsforce');
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
io.on('connection', onConnect);
server.listen(3000);




var conn = new jsforce.Connection({
  // you can change loginUrl to connect to sandbox or prerelease env.
  loginUrl : `${`https://test.salesforce.com`}`
});

var sfLogin = async function(){
  await conn.login('jeremym@balink.net.lv.icon', 'ba-link1234567')
  console.log(conn)
  conn.streaming.topic("SilentPushes").subscribe(function(message) {
    console.log('Event Type : ' + message.event.type);
    console.log('Event Created : ' + message.event.createdDate);
    console.log('Object Id : ' + message.sobject.Id);
    console.log('Event : ' + JSON.stringify(message));
    io.emit('record-processed', JSON.stringify(message));
  });
}

sfLogin()

function onConnect(socket){

    // sending to the client
    // socket.emit('hello', 'can you hear me?', 1, 2, 'abc');
    // sending to the client
    socket.emit('getId', socket.id);
    socket.on('connectUser', (username) => {    
        // we store the username in the socket session for this client
        socket.username = username;
        console.log(username)
        
      });
  
    // // sending to all clients except sender
    // socket.broadcast.emit('broadcast', 'hello friends!');
  
    // // sending to all clients in 'game' room except sender
    // socket.to('game').emit('nice game', "let's play a game");
  
    // // sending to all clients in 'game1' and/or in 'game2' room, except sender
    // socket.to('game1').to('game2').emit('nice game', "let's play a game (too)");
  
    // // sending to all clients in 'game' room, including sender
    // io.in('game').emit('big-announcement', 'the game will start soon');
  
    // // sending to all clients in namespace 'myNamespace', including sender
    // io.of('myNamespace').emit('bigger-announcement', 'the tournament will start soon');
  
    // // sending to a specific room in a specific namespace, including sender
    // io.of('myNamespace').to('room').emit('event', 'message');
  
    // // sending to individual socketid (private message)
    // io.to(`${socketId}`).emit('hey', 'I just met you');
  
    // // WARNING: `socket.to(socket.id).emit()` will NOT work, as it will send to everyone in the room
    // // named `socket.id` but the sender. Please use the classic `socket.emit()` instead.
  
    // // sending with acknowledgement
    // socket.emit('question', 'do you think so?', function (answer) {});
  
    // // sending without compression
    // socket.compress(false).emit('uncompressed', "that's rough");
  
    // // sending a message that might be dropped if the client is not ready to receive messages
    // socket.volatile.emit('maybe', 'do you really need it?');
  
    // // specifying whether the data to send has binary data
    // socket.binary(false).emit('what', 'I have no binaries!');
  
    // // sending to all clients on this node (when using multiple nodes)
    // io.local.emit('hi', 'my lovely babies');
  
    // // sending to all connected clients
    // io.emit('an event sent to all connected clients');
  
  };


  // subscribe to a pushtopic


  // str.on('connect', function(){
  //   console.log('Connected to pushtopic: ' + config.PUSH_TOPIC);
  // });

  // str.on('error', function(error) {
  //   console.log('Error received from pushtopic: ' + error);
  // });

  // str.on('data', function(data) {
  //   console.log('Received the following from pushtopic ---');
  //   console.log(data);
  //   // emit the record to be displayed on the page
  //   socket.emit('record-processed', JSON.stringify(data));
  // });




// app.use(function(req, res, next){
//   res.io = io;
//   next();
// });


// module.exports = {app: app, server: server};
