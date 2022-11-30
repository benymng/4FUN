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
    table = myCol["raw-data"].find()
    data = list(table)
    # print(x)
    # for y in x:
    #         print(y["text"])
    return json.dumps(data, indent=2, default=json_util.default)

@app.route('/push-data/<dataType>', methods=['POST'])
def sendFilteredData(dataType):
    print(dataType)
    data = request.json
    CONNECTION_STRING = os.environ.get('CONNECTION_STRING')
    x = data["data"]
    client = MongoClient(CONNECTION_STRING)
    myCol = client['4FUN']
    table = myCol[dataType]
    item = {
        "data": x
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

@app.route("/send-workout-summary", methods=["POST"])
def send_workout_summary():
    data = request.json
    CONNECTION_STRING = os.environ.get('CONNECTION_STRING')
    x = data["workout-length"]
    y = data["timestamp"]
    client = MongoClient(CONNECTION_STRING)
    myCol = client['4FUN']
    table = myCol["workout-summary"]
    item = {
        "workoutLength": x,
        "timestamp": y
    }
    table.insert_one(item)
    return jsonify(data)

@app.route("/get-workout-summary")
def get_workout_summary():
    CONNECTION_STRING = os.environ.get('CONNECTION_STRING')
    client = MongoClient(CONNECTION_STRING)
    myCol = client['4FUN']
    table = myCol["workout-summary"].find()
    data = list(table)
    return json.dumps(data, indent=2, default=json_util.default)