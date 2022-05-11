import mysql.connector as mysql
import os
import datetime
from dotenv import load_dotenv #only required if using dotenv for creds
 
load_dotenv('credentials.env')
db_host = os.environ['MYSQL_HOST']
db_user = os.environ['MYSQL_USER']
db_pass = os.environ['MYSQL_PASSWORD']
db_name = os.environ['MYSQL_DATABASE']
 
db = mysql.connect(user=db_user, password=db_pass, host=db_host, database=db_name)
cursor = db.cursor()

cursor.execute("CREATE DATABASE IF NOT EXISTS Triton_Gallery;")
cursor.execute("USE Triton_Gallery")
 
cursor.execute("DROP TABLE IF EXISTS Gallery_details;")
 
try:
  cursor.execute("CREATE TABLE Gallery_details (ID integer NULL, Name VARCHAR(50) NOT NULL, Owner VARCHAR(50) NOT NULL, Height integer NULL, Age integer NULL);")
except RuntimeError as err:
  print("runtime error: {0}".format(err))

from_csv = "LOAD DATA INFILE '/var/lib/mysql-files/details.csv' INTO TABLE Gallery_details FIELDS TERMINATED BY ',' ENCLOSED BY '\"' LINES TERMINATED BY '\\n' IGNORE 1 ROWS;"
cursor.execute(from_csv)
db.commit()

