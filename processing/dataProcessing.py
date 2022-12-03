import numpy as np
import matplotlib.pyplot as plt
import requests
import json
#from scipy.interpolate import interp1d

response_API = requests.get("https://4fun-pi.vercel.app/get-raw-data")
data = response_API.text
parse_json = json.loads(data)
# print(parse_json[0]["data"])
givenList = parse_json[0]["data"]

#at the end we have distanceX, distanceY, velocityX, velocityY, accelX, accelY, thirdDerX, thirdDerY and goodReps as things to return
def postData(array, dataType):
    url = f'https://4fun-pi.vercel.app/push-data/{dataType}'
    item = {"data": array}
    x = requests.post(url, json=item)
    # print(x.text)

#convert string to list
# def convert(string):
#     li = list(string.split(" "))
#     return li

#takes the derivative of a dataset
def derivative(xValues, yValues):
    dyforward = [0.0] * (len(xValues))
    for i in range(len(yValues) - 1):
        dyforward[i] = (yValues[i + 1] - yValues[i])/(xValues[i + 1] - xValues[i])
    dyforward[-1] = (yValues[-1] - yValues[-2])/(xValues[-1] - xValues[-2])
    dyforward.pop()
    return dyforward

#prints the graph
def printGraph(x, y, title):
    plt.plot(x, y)
    plt.title(title)
    plt.xlabel("X")
    plt.ylabel("Y")
    plt.show()

#changing the given string to usable lists
# def StringToList(givenString):
#     givenList = convert(givenString) #converts str to a list of strings
#     repNumber = givenList.pop(0) #removes the "!x"
#     repNumber = repNumber[1:] #removes the "!" from repNumber
#     givenList = list(map(int,givenList)) #typecasts the values in givenList to int
#     return givenList, repNumber

#filtering the data for the extraneous values
def filterData(x, y, givenList, extraneousMin):
    for item in range(len(givenList)):
        if givenList[item] < extraneousMin:
            y.append(givenList[item])
            x.append(item / 10)
    return x, y


#these are the functions for finding the number of "good" reps based on which way the sensor is pointed towards
# targetValue = yValues[0] - repLength # we assume the first datapoint is the resting position
def findReps(y, target):
    goodReps = 0
    for i in range(len(y)):
        if y[i] < target:
            goodReps = goodReps + 1
            if y[i - 1] < target:
                goodReps = goodReps - 1
    return goodReps

# targetValue = yValues[0] + repLength # we assume the first datapoint is the resting position
def findReps2(y, target):
    goodReps = 0
    for i in range(len(y)):
        if y[i] > target:
            goodReps = goodReps + 1
            if y[i - 1] > target:
                goodReps = goodReps - 1
    return goodReps


#function that calculates the average of 2 sets 3 consecutive points and if the difference is higher than a threshold, then it will delete the point
def movingAverage(x, y, threshold):
    indexesToDelete = []
    i = 0
    while (i < len(y) - 3): # -3 for moving average of 3
        average1 = (y[i] + y[i + 1] + y[i + 2]) / (3)
        average2 = (y[i + 1] + y[i + 2] + y[i + 3]) / (3)
        if abs(average1 - average2) > threshold:
            indexesToDelete.append(i + 3)
            i = i + 3
        i+=1

    highest = len(indexesToDelete)
    for i in range(len(indexesToDelete)):
        y.pop(indexesToDelete[highest - 1 - i])
        x.pop(indexesToDelete[highest - 1 - i])
    
    return x, y

