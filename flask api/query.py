import pandas as pd
import pyodbc

def data_pull(server='localhost', database='Football_Data', username='generaluse', password='Password123', query=''):
    cnxn = pyodbc.connect(
        'DRIVER={ODBC Driver 13 for SQL Server};SERVER=' + server + ';DATABASE=' + database + ';UID=' + username
        + ';PWD=' + password)
    return pd.read_sql_query(query, cnxn)
query = """
select *
from reg_pbp_2019
where home_team = 'KC' 
or away_team = 'KC'
"""
df = data_pull(query=query)
print(df)