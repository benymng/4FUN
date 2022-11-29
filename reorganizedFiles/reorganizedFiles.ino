#include<SoftwareSerial.h>
#include <Tasks.h>
#include "functions.h"
SoftwareSerial comm(10, 11); 

String server = ""; 
boolean No_IP = false; 
String IP = ""; 
char temp1 = '0';
const String SSID = "emma", PWD = "emmaiscool";

const int buttonPin = 2, ledPin = 12;   
int a = 0, b = 0, buttonPushCounter = 1, buttonState = 0, lastButtonState = 0;    


String str1 = "Button push counter here"; //String to display on webpage
String str2 = "<p>Data Received Successfully.....</p>"; //another string to display on webpage

class MyTask : public Task {
  void update() {
    Serial.println("Task Called");
  }
}

void setup()
{
  Serial.begin(115200);
  comm.begin(115200);
  wifi_init();
  Serial.println("System Ready..");
}

void loop()
{
  b = 0;
  // Serial.println("Refresh Page");
  // while (1)
  // {
    b++;
    if (comm.availableForWrite())
    {
          Serial.println("Here");

      // if (comm.find("0,CONNECT"))
      // {
        Serial.println("Starting");
        sendToServer();
        Serial.println("Finished");
        delay(1000);
      // }
    }
  // }

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
  // if (comm.available())
  // {
  //   Serial.println("Here");

  //     // if (comm.find("0,CONNECT"))
  //     // {
  //       Serial.println("Starting");
  //       sendToServer();
  //       Serial.println("Finished");
  //       delay(1000);
  //     }
    // }
  // }
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
  server = "<h1>Welcome to Data Receiving from Arduino</h1>";
  sendData(server);
  server = String(buttonPushCounter);
  server += str2;
  sendData(server);
  delay(1000);
  comm.println("AT+CIPCLOSE=0");
}

void sendNum(String s)//send data to webpage
{
  server += s + '\n';
  sendData(server);
  delay(5000);
  comm.println("AT+CIPCLOSE=0");
  Serial.println("finished sending numbers");
}

