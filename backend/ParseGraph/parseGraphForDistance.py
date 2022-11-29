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

def get_database():
    CONNECTION_STRING = (f'mongodb+srv://Ben:{os.getenv("MONGO_PASSWORD")}@cluster0.qtjn2.mongodb.net/?retryWrites=true&w=majority')
    client = MongoClient(CONNECTION_STRING)
    # print(client.list_database_names())
    return client['4FUN']

def insert_into_database(item):
    dbname = get_database()
    myCol = dbname["newTest"]

    # collection_name = dbname["testing"]

    x = myCol.insert_one(item)
    print(x.inserted_id)
    # collection_name.insert_one(item)

def getData():
    url = "https://www.w3schools.com/html/html_basic.asp"
    page = requests.get(url)
    soup = BeautifulSoup(page.content, "html.parser")
    text = soup.find_all('h2')
    for one in text:
        item = {
            "text": one.get_text()
        }
        print(item)
        insert_into_database(item)

if __name__ == '__main__':
    main()