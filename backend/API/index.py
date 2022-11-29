from flask import Flask, jsonify, request
import os
from flask_pymongo import PyMongo
from pymongo import MongoClient
from bson import json_util
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/get-raw-data")
def get_raw_data():
    CONNECTION_STRING = os.environ.get('CONNECTION_STRING')
    client = MongoClient(CONNECTION_STRING)
    myCol = client['4FUN']
    # print(myCol.getCollectionNames())
    # print(client.list_database_names())
    table = myCol["newTest"].find()
    data = list(table)
    # print(x)
    # for y in x:
    #         print(y["text"])
    return json.dumps(data, indent=2, default=json_util.default)

@app.route("/push-data", methods=['POST'])
def sendFilteredData():
    data = request.json
    CONNECTION_STRING = os.environ.get('CONNECTION_STRING')
    data = data["point"]
    client = MongoClient(CONNECTION_STRING)
    myCol = client['4FUN']
    table = myCol["filtered-data"]
    item = {
        "data": data
    }
    table.insert_one(item)
    return jsonify(data)

@app.route("/get-filtered-data")
def get_filtered_data():
    CONNECTION_STRING = os.environ.get('CONNECTION_STRING')
    client = MongoClient(CONNECTION_STRING)
    myCol = client['4FUN']
    # print(myCol.getCollectionNames())
    # print(client.list_database_names())
    table = myCol["filtered-data"].find()
    data = list(table)
    # print(x)
    # for y in x:
    #         print(y["text"])
    return json.dumps(data, indent=2, default=json_util.default)
