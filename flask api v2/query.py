import numpy as np
import pandas as pd
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify

# Create our session (link) from Python to the DB
engine = create_engine("sqlite:///footballsource.sqlite")
conn = engine.connect()
# result = conn.execute("select * from reg_pbp_2019 where home_team = 'KC' ")
data = pd.read_sql("select * from reg_pbp_2019 where home_team = 'KC'", conn)
datadict = data.to_dict()
# for x in data:
#     print(x)
print(data)