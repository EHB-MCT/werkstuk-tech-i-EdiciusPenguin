
"use strict";
class SerialScaleController {
    constructor() {
        this.encoder = new TextEncoder();
        this.decoder = new TextDecoder();
    }
    async init() {
        if ('serial' in navigator) {
            try {
                const port = await navigator.serial.requestPort();
                await port.open({ baudRate: 9600 });
                this.reader = port.readable.getReader();
                this.writer = port.writable.getWriter();
                let signals = await port.getSignals();
                console.log(signals);
            }
            catch (err) {
                console.error('There was an error opening the serial port:', err);
            }
        }
        else {
            console.error('Web serial doesn\'t seem to be enabled in your browser. Try enabling it by visiting:');
            console.error('chrome://flags/#enable-experimental-web-platform-features');
            console.error('opera://flags/#enable-experimental-web-platform-features');
            console.error('edge://flags/#enable-experimental-web-platform-features');
        }
    }
    async read() {
        try {
            const readerData = await this.reader.read();
            console.log(readerData)
            return this.decoder.decode(readerData.value);
        }
        catch (err) {
            const errorMessage = `error reading data: ${err}`;
            console.error(errorMessage);
            return errorMessage;
        }
    }
    async write(data) {
        
    const dataArrayBuffer = this.encoder.encode(data);
    return await this.writer.write(dataArrayBuffer);
        // try {
        //     const readerData = await this.reader.read();
        //     console.log(readerData)
        //     return this.decoder.decode(readerData.value);
        // }
        // catch (err) {
        //     const errorMessage = `error reading data: ${err}`;
        //     console.error(errorMessage);
        //     return errorMessage;
        // }
    }
}

const serialScaleController = new SerialScaleController();
const connect = document.getElementById('connect');
const write = document.getElementById('write');

connect.addEventListener('pointerdown', () => {
  serialScaleController.init();
});
write.addEventListener('pointerdown', () => {
  serialScaleController.write("C");
});

write.addEventListener('pointerdown', () => {
    serialScaleController.write("C");
  });
  
  document.getElementById('STOP').addEventListener('pointerdown', () => {
      serialScaleController.write("A");
    });
    
  document.getElementById('BBACK').addEventListener('pointerdown', () => {
      serialScaleController.write("B");
    });
  

document.getElementById('thresh_text').addEventListener('input', () => {
    console.log(document.getElementById('thresh_text').value);

    if(document.getElementById('thresh_text').value== 0){

   serialScaleController.write("C");

    }
  });
  
async function getSerialMessage() {
  document.querySelector("#serial-messages-container .message").innerText += await serialScaleController.read()
}
