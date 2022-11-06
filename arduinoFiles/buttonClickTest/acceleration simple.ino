#include <SoftwareSerial.h>      
#include <Wire.h>
#include <MPU6050.h>       

SoftwareSerial esp8266(10,11);                   
#define serialCommunicationSpeed 115200               
#define DEBUG true                                 

const int buttonPin = 2;  // the pin that the pushbutton is attached to
const int ledPin = 12;    // the pin that the LED is attached to

int buttonPushCounter = 0;  // counter for the number of button presses
int buttonState = 0;        // current state of the button
int lastButtonState = 0;    // previous state of the button

// define the MPU6050 accelerometer
MPU6050 mpu;

void setup() {
  // initialize the button pin as a input:
  pinMode(buttonPin, INPUT);

  // initialize the LED as an output:
  pinMode(ledPin, OUTPUT);

  // initialize serial speed for the serial monitor
  Serial.begin(serialCommunicationSpeed);           
  esp8266.begin(serialCommunicationSpeed);     

  // call the wifi initialization function
  InitWifiModule();     

  // detect if the MPU6050 accelerometer is connected
  while(!mpu.begin(MPU6050_SCALE_2000DPS, MPU6050_RANGE_2G)) {
    Serial.println("Could not find a valid MPU6050 sensor, check wiring!");
  }

  // check the setting to see if its properly initialized
  checkSettings();      
}

// check the settings of the accelerometer
void checkSettings() {
  Serial.println();
  Serial.print(" * Sleep Mode:            ");
  Serial.println(mpu.getSleepEnabled() ? "Enabled" : "Disabled");
  
  Serial.print(" * Clock Source:          ");
  switch(mpu.getClockSource()) {
    case MPU6050_CLOCK_KEEP_RESET:     Serial.println("Stops the clock and keeps the timing generator in reset"); break;
    case MPU6050_CLOCK_EXTERNAL_19MHZ: Serial.println("PLL with external 19.2MHz reference"); break;
    case MPU6050_CLOCK_EXTERNAL_32KHZ: Serial.println("PLL with external 32.768kHz reference"); break;
    case MPU6050_CLOCK_PLL_ZGYRO:      Serial.println("PLL with Z axis gyroscope reference"); break;
    case MPU6050_CLOCK_PLL_YGYRO:      Serial.println("PLL with Y axis gyroscope reference"); break;
    case MPU6050_CLOCK_PLL_XGYRO:      Serial.println("PLL with X axis gyroscope reference"); break;
    case MPU6050_CLOCK_INTERNAL_8MHZ:  Serial.println("Internal 8MHz oscillator"); break;
  }
  Serial.print(" * Accelerometer:         ");
  switch(mpu.getRange()) {
    case MPU6050_RANGE_16G:            Serial.println("+/- 16 g"); break;
    case MPU6050_RANGE_8G:             Serial.println("+/- 8 g"); break;
    case MPU6050_RANGE_4G:             Serial.println("+/- 4 g"); break;
    case MPU6050_RANGE_2G:             Serial.println("+/- 2 g"); break;
  }  
  Serial.print(" * Accelerometer offsets: ");
  Serial.print(mpu.getAccelOffsetX());
  Serial.print(" / ");
  Serial.print(mpu.getAccelOffsetY());
  Serial.print(" / ");
  Serial.println(mpu.getAccelOffsetZ());
  
  Serial.println();
}

// send the data to the web page
String sendData(String command, const int timeout, boolean debug) {
    String response = "";                                             
    esp8266.print(command);                                          
    long long time = millis();    

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

// initialize the wifi module
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

void loop() {
  // if esp8266 is conncted
  if(esp8266.available()) {    
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
  }

  // read the current button state
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

  // accelerometer data 
  Vector rawAccel = mpu.readRawAccel(); 
  Vector normAccel = mpu.readNormalizeAccel();

  // print the sensor data to serial
  Serial.print(" Xraw = ");
  Serial.print(rawAccel.XAxis);
  Serial.print(" Yraw = ");
  Serial.print(rawAccel.YAxis);
  Serial.print(" Zraw = ");

  Serial.println(rawAccel.ZAxis);
  Serial.print(" Xnorm = ");
  Serial.print(normAccel.XAxis);
  Serial.print(" Ynorm = ");
  Serial.print(normAccel.YAxis);
  Serial.print(" Znorm = ");
  Serial.println(normAccel.ZAxis);
}
