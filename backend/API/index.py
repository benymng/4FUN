from flask import Flask, jsonify
import os
from flask_pymongo import PyMongo
from pymongo import MongoClient
from bson import json_util
import json

app = Flask(__name__)

@app.route("/")
def home():
    CONNECTION_STRING = os.environ.get('CONNECTION_STRING')
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

@app.route("/testing")
def test():
    return "testing"