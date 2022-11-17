# author: alex zhu and ben ng
# date: nov 11, 2022
# parses from site and graphs data: 1 of 2 files for prototype

from pymongo import MongoClient
from dotenv import load_dotenv
import os
from bs4 import BeautifulSoup
import requests

import numpy as np
from matplotlib import pyplot as plt
# use source env/bin/activate to activate environment

# number of data points
LENGTH = 10
accel = []

def main():
    getData()

    # database part
    load_dotenv()

    # graph part
    print(accel)

    # some sample code
    x = np.arange(1, LENGTH + 1)
    y = np.array(accel)

    plt.title("Accelerometer data") 
    plt.xlabel("Time") 
    plt.ylabel("Acceleration") 
    plt.plot(x,y) 
    plt.show()

def get_database():
    CONNECTION_STRING = (f'mongodb+srv://Ben:{os.getenv("MONGO_PASSWORD")}@cluster0.qtjn2.mongodb.net/?retryWrites=true&w=majority')
    client = MongoClient(CONNECTION_STRING)
    # print(client.list_database_names())
    return client['4FUN']

def insert_into_database(item):
    dbname = get_database()
    myCol = dbname["newTest"]

    # collection_name = dbname["testing"]

    # commented out for now because of credentials issue: hard code credentials and it works

    # x = myCol.insert_one(item) 
    # print(x.inserted_id)
    # collection_name.insert_one(item)

def getData():
    url = "http://127.0.0.1:5500/backend/ParseGraph/index.html" # replace with IP from arduino
    page = requests.get(url)
    soup = BeautifulSoup(page.content, "html.parser")
    text = soup.find_all('h2')

    idx = 0

    for one in text:

        if (idx >= LENGTH): break

        item = one.get_text()
        accel.append(float(item))
        print(item)
        print(idx)
        insert_into_database(item)
        
        idx = idx + 1
    
if __name__ == '__main__':
    main()