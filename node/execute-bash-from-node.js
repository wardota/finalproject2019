var sys = require('util')
var exec = require('child_process').exec;

dir = exec("ansible --version", function(err, stdout, stderr) {
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