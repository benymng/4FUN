# author: alex zhu
# date: nov 26, 2022
# parses from site and graphs data from distance sensor, the better sensor

from dotenv import load_dotenv
import os
from bs4 import BeautifulSoup
import requests

import numpy as np
from matplotlib import pyplot as plt

# number of data points
numWords = -1
accel = []

def main():
    getData()

    print(accel)

    # some sample code
    x = np.arange(1, numWords + 1)
    y = np.array(accel)

    plt.title("Distance data") 
    plt.xlabel("Time (0.1s intervals)") 
    plt.ylabel("Distance (cm)") 
    plt.plot(x,y) 
    plt.show()

def getData():
    global numWords
    url = "http://127.0.0.1:5500/" # replace with IP from arduino
    page = requests.get(url)
    soup = BeautifulSoup(page.content, "html.parser")
    text = soup.get_text(" ", strip=True).lower().split()

    for word in text:
        print(word)

        if numWords == -1:
            print("Rep: " + word)
            numWords += 1
        else:
            accel.append(float(word))
            numWords = numWords + 1

    return numWords

if __name__ == '__main__':
    main()