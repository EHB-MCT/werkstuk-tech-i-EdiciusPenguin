// const { SerialPort }= require('serialport');

// const port = new SerialPort({
//     path: 'COM10',
//     baudRate: 9600,
//   });


//   port.open(function (err) {
//     if (err) {
//       return console.log('Error opening port: ', err.message);
//     }
  
//     // Because there's no callback to write, write errors will be emitted on the port:
//     port.write('main screen turn on');
//   });

//   // The open event is always emitted
// port.on('open', function() {
//     console.log("open");  
//     port.write("C");
//     succes();
// });



// function succes(){

//     console.log("C");
//     port.write("C");


// }


  navigator.serial.addEventListener('connect', (e) => {
    // Connect to `e.target` or add it to a list of available ports.
    console.log("connected")
  });
  
  navigator.serial.addEventListener('disconnect', (e) => {
    // Remove `e.target` from the list of available ports.
    console.log("connected")

  });
  
  navigator.serial.requestPort({ filters: [ "COM" ]}).then((port) => {
    // Connect to `port` or add it to the list of available ports.
    console.log(port)
  }).catch((e) => {
    // The user didn't select a port.
  });

  navigator.serial.getPorts().then((ports) => {
    // Initialize the list of available ports with `ports` on page load.
    
    console.log(ports)
  });
