#include <SoftwareSerial.h>    
#include <Wire.h>
#include <MPU6050.h>  

SoftwareSerial comm(10, 11);
#define echoPin 7 
#define trigPin 5 

String toSend = "";

bool repRn = false;
long duration=0;
int distance=0, countRep=0, countTime=0;

void setup() {
  pinMode(trigPin, OUTPUT); 
  pinMode(echoPin, INPUT); 
  Serial.begin(9600);
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
