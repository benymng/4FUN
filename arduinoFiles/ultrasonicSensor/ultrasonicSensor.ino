#define echoPin 7 
#define trigPin 5 

bool repRn = false;
long duration=0;
int distance=0, countRep=0, countTime=0;

void setup() {
  pinMode(trigPin, OUTPUT); 
  pinMode(echoPin, INPUT); 
  Serial.begin(9600);
  Serial.println("Ultrasonic Sensor HC-SR04 Test"); 
}
void loop() {
  digitalWrite(trigPin, LOW); 
  delayMicroseconds(2);

  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  duration = pulseIn(echoPin, HIGH);
  distance = duration * 0.034 / 2; 

  if(distance < 5) {
    repRn = true;
    countTime++;
  }
  if(distance > 10 && repRn == true) {
    countRep++;
    repRn = false;
    countTime=0;
  }

  if(countTime > 5) {
    Serial.println("You have completed your set!");
    Serial.print("In this set, you did: ");
    Serial.print(countRep);
    Serial.println(" reps!");
    exit(0);
  }
  Serial.print("Distance: ");
  Serial.print(distance);
  Serial.println(" cm");
  Serial.println(countRep);

  delay(500);
}