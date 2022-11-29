from pymongo import MongoClient
from dotenv import load_dotenv
import os
from bs4 import BeautifulSoup
import requests

# use source env/bin/activate to activate environment

def main():
    load_dotenv()
    getData()



def get_database():
    CONNECTION_STRING = (f'mongodb+srv://PASSWORD@cluster0.qtjn2.mongodb.net/?retryWrites=true&w=majority')
    client = MongoClient(CONNECTION_STRING)
    # print(client.list_database_names())
    return client['4FUN']

def insert_into_database(item):
    dbname = get_database()
    myCol = dbname["test"]

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