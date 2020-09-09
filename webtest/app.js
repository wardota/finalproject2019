var express = require('express');
var app = express();
var server = require('http').createServer(app); 
var io = require('socket.io')(server); 
var sys = require('util')
var exec = require('child_process').exec;
// var spawn   = require('child_process').spawn;
// var elasticsearch = require('elasticsearch');
const axios = require('axios');
const { spawn } = require('child_process');
// var client = new elasticsearch.Client({
//   host: 'localhost:9200',
//   log: 'trace'
// });
// client.ping({
//   // ping usually has a 3000ms timeout
//   requestTimeout: 1000
// }, function (error) {
//   if (error) {
//     console.trace('elasticsearch cluster is down!');
//   } else {
//     console.log('All is well');
//   }
// });

let interval;
var clickCount = 0;

app.use(express.static(__dirname + '/')); 

const getApiAndEmit = async client => {
  try {
    const res = await axios.get(
      "https://api.darksky.net/forecast/5a51e00f9da0758adfbf5c25f6d17547/37.8267,-122.4233"
    ); // Getting the data from DarkSky
    console.log(res);
    client.emit("FromAPI", res.data.currently.temperature); // Emitting a new message. It will be consumed by the client
  } catch (error) {
    console.error(`Error: ${error.code}`);
  }
};
const getClock = async client => {
  try {
    const res = await new Date().getTime()
    client.emit('datetime', res);
  } catch (error) {
    console.error(`Error: ${error.code}`);
  }
};



function myfunc(){
  dir = exec("echo 'aa' >> a.txt ", function(err, stdout, stderr) {
    if (err) {
      // should have err.code here?
      console.log(stdout);
      console.log('should have err.code here');  
    }
    console.log(stdout);
  });

  dir.on('exit',function(err, stdout, stderr) {
    exec("echo $?", function(err, stdout, stderr) {
      console.log(stdout);

      console.log('exit.code here');  
    });
  });
  // const bat = spawn('ping', ['-c','5', '8.8.8.8']);

  // bat.stdout.on('data', (data) => {
  // console.log(data.toString());
  // }); 

  // bat.stderr.on('data', (data) => {
  // console.error(data.toString());
  // });

  // bat.on('exit', (code) => {
  // console.log(`Child exited with code ${code}`);
  // });
};


// async function myquery(){
//   try {
//     const response = await client.search({
//         index: "amazon_products",
//         body: {
//           "query": {
//             "bool": {
//               "must_not": {
//                 "range": {
//                   "price": {
//                     "gte": 10,
//                     "lte": 20
//                   }
//                 }
//               }
//             }
//           }
//         }
//     });
//     console.log(response.hits.hits)
//   } catch (error) {
//     console.trace(error.message)
//   }
// }
// myquery()

app.get('/colorsRequest', function(req, res) {
  var command = myfunc();
  // var command = spawn(__dirname + '/run.sh', [ req.query.color || '' ]);
  var output  = [];
  console.log('aas');
  
  // command.stdout.on('data', function(chunk) {
  //   output.push(chunk); 
  // }); 
  // command.on('close', function(code) {
  //   if (code === 0)
  //     {console.log('aa');
  //     res.send(Buffer.concat(output));}
  //   else
  //     { console.log('bb');
  //     res.send(500); // when the script fails, generate a Server Error HTTP response
  //     }
  // });
});
app.get('/clickId', function(req, res) {
  var command = myfunc();
  // var command = spawn(__dirname + '/run.sh', [ req.query.color || '' ]);
  var output  = [];
  console.log('aas1');
  
  // command.stdout.on('data', function(chunk) {
  //   output.push(chunk); 
  // }); 
  // command.on('close', function(code) {
  //   if (code === 0)
  //     {console.log('aa1');
  //     res.send(Buffer.concat(output));}
  //   else
  //     { console.log('bb1');
  //     res.send(500); // when the script fails, generate a Server Error HTTP response
  //     }
  // });
});

app.get("/test1", function (req, res) {
  var command = myfunc();
  // var command = spawn(__dirname + '/run.sh', [ req.query.color || '' ]);
  var output  = [];
  console.log('aas1');
  
  // command.stdout.on('data', function(chunk) {
  //   output.push(chunk); 
  // }); 
  // command.on('close', function(code) {
  //   if (code === 0)
  //     {console.log('aa1');
  //     res.send(Buffer.concat(output));}
  //   else
  //     { console.log('bb1');
  //     res.send(500); // when the script fails, generate a Server Error HTTP response
  //     }
  // });
});


app.get('/clickClass', function(req, res) {
  var command = myfunc();
  // var command = spawn(__dirname + '/run.sh', [ req.query.color || '' ]);
  var output  = [];
  console.log('aas2');
  
  // command.stdout.on('data', function(chunk) {
  //   output.push(chunk); 
  // }); 
  // command.on('close', function(code) {
  //   if (code === 0)
  //     {console.log('aa2');
  //     res.send(Buffer.concat(output));}
  //   else
  //     { console.log('bb2');
  //     res.send(500); // when the script fails, generate a Server Error HTTP response
  //     }
  // });
});





io.on('connection', function(client) {  
  //when the server receives clicked message, do this
    console.log("New client connected");
    if (interval) {
      clearInterval(interval);
    }
    interval = setInterval(() => getClock(client), 1000);
    // interval = setInterval(() => getApiAndEmit(client), 10000);
    client.on("disconnect", () => {
      console.log("Client disconnected");
    });
    client.on('clicked', function(data) {
        clickCount++;
        console.log(clickCount);
        var command = myfunc();

		  //send a message to ALL connected clients
		  io.emit('buttonUpdate', clickCount);
    });
    client.on('clicked1', function(){

        data = "success1";
        console.log(data);
        myfunc();
        io.emit('buttonUpdate1', data);
    });
    client.on('clicked2', function(){
        data = "success2";
        console.log(data);
        myfunc();
      io.emit('buttonUpdate2', data);
    });
    client.on('clicked3', function(){
        data = "success3";
        console.log(data);
        myfunc();
      io.emit('buttonUpdate3', data);
    });
});

server.listen(process.env.PORT || 5000);




// const http = require('http');
// const fs = require('fs');

// const server = http.createServer((req, res) => {
//   const url = req.url;
//   const method = req.method;
//   if (url === '/') {
//     res.write('<html>');
//     res.write('<head><title>Enter Message</title><head>');
//     res.write(
//       '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
//     );
//     res.write('</html>');
//     return res.end();
//   }
//   if (url === '/message' && method === 'POST') {
//     const body = [];
//     req.on('data', chunk => {
//       console.log(chunk);
//       body.push(chunk);
//     });
//     return req.on('end', () => {
//       const parsedBody = Buffer.concat(body).toString();
//       const message = parsedBody.split('=')[1];
//       fs.writeFile('message.txt', message, err => {
//         res.statusCode = 302;
//         res.setHeader('Location', '/');
//         return res.end();
//       });
//     });
//   }
//   res.setHeader('Content-Type', 'text/html');
//   res.write('<html>');
//   res.write('<head><title>My First Page</title><head>');
//   res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
//   res.write('</html>');
//   res.end();
// });

// server.listen(process.env.PORT || 5000);
