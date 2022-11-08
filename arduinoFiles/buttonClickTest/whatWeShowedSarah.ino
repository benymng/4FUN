#include <SoftwareSerial.h>                        
SoftwareSerial esp8266(10,11);                   
#define serialCommunicationSpeed 115200               
#define DEBUG true                                 

// this constant won't change:
const int buttonPin = 2;  // the pin that the pushbutton is attached to
const int ledPin = 12;    // the pin that the LED is attached to

// Variables will change:
int buttonPushCounter = 0;  // counter for the number of button presses
int buttonState = 0;        // current state of the button
int lastButtonState = 0;    // previous state of the button

void setup() {
  // initialize the button pin as a input:

  pinMode(buttonPin, INPUT);
  // initialize the LED as an output:
  pinMode(ledPin, OUTPUT);

  Serial.begin(serialCommunicationSpeed);           
  esp8266.begin(serialCommunicationSpeed);     
  InitWifiModule();           
}

void loop() {
  if(esp8266.available()) {    
   // connect to wireless stuff
    if(esp8266.find("+IPD,")) {
     delay(2000);
 
     int connectionId = esp8266.read()-48;                                                
     String webpage = String(buttonPushCounter);
     String cipSend = "AT+CIPSEND=";
     cipSend += connectionId;
     cipSend += ",";
     cipSend +=webpage.length();
     cipSend +="\r\n";
     
     sendData(cipSend,1000,DEBUG);
     sendData(webpage,1000,DEBUG);
 
     String closeCommand = "AT+CIPCLOSE="; 
     closeCommand+=connectionId; // append connection id
     closeCommand+="\r\n";    
     sendData(closeCommand,3000,DEBUG);
    }

    // button data
  }
  buttonState = digitalRead(buttonPin);
  // compare the buttonState to its previous state
  if(buttonState != lastButtonState) {
    lastButtonState = buttonState;
    buttonPushCounter += 1;
      if(buttonState == HIGH) {
        Serial.println ("turned LED off");
        digitalWrite(ledPin, LOW);
      }
      else {
        Serial.println("turned LED on");
        digitalWrite(ledPin, HIGH);
      }
      delay(50);
  }

  // if (buttonState != lastButtonState) {
  //     // if the state has changed, increment the counter.
  //      buttonPushCounter += 1;
    
  //   if (buttonState == HIGH) {
  //     // if the current state is HIGH then the button went from off to on:
  //     buttonPushCounter++;
  //     Serial.println("on");
  //     Serial.print("number of button pushes: ");
  //     Serial.println(buttonPushCounter);
  //   } else {
  //     // if the current state is LOW then the button went from on to off:
  //   Serial.println("off");
  //   }
  //   // Delay a little bit to avoid bouncing
  //   delay(50);
  // }
  // // save the current state as the last state, for next time through the loop
  // // lastButtonState = buttonState;

  // // turns on the LED every four button pushes by checking the modulo of the
  // // button push counter. the modulo function gives you the remainder of the
  // // division of two numbers:
  // if (buttonPushCounter % 4 == 0) {
  //   digitalWrite(ledPin, HIGH);
  // } else {
  //   digitalWrite(ledPin, LOW);
  // }
}

String sendData(String command, const int timeout, boolean debug) {
    String response = "";                                             
    esp8266.print(command);                                          
    long long time = millis();    

    // while((time+timeout) > millis()) {
    //   char c = esp8266.read();
    //   response += c;
    // }

    while( (time+timeout) > millis()) {      
      while(esp8266.available()) {
        char c = esp8266.read();                                     
        response+=c;                                                  
      }  
    }    
    if(debug) {
      Serial.println(response);
    }    
    return response;                                                  
}

void InitWifiModule() {
  sendData("AT+RST\r\n", 2000, DEBUG);     
  sendData("AT+CWMODE=1\r\n", 1500, DEBUG);                                             
  delay (20000);                                             
  sendData("AT+CWJAP=\"emma\",\"emmaiscool\"\r\n", 2000, DEBUG);        
  delay (20000);
  sendData("AT+CIFSR\r\n", 1500, DEBUG);                                             
  delay (20000);
  sendData("AT+CIPMUX=1\r\n", 1500, DEBUG);                                             
  delay (20000);
  sendData("AT+CIPSERVER=1,80\r\n", 1500, DEBUG);                                     

}
