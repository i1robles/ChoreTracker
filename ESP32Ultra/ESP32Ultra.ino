
/*
  Rui Santos
  Complete project details at Complete project details at https://RandomNerdTutorials.com/esp32-http-get-post-arduino/

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files.

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.
*/

#include <WiFi.h>
#include <HTTPClient.h>

 const char* ssid = "Andrew's Phone";
 const char* password = "lab5sucks";

//const char* ssid = "it's what it's";
//const char* password = "they're over there";

//Your Domain name with URL path or IP address with path
//String serverName = "http://192.168.187.207:6543/chores/"; //Andrew Wifi
String serverName = "http://choretrackerapp.com/chores_trash/"; //Project Wifi
//String serverName = "http://192.168.43.148:6543/chores/"; //Merve Wifi
//String serverName = "http://192.168.1.24:6543/chores/";

// the following variables are unsigned longs because the time, measured in
// milliseconds, will quickly become a bigger number than can be stored in an int.
unsigned long lastTime = 0;
// Timer set to 10 minutes (600000)
//unsigned long timerDelay = 600000;
// Set timer to 5 seconds (5000)
unsigned long timerDelay = 5000;
int dist_array[3] = {0};

// defines pins numbers
const int trigPin = 12;
const int echoPin = 13;
const int ledPin = 14;
const int switchPin = 15;
String state = "";
long duration;
int distance;
int array_ind=0;

void setup() {

  pinMode(trigPin, OUTPUT); // Sets the trigPin as an Output
  pinMode(echoPin, INPUT); // Sets the echoPin as an Input
  pinMode(ledPin, OUTPUT);
  pinMode(switchPin, INPUT_PULLUP);
  Serial.begin(115200);

  WiFi.begin(ssid, password);
  Serial.println("Connecting");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());
  Serial.println("Timer set to 5 seconds (timerDelay variable), it will take 5 seconds before publishing the first reading.");
}

void loop() {

  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  // Sets the trigPin on HIGH state for 10 micro seconds
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  // Reads the echoPin, returns the sound wave travel time in microseconds
  duration = pulseIn(echoPin, HIGH);
  // Calculating the distance
  distance = duration * 0.034 / 2;
  
  //Calculate the average distance
  dist_array[array_ind] = distance;
  array_ind = array_ind +1;
  float dist_ave= (dist_array[0]+dist_array[1]+dist_array[2])/3;
  if(array_ind >2){
    array_ind=0;
  }

  //read the pushbutton value into a variable
//  int sensorVal = digitalRead(switchPin);
//  if (sensorVal == HIGH) {
//    digitalWrite(ledPin, HIGH);
//    state = "open";
//  }
//  else {
//    digitalWrite(ledPin, LOW);
//    state = "closed";
//  }



  //Send an HTTP POST request every 5 second
  if ((millis() - lastTime) > timerDelay) {
    //Check WiFi connection status
    if (WiFi.status() == WL_CONNECTED) {
      HTTPClient http;

      String serverPath = serverName + String(dist_ave);

      // Your Domain name with URL path or IP address with path
      http.begin(serverPath.c_str());

      // Send HTTP GET request
      int httpResponseCode = http.GET();

      if (httpResponseCode > 0) {
        Serial.print("HTTP Response code: ");
        Serial.println(httpResponseCode);
        String payload = http.getString();
        Serial.println(payload);
      }
      else {
        Serial.print("Error code: ");
        Serial.println(httpResponseCode);
      }
      // Free resources
      http.end();
    }
    else {
      Serial.println("WiFi Disconnected");
    }
    lastTime = millis();
  }
}
