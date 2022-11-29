from flask import Flask, jsonify
from flask_pymongo import PyMongo
from pymongo import MongoClient
from bson import json_util
import json

app = Flask(__name__)
# app.config["MONGO_URI"] = (f'mongodb+srv://Ben:cmXoasys3@cluster0.qtjn2.mongodb.net/?retryWrites=true&w=majority')
# mongo = PyMongo(app)
# print(mongo.list_database_names)
# print(x.)

@app.route("/")
def getAllData():
        CONNECTION_STRING = process.env.connection_string
        client = MongoClient(CONNECTION_STRING)
        myCol = client['4FUN']
        # print(myCol.getCollectionNames())
        test = myCol["newTest"]
        print(client.list_database_names())
        x = myCol["test"].find()
        test = list(x)
        # print(x)
        # for y in x:
        #         print(y["text"])
        return json.dumps(test, indent=2, default=json_util.default)

# @app.route("/", methods=["POST"])
# def testpost():
        