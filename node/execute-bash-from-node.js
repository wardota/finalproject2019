var sys = require('util')
var exec = require('child_process').exec;
const { spawn } = require('child_process');


dir = exec("ls -a", function(err, stdout, stderr) {
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
const bat = spawn('ping', ['-c','5', '8.8.8.8']);

bat.stdout.on('data', (data) => {
  console.log(data.toString());
}); 

bat.stderr.on('data', (data) => {
  console.error(data.toString());
});

bat.on('exit', (code) => {
  console.log(`Child exited with code ${code}`);
});
// var spawn = require('child_process').spawn,
//     ls    = spawn('ls', ['-lh', '/usr']);

// ls.stdout.on('data', function (data) {
//   console.log('stdout: ' + data.toString());
// });

// ls.stderr.on('data', function (data) {
//   console.log('stderr: ' + data.toString());
// });

// ls.on('exit', function (code) {
//   console.log('child process exited with code ' + code.toString());
// });