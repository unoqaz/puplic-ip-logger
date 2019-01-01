const getIP = require('external-ip')();
const fs = require('fs');
const beep = require('beepbeep');
const moment = require('moment');

var line
var lastIP

function addToFile(string) {
  fs.appendFile('ips.csv', string, function (err) {
    if (err) {
      beep(3, 1000);
      console.log('Failed to save');
      console.log(err)
    }

    console.log('Saved!');
    beep(2, 1000);
  });
}

addToFile("Logger started,"+moment().format("D/MM/YYYY,HH:mm:ss")+"\n");

const x = setInterval(() => {

  getIP((err, ip) => {
    if (err) {
        line = "fail "
        addToFile(line);
        console.log(err)
    }
    
    if (ip !== lastIP){
      lastIP = ip
      line = ip+","+moment().format("D/MM/YYYY,HH:mm:ss")+"\n";
      addToFile(line);
    }
  });
}, 30000);