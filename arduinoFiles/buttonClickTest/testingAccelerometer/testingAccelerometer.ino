#include<SoftwareSerial.h>
// #include <Wire.h>
// #include <MPU6050.h>       
SoftwareSerial comm(10, 11); //setting Tx and Rx pins

String server = ""; //variable for sending data to webpage
boolean No_IP = false; //variable to check for ip Address
String IP = ""; //variable to store ip Address
char temp1 = '0';
const String SSID = "Norm";
const String PWD = "normanch";

int a = 0;
int b = 0;

// Button
const int buttonPin = 2;  // the pin that the pushbutton is attached to
const int ledPin = 12;    // the pin that the LED is attached to
int buttonPushCounter = 1;  // counter for the number of button presses
int buttonState = 0;        // current state of the button
int lastButtonState = 0;    // previous state of the button

// MPU6050
// MPU6050 mpu;

String str1 = "Button push counter here"; //String to display on webpage
// String accelOutput = "none";
String str2 = "<p>Data Received Successfully.....</p>"; //another string to display on webpage

// void checkSettings(); 

void setup()
{
  Serial.begin(115200);
  comm.begin(115200);
  wifi_init();
  Serial.println("System Ready..");
  // detect if the MPU6050 accelerometer is connected
  // while(!mpu.begin(MPU6050_SCALE_2000DPS, MPU6050_RANGE_2G)) {
  //   Serial.println("Could not find a valid MPU6050 sensor, check wiring!");
  // }

  // // check the setting to see if its properly initialized
  // checkSettings();    
}

// check the settings of the accelerometer
// void checkSettings() {
//   Serial.println();
//   Serial.print(" * Sleep Mode:            ");
//   Serial.println(mpu.getSleepEnabled() ? "Enabled" : "Disabled");

//   Serial.print(" * Clock Source:          ");
//   switch(mpu.getClockSource()) {
//     case MPU6050_CLOCK_KEEP_RESET:     Serial.println("Stops the clock and keeps the timing generator in reset"); break;
//     case MPU6050_CLOCK_EXTERNAL_19MHZ: Serial.println("PLL with external 19.2MHz reference"); break;
//     case MPU6050_CLOCK_EXTERNAL_32KHZ: Serial.println("PLL with external 32.768kHz reference"); break;
//     case MPU6050_CLOCK_PLL_ZGYRO:      Serial.println("PLL with Z axis gyroscope reference"); break;
//     case MPU6050_CLOCK_PLL_YGYRO:      Serial.println("PLL with Y axis gyroscope reference"); break;
//     case MPU6050_CLOCK_PLL_XGYRO:      Serial.println("PLL with X axis gyroscope reference"); break;
//     case MPU6050_CLOCK_INTERNAL_8MHZ:  Serial.println("Internal 8MHz oscillator"); break;
//   }
//   Serial.print(" * Accelerometer:         ");
//   switch(mpu.getRange()) {
//     case MPU6050_RANGE_16G:            Serial.println("+/- 16 g"); break;
//     case MPU6050_RANGE_8G:             Serial.println("+/- 8 g"); break;
//     case MPU6050_RANGE_4G:             Serial.println("+/- 4 g"); break;
//     case MPU6050_RANGE_2G:             Serial.println("+/- 2 g"); break;
//   }  
//   Serial.print(" * Accelerometer offsets: ");
//   Serial.print(mpu.getAccelOffsetX());
//   Serial.print(" / ");
//   Serial.print(mpu.getAccelOffsetY());
//   Serial.print(" / ");
//   Serial.println(mpu.getAccelOffsetZ());

//   Serial.println();
// }

void loop()
{
  b = 0;
  // Serial.println("Refresh Page");
  // while (1)
  // {
  //   b++;
  Serial.write(1);
  Serial.print(comm.read());
    if (comm.availableForWrite())
    {
          Serial.println("Here");

      // if (comm.find("0,CONNECT"))
      // {
        Serial.println("Starting");
        sendToServer();
        Serial.println("Finished");
        delay(1000);
      }


  buttonState = digitalRead(buttonPin);
  // compare the buttonState to its previous state
  // Serial.println(buttonState);
  if(buttonState != lastButtonState) {
    lastButtonState = buttonState;
    buttonPushCounter += 1;
    Serial.println(buttonPushCounter);
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
}


void findIp(int time1) //check for the availability of IP Address
{
  int time2 = millis();
  while (time2 + time1 > millis())
  {
    while (comm.available() > 0)
    {
      if (comm.find("IP has been read"))
      {
        No_IP = true;
      }
    }
  }
}

void showIP()//Display the IP Address
{
  IP = "";
  char ch = 0;
  while (1)
  {
    comm.println("AT+CIFSR");
    while (comm.available() > 0)
    {
      if (comm.find("STAIP,"))
      {
        delay(1000);
        Serial.print("IP Address:");
        while (comm.available() > 0)
        {
          ch = comm.read();
          if (ch == '+')
            break;
          IP += ch;
        }
      }
      if (ch == '+')
        break;
    }
    if (ch == '+')
      break;
    delay(1000);
  }
  Serial.print(IP);
  Serial.print("Port:");
  Serial.println(80);
}

void establishConnection(String command, int timeOut) //Define the process for sending AT commands to module
{
  int q = 0;
  while (1)
  {
    Serial.println(command);
    comm.println(command);
    while (comm.available())
    {
      if (comm.find("OK"))
        q = 8;
    }
    delay(timeOut);
    if (q > 5)
      break;
    q++;
  }
  if (q == 8)
    Serial.println("OK");
  else
    Serial.println("Error");
}

void wifi_init() //send AT commands to module
{
  establishConnection("AT", 100);
  delay(1000);
  establishConnection("AT+CWMODE=3", 100);
  delay(1000);
  establishConnection("AT+CWQAP", 100);
  delay(1000);
  establishConnection("AT+RST", 5000);
  delay(1000);
  findIp(5000);
  if (!No_IP)
  {
    Serial.println("Connecting Wifi....");
    establishConnection("AT+CWJAP=\"" + SSID + "\",\"" + PWD + "\"", 7000); //provide your WiFi username and password here
  }
  else
  {
  }
  Serial.println("Wifi Connected");
  showIP();
  establishConnection("AT+CIPMUX=1", 100);
  establishConnection("AT+CIPSERVER=1,80", 100);
}

void sendData(String server1)//send data to module
{
  int p = 0;
  while (1)
  {
    unsigned int l = server1.length();
    Serial.print("AT+CIPSEND=0,");
    comm.print("AT+CIPSEND=0,");
    Serial.println(l + 2);
    comm.println(l + 2);
    delay(100);
    Serial.println(server1);
    comm.println(server1);
    while (comm.available())
    {
      //Serial.print(Serial.read());
      if (comm.find("OK"))
      {
        p = 11;
        break;
      }
    }
    if (p == 11)
      break;
    delay(100);
  }
}

void sendToServer()//send data to webpage
{
  server = "<h1>HI</h1>";
  sendData(server);
  server = String(buttonPushCounter);
  server += str2;
  sendData(server);
  delay(5000);
  comm.println("AT+CIPCLOSE=0");
}