from flask import Flask
from flask_pymongo import flask_pymongo
from app import app

def main():
#     print("Hello world");
#     read_from_database()

# def get_database():
#     CONNECTION_STRING = (f'mongodb+srv://Ben:{os.getenv("MONGO_PASSWORD")}@cluster0.qtjn2.mongodb.net/?retryWrites=true&w=majority')
#     client = MongoClient(CONNECTION_STRING)
#     # print(client.list_database_names())
#     return client['4FUN']

# def insert_into_database(item):
#     dbname = get_database()
#     myCol = dbname["newTest"]

#     # collection_name = dbname["testing"]

#     x = myCol.insert_one(item)
#     print(x.inserted_id)
#     # collection_name.insert_one(item)

# def read_from_database():
#     dbname = get_database()
#     myCol = dbname["newTest"]

#     x = myCol.find_all()
#     print(x)
#     return x

# client = pymongo.MongoClient(CONNECTION_STRING)
# db = client.get_database("flask_mongodb_atlas")
# user_collection

if __name__ == '__main__':
    main()