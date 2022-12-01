#include <SoftwareSerial.h>    
#include <Wire.h>
#include <MPU6050.h>  

SoftwareSerial comm(10, 11);
#define echoPin 7 
#define trigPin 5 

String toSend = "";
String server = "";   
boolean No_IP = false; 
String IP = "";         
char temp1 = '0';

const String SSID = "petemango";
const String PWD = "mangodatabase";
int startTime = 0;

bool repRn = false;
long duration=0;
int distance=0, countRep=0, countTime=0;

String str1 = "";
String str2 = "<p>Data Received Successfully.....</p>"; //another string to display on webpage

void setup() {
  pinMode(trigPin, OUTPUT); 
  pinMode(echoPin, INPUT); 
  Serial.begin(9600);
  comm.begin(9600);
  wifi_init();
  Serial.println("System Ready..");
}

void loop() {
  digitalWrite(trigPin, LOW); 
  delayMicroseconds(2);

  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  duration = pulseIn(echoPin, HIGH);
  distance = duration * 0.034 / 2; 

  if(distance < 15) {
    repRn = true;
    countTime++;
    toSend += distance;
    toSend += " ";
  }
  else if(distance > 15 && repRn == true) {
    countRep++;
    repRn = false;
    countTime=0;
    toSend += distance;
    toSend += " ";
  }

  if(countTime > 25) {
    Serial.println(countRep);
    String fuckyou = "!" + String(countRep) + " ";
    Serial.println(fuckyou);
    Serial.println("You have completed your set!");
    Serial.print("In this set, you did: ");
    Serial.print(countRep);
    Serial.println(" reps!");

    String combined = fuckyou + toSend;
    Serial.println(combined);
    exit(0);
  }
  Serial.print("Distance: ");
  Serial.print(distance);
  Serial.println(" cm");
  Serial.println(countRep);
  toSend += distance;
  toSend += " ";

  delay(100);
}

void findIp(int time1)  //check for the availability of IP Address
{
  int time2 = millis();
  while (time2 + time1 > millis()) {
    while (comm.available() > 0) {
      if (comm.find("IP has been read")) {
        No_IP = true;
      }
    }
  }
}

void showIP()  //Display the IP Address
{
  IP = "";
  char ch = 0;
  while (1) {
    comm.println("AT+CIFSR");
    while (comm.available() > 0) {
      if (comm.find("STAIP,")) {
        delay(1000);
        Serial.print("IP Address:");
        while (comm.available() > 0) {
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

void establishConnection(String command, int timeOut)  //Define the process for sending AT commands to module
{
  int q = 0;
  while (1) {
    Serial.println(command);
    comm.println(command);
    while (comm.available()) {
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

void wifi_init()  //send AT commands to module
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
  if (!No_IP) {
    Serial.println("Connecting Wifi....");
    establishConnection("AT+CWJAP=\"" + SSID + "\",\"" + PWD + "\"", 7000);  //provide your WiFi username and password here
  } else {
  }
  Serial.println("Wifi Connected");
  showIP();
  establishConnection("AT+CIPMUX=1", 100);
  establishConnection("AT+CIPSERVER=1,80", 100);
}

void sendData(String server1)  //send data to module
{
  int p = 0;
  while (1) {
    unsigned int l = server1.length();
    // Serial.print("AT+CIPSEND=0,");
    comm.print("AT+CIPSEND=0,");
    // Serial.println(l + 2);
    comm.println(l + 2);
    delay(100);
    // Serial.println(server1);
    comm.println(server1);
    while (comm.available()) {
      //Serial.print(Serial.read());
      if (comm.find("OK")) {
        p = 11;
        break;
      }
    }
    if (p == 11)
      break;
    delay(100);
  }
}

void sendToServer()  //send data to webpage
{
  server = "<h1>Welcome to Data Receiving from Arduino</h1>";
  sendData(server);
  server = str1;
  server += str2;
  sendData(server);
  delay(5000);
  comm.println("AT+CIPCLOSE=0");
}