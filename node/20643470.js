// stackoverflow.com/questions/20643470

// https://stackoverflow.com/questions/20643470/execute-a-command-line-binary-with-node-js?answertab=votes#tab-top
function popup(){
    const { exec } = require('child_process');
    exec('mkdir aa', (err, stdout, stderr) => {
      if (err) {
        // node couldn't execute the command
        return;
      }
    
      // the *entire* stdout and stderr (buffered)
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    });
};



