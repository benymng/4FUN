# need to find out how to take the original string from the database and how to return all the processed data to the database


import numpy as np
import matplotlib.pyplot as plt
from scipy.interpolate import interp1d

#convert string to list
def convert(string):
    li = list(string.split(" "))
    return li

#takes the derivative
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
def StringToList(givenString):
    givenList = convert(givenString) #converts str to a list of strings
    repNumber = givenList.pop(0) #removes the "!x"
    repNumber = repNumber[1:] #removes the "!" from repNumber
    givenList = list(map(int,givenList)) #typecasts the values in givenList to int
    return givenList, repNumber

#filtering the data for the extraneous values
def filterData(x, y, givenList, extraneousMin):
    for item in range(len(givenList)):
        if givenList[item] < extraneousMin:
            y.append(givenList[item])
            x.append(item / 10)
    return x, y

#returns the number of "good" reps
def findReps(y, target):
    goodReps = 0
    for i in range(len(y)):
        if y[i] > target:
            goodReps = goodReps + 1
            if y[i - 1] > target:
                goodReps = goodReps - 1
    return goodReps

given = "!2 20 20 19 19 19 19 18 16 13 13 10 10 6 6 4 4 2 2 1 1 1 1 1 1 2 2 2 2 1 1 2 2 5 5 10 10 13 13 18 18 22 26 29 31 35 33 31 31 27 25 21 17 12 12 8 8 5 5 3 3 2 2 1 1 2 2 1 1 1 1 1 1 2 2 3 3 7 7 12 12 18 18 22 28 31 32 32 31 29 26 23 19 14 14 10 10 6 6 3 3 2 2 1 1 2 2 2 2 2 2 3 3 3"

#these should be changed based on the parameters needed
extraneousMin = 30 # this would be in practice 200 since 200cm is around 6-7 feet
repLength = 5 # in reality maybe like 50cm for each rep counts as a good rep?


givenList, reps = StringToList(given)

xValues = []
yValues = []
xValues, yValues = filterData(xValues, yValues, givenList, extraneousMin)



distanceX = xValues.copy()
distanceY = yValues.copy()

firstderivative = derivative(xValues, yValues)
xValues.pop()
velocityX = xValues.copy()
velocityY = firstderivative.copy()

secondderivative = derivative(xValues, firstderivative)
xValues.pop()
accelX = xValues.copy()
accelY = secondderivative.copy()

printGraph(distanceX, distanceY, "distance")
printGraph(velocityX, velocityY, "first derivative / velocity")
printGraph(accelX, accelY, "second derivative / acceleration")


targetValue = yValues[0] + repLength # we assume the first datapoint is the resting position
goodReps = findReps(distanceY, targetValue)

#at the end we have distanceX, distanceY, velocityX, velocityY, accelX, accelY, and goodReps as things to return

#print(given)
#print(givenList)
#print(xValues)
#print(yValues)
#print(distanceX)
#print(distanceY)
#print(velocityX)
#print(velocityY)
#print(accelX)
#print(accelY)
#print(goodReps)



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