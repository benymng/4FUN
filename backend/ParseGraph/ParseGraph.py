# author: alex zhu and ben ng
# date: nov 8, 2022
# parses from site and graphs data OBSOLETE FILE

import os
from bs4 import BeautifulSoup
import requests
import numpy as np
from matplotlib import pyplot as plt

# number of data points
LENGTH = 5
accel = []

def main():
    getData()
    print(accel)

    # some sample code
    x = np.arange(0, LENGTH)
    y = np.array(accel)

    plt.title("Accelerometer data") 
    plt.xlabel("Time") 
    plt.ylabel("Acceleration") 
    plt.plot(x,y) 
    plt.show()

def getData():
    url = "http://127.0.0.1:5500/backend/ParseGraph/index.html"
    page = requests.get(url)
    soup = BeautifulSoup(page.content, "html.parser")
    text = soup.find_all('h2')
    for one in text:
        item = one.get_text()
        accel.append(float(item))
        print(item)

# def graphData():

if __name__ == '__main__':
    main()