# test strings
# given = "!2 20 20 19 19 19 19 18 16 13 13 10 10 6 6 4 4 2 2 1 1 1 1 1 1 2 2 2 2 1 1 2 2 5 5 10 10 13 13 18 18 22 26 29 31 35 33 31 31 27 25 21 17 12 12 8 8 5 5 3 3 2 2 1 1 2 2 1 1 1 1 1 1 2 2 3 3 7 7 12 12 18 18 22 28 31 32 32 31 29 26 23 19 14 14 10 10 6 6 3 3 2 2 1 1 2 2 2 2 2 2 3 3 3"
# given = "!8 88 87 87 88 88 88 88 88 88 61 88 88 88 84 83 80 76 72 69 64 61 58 47 53 50 48 46 44 43 42 40 39 37 37 36 34 33 32 32 31 30 30 29 29 28 28 28 28 28 28 28 28 28 28 28 28 29 30 31 35 38 43 49 56 64 71 86 103 82 83 87 100 103 92 101 98 96 73 66 60 53 49 45 42 38 35 31 28 25 25 25 25 23 23 22 22 22 22 21 21 20 20 21 21 21 21 22 22 25 25 29 29 37 43 52 56 62 68 72 76 79 81 84 50 83 81 78 74 69 62 54 46 39 37 28 23 23 20 20 17 17 16 16 16 16 17 17 17 17 18 18 18 18 18 18 20 20 18 18 22 22 26 26 33 33 40 47 57 63 68 72 75 77 80 82 81 81 78 71 65 58 51 45 40 34 28 25 25 22 22 20 20 19 19 18 18 17 17 17 17 17 17 18 18 17 17 18 18 19 19 21 21 21 21 25 25 31 31 37 45 51 57 63 66 70 74 75 77 80 81 76 72 67 51 55 53 43 36 32 27 27 23 23 21 21 19 19 18 18 17 17 17 17 18 18 17 17 18 18 18 18 19 19 20 20 23 23 26 26 30 30 36 43 50 56 62 68 73 55 89 91 91 92 90 88 69 63 41 50 44 37 31 26 26 22 22 20 20 19 19 18 18 17 17 17 17 18 18 20 20 21 21 24 24 27 27 33 33 42 47 57 66 74 80 85 88 90 91 92 91 92 94 94 94 93 93 70 92 91 91 90 89 89 88 87 83 81 80 79 78 79 79 79 79 80 80 80 79 79 79 79 7"

#these should be changed based on the parameters needed
extraneousMin = 200 # this would be in practice 200 since 200cm is around 6-7 feet
repLength = 60 # in reality maybe like 50cm for each rep counts as a good rep?
avgDiffThreshold = 5 #may be changed


# givenList, reps = StringToList(given)

#makes x and y lists that are filtered for extraneous points
xValues = []
yValues = []
xValues, yValues = filterData(xValues, yValues, givenList, extraneousMin)

#removes more extraneous points using moving average
xValues, yValues = movingAverage(xValues, yValues, avgDiffThreshold)

#creates x and y distance lists
distanceX = xValues.copy()
distanceY = yValues.copy()

#creates x and y velocity lists
firstderivative = derivative(xValues, yValues)
xValues.pop()
velocityX = xValues.copy()
velocityY = firstderivative.copy()

#creates x and y acceleration lists
secondderivative = derivative(xValues, firstderivative)
xValues.pop()
accelX = xValues.copy()
accelY = secondderivative.copy()

#creates x and y third derivative lists
thirdderivative = derivative(xValues, secondderivative)
xValues.pop()
thirdDerX = xValues.copy()
thirdDerY = thirdderivative.copy()

#finds the number of good reps
# targetValue = yValues[0] + repLength # for findReps2
targetValue = yValues[0] - repLength # we assume the first datapoint is the resting position
goodReps = findReps(distanceY, targetValue)

#at the end we have distanceX, distanceY, velocityX, velocityY, accelX, accelY, thirdDerX, thirdDerY and goodReps as things to return

postData(distanceX, "distanceX")
postData(distanceY, "distanceY")
postData(velocityX, "velocityX")
postData(velocityY, "velocityY")
postData(accelX, "accelX")
postData(accelY, "accelY")
postData(thirdDerX, "thirdDerX")
postData(thirdDerY, "thirdDerY")
postData(goodReps, "goodReps")



# printGraph(distanceX, distanceY, "distance")
# printGraph(velocityX, velocityY, "first derivative / velocity")
# printGraph(accelX, accelY, "second derivative / acceleration")

#print(given)
#print(givenList)
#print(xValues)
#print(yValues)
# print(distanceX)
#print(distanceY)
#print(velocityX)
#print(velocityY)
# print(accelX)
#print(accelY)
# print(goodReps)

# df_distance_time = pd.DataFrame(
#     { 'time' : xValues, 'distance' : yValues })

# print(df_distance_time)
#df_distance_time.plot()

# cubic_interpolation_model = interp1d(xValues, yValues, kind = "cubic")
 
# # Plotting the Graph
# X_=np.linspace(min(xValues), max(xValues), 500)
# Y_=cubic_interpolation_model(X_)
 
# plt.plot(X_, Y_)
# plt.title("Plot Smooth Curve Using the scipy.interpolate.interp1d Class")
# plt.xlabel("X")
# plt.ylabel("Y")
# plt.show()