// Include the AccelStepper Library
#include <AccelStepper.h>
#include <FastLED.h>

#define LED_PIN     7
#define NUM_LEDS    80

CRGB leds[NUM_LEDS];
String inputString = "";         // a string to hold incoming data
boolean stringComplete = false;

// Define step constant
#define FULLSTEP 4

// Creates an instance
// Pins entered in sequence IN1-IN3-IN2-IN4 for proper step sequence
AccelStepper myStepper(FULLSTEP, 11, 9, 10, 8);

void setup() {
  Serial.begin(9600);
  inputString.reserve(200);

  FastLED.addLeds<WS2812, LED_PIN, GRB>(leds, NUM_LEDS);

  // set the maximum speed, acceleration factor,
  // initial speed and the target position
  myStepper.setMaxSpeed(150.0);
  myStepper.setAcceleration(50.0);
  myStepper.setSpeed(150);
  //myStepper.moveTo(4576);
  myStepper.setCurrentPosition(0);

  for (int i = 0; i < NUM_LEDS; i++) {

    leds[i] = CRGB(255, 255, 255);
    //leds[i] = CRGB(random(0, 255),random(0, 255),random(0, 255));
    FastLED.show();
  }

}

void loop() {
  if (myStepper.isRunning()) {
    myStepper.run();
  }
}


void serialEvent() {
  while (Serial.available()) {
    //    // get the new byte:
    byte s = Serial.read();
    Serial.println(s);
    if (s == 67 ) {
      myStepper.moveTo(4576);
      // myStepper.moveTo(4576);
    } else if (s == 66) {
      myStepper.moveTo(0);
    }
    else if(s == 65){
      myStepper.stop();      
      }
  }

}
