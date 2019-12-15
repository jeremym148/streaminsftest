var jsforce = require('jsforce');
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
io.on('connection', () => { /* … */ });
// server.listen(3000);




var conn = new jsforce.Connection({
  // you can change loginUrl to connect to sandbox or prerelease env.
  loginUrl : `${`https://test.salesforce.com`}`
});

var sfLogin = async function(){
  await conn.login(process.env.USERNAME, process.env.PASSWORD)
  console.log(conn)
  conn.streaming.topic("SilentPushes").subscribe(function(message) {
    console.log('Event Type : ' + message.event.type);
    console.log('Event Created : ' + message.event.createdDate);
    console.log('Object Id : ' + message.sobject.Id);
    console.log('Event : ' + JSON.stringify(message));
    socket.emit('record-processed', JSON.stringify(message));
  });
}

sfLogin()


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




app.use(function(req, res, next){
  res.io = io;
  next();
});


module.exports = {app: app, server: server};
