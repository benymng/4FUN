#include <MPU6050.h>
#include <Wire.h>

#define echoPin 7
#define trigPin 5

const int buttonPin = 2;    
const int ledPin = 12;     
int buttonPushCounter = 1;  
int buttonState = 0;       
int lastButtonState = 0; 
long duration;
int distance;

MPU6050 mpu;

void setup() {
  Serial.begin(115200);
}

void loop() {
  while(!mpu.begin(MPU6050_SCALE_2000DPS, MPU6050_RANGE_2G)) {
    Serial.println("Could not find a valid MPU6050 sensor, check wiring!");
    delay(5000);
  }
  printAccelData();
}

void printAccelData () {
  Vector normAccel = mpu.readNormalizeAccel();
  Serial.print(normAccel.XAxis);
  Serial.print(" ");
  Serial.print(normAccel.YAxis);
  Serial.print(" ");
  Serial.print(normAccel.ZAxis);
  Serial.println();
  Serial.println();
}

void checkSettings() {
  Serial.println();
  Serial.print(" * Sleep Mode:            ");
  Serial.println(mpu.getSleepEnabled() ? "Enabled" : "Disabled");

  Serial.print(" * Clock Source:          ");
  switch (mpu.getClockSource()) {
    case MPU6050_CLOCK_KEEP_RESET: Serial.println("Stops the clock and keeps the timing generator in reset"); break;
    case MPU6050_CLOCK_EXTERNAL_19MHZ: Serial.println("PLL with external 19.2MHz reference"); break;
    case MPU6050_CLOCK_EXTERNAL_32KHZ: Serial.println("PLL with external 32.768kHz reference"); break;
    case MPU6050_CLOCK_PLL_ZGYRO: Serial.println("PLL with Z axis gyroscope reference"); break;
    case MPU6050_CLOCK_PLL_YGYRO: Serial.println("PLL with Y axis gyroscope reference"); break;
    case MPU6050_CLOCK_PLL_XGYRO: Serial.println("PLL with X axis gyroscope reference"); break;
    case MPU6050_CLOCK_INTERNAL_8MHZ: Serial.println("Internal 8MHz oscillator"); break;
  }
  Serial.print(" * Accelerometer:         ");
  switch (mpu.getRange()) {
    case MPU6050_RANGE_16G: Serial.println("+/- 16 g"); break;
    case MPU6050_RANGE_8G: Serial.println("+/- 8 g"); break;
    case MPU6050_RANGE_4G: Serial.println("+/- 4 g"); break;
    case MPU6050_RANGE_2G: Serial.println("+/- 2 g"); break;
  }
  Serial.println();
}