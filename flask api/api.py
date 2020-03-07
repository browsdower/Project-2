import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify

import pandas as pd
import pyodbc

def data_pull(server='localhost', database='Football_Data', username='generaluse', password='Password123', query=''):
    cnxn = pyodbc.connect(
        'DRIVER={ODBC Driver 13 for SQL Server};SERVER=' + server + ';DATABASE=' + database + ';UID=' + username
        + ';PWD=' + password)
    return pd.read_sql_query(query, cnxn)


engine = create_engine("sqlite:///footballsource.sqlite")

# # reflect an existing database into a new model
# Base = automap_base()
# # reflect the tables
# Base.prepare(engine, reflect=True)

# # Save reference to the table
# footballdata = Base.classes.reg_pbp_2019



app = Flask(__name__)

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/football"
    )

@app.route("/api/v1.0/football")
def football():
    query = """
    select *
    from reg_pbp_2019
    where home_team = 'KC' 
    or away_team = 'KC'
    """
    df = data_pull(query=query)
    df = df.to_json()
    return jsonify(df)



if __name__ == "__main__":
    app.run(debug=True)