import numpy as np
import pandas as pd
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify


#################################################
# Database Setup
#################################################


# def datapull(query=''):
#     engine = create_engine("sqlite:///footballsource.sqlite")
#     conn = engine.connect()
#     data = pd.read_sql(query, conn)
#     datadict = data.to_dict()
#     return(datadict)
# print(datapull(query="select * from reg_pbp_2019 where home_team = 'kc'"))
#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/football"
    )


@app.route("/api/v1.0/football")
def names():
    # Create our session (link) from Python to the DB
    engine = create_engine("sqlite:///footballsource.sqlite")
    conn = engine.connect()
    data = pd.read_sql("select * from reg_pbp_2019 where home_team = 'KC'", conn)
    datadict = data.to_dict()
    return jsonify(datadict)



if __name__ == '__main__':
    app.run(debug=True)
