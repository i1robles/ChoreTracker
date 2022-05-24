import mysql.connector as mysql # Allows us to run SQL commands in Python
import os                       # Used to import environment data
from dotenv import load_dotenv  # Used to load data from .env file

load_dotenv('credentials.env') # Loads all details from the "credentials.env"

''' Environment Variables '''
db_host = os.environ['MYSQL_HOST']
db_user = os.environ['MYSQL_USER']
db_pass = os.environ['MYSQL_PASSWORD']

db = mysql.connect(
  host= db_host,
  user=db_user,
  password=db_pass,
)

cursor = db.cursor()

cursor.execute("CREATE DATABASE IF NOT EXISTS ChoreTracker;")
cursor.execute("USE ChoreTracker;")
cursor.execute("DROP TABLE IF EXISTS Users;")
cursor.execute("DROP TABLE IF EXISTS Assignments;")
cursor.execute("DROP TABLE IF EXISTS Chores;")

try:
  cursor.execute("""
    CREATE TABLE Users (
      userName    VARCHAR(50) NOT NULL,   
      points      INT NOT NULL,
      pin         INT NOT NULL
    );
  """)
  cursor.execute("""
    CREATE TABLE Assignments (
      id          INT NOT NULL,
      choreName   VARCHAR(50) NOT NULL,
      userName    VARCHAR(50) NOT NULL,
      dueDate     DATE NOT NULL,
      doneDate    DATE NOT NULL,
      completed   BOOLEAN NOT NULL,   
      points      INT NOT NULL
    );
  """)
  cursor.execute("""
    CREATE TABLE Chores (
      id          INT AUTO_INCREMENT PRIMARY KEY,
      choreName   VARCHAR(50) NOT NULL,   
      status      INT NOT NULL,
      time        DATETIME NOT NULL
    );
  """)
  db.commit()
except RuntimeError as err:
  print("runtime error: {0}".format(err))
  
db.commit()