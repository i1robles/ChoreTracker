# lNOTICE: This version of the file is for testing. In reality, we would need each 
# family account to be creating their own tables

# Import MySQL Connector Driver
import mysql.connector as mysql

# Load the credentials from the secured .env file
import os
from dotenv import load_dotenv
load_dotenv('credentials.env')

db_user = os.environ['MYSQL_USER']
db_pass = os.environ['MYSQL_PASSWORD']
db_name = os.environ['MYSQL_DATABASE']
db_host = os.environ['MYSQL_HOST'] # must 'localhost' when running this script outside of Docker

# Connect to the database
db = mysql.connect(user=db_user, password=db_pass, host=db_host, database=db_name)
cursor = db.cursor()

# # CAUTION!!! CAUTION!!! CAUTION!!! CAUTION!!! CAUTION!!! CAUTION!!! CAUTION!!!
cursor.execute("drop table if exists Users;")
cursor.execute("drop table if exists username_users;")
cursor.execute("drop table if exists username_chore_options;")
cursor.execute("drop table if exists username_assigned;")
cursor.execute("drop table if exists username_backlog;")
cursor.execute("drop table if exists username_redeemed;")
# # CAUTION!!! CAUTION!!! CAUTION!!! CAUTION!!! CAUTION!!! CAUTION!!! CAUTION!!!

# Create a table for storing families
try:
  cursor.execute("""
    CREATE TABLE username_users (
      child_name     VARCHAR(30) NOT NULL,
      child_points   INTEGER  NOT NULL,
      birth_date     VARCHAR(12),
      pin            CHAR(4) 
    );
  """)
except:
  print("username_users table already exists. Not recreating it.")

# Create a table for storing chore options
try:
  cursor.execute("""
    CREATE TABLE username_chore_options (
      chore_name     VARCHAR(30) NOT NULL,
      chore_points   INTEGER  NOT NULL,
      status         VARCHAR(12) 
    );
  """)
except:
  print("username_chore_options table already exists. Not recreating it.")

# Create a table for storing active chores
try:
  cursor.execute("""
    CREATE TABLE username_assigned (
      child_name     VARCHAR(30) NOT NULL,
      chore_name     VARCHAR(30) NOT NULL,
      chore_points   INTEGER  NOT NULL,
      due_date       VARCHAR(12) NOT NULL
    );
  """)
except:
  print("username_assigned table already exists. Not recreating it.")

# Create a table for storing backlog of chores
try:
  cursor.execute("""
    CREATE TABLE username_backlog (
      child_name     VARCHAR(30) NOT NULL,
      chore_name     VARCHAR(30) NOT NULL,
      chore_points   INTEGER  NOT NULL,
      due_date       VARCHAR(12) NOT NULL,
      complete_date  VARCHAR(12) NOT NULL
    );
  """)
except:
  print("username_backlog table already exists. Not recreating it.")

# Create a table for storing backlog of points redeemed
try:
  cursor.execute("""
    CREATE TABLE username_redeemed (
      child_name     VARCHAR(30) NOT NULL,
      redeem_points   INTEGER  NOT NULL,
      redeem_date  VARCHAR(12) NOT NULL
    );
  """)
except:
  print("username_redeemed table already exists. Not recreating it.")

# Insert Records of a family
query = "insert into username_users (child_name, child_points, birth_date, pin) values (%s, %s, %s, %s)"
values = [
  ('Parent', '0', '1998-12-06', '1234'),
  ('Julia', '0', '1998-12-06', 'NULL'),
  ('Merve', '0', '1998-12-06', 'NULL'),
  ('Andrew', '0', '1998-12-06', 'NULL')
]
cursor.executemany(query, values)
db.commit()

# Insert Records of chore options
query = "insert into username_chore_options (chore_name, chore_points, status) values (%s, %s, %s)"
values = [
  ('Take Out Trash', '10', '0%'+' Full'),
  ('Do Your Homework', '10', 'NULL'),
  ('Make Your Bed', '10', 'Not Done'),
  ('Clean Your Room', '10', 'NULL'),
  ('Do The Dishes', '20', 'NULL'),
  ('Do Your Laundry', '20', 'NULL'),
  ('Sweep The Floor', '20', 'NULL'),
  ('Vaccuum The Carpet', '50', 'NULL'),
  ('Mow The Lawn', '50', 'NULL')
]
cursor.executemany(query, values)
db.commit()

# Insert Records of chore assigned now
query = "insert into username_assigned (child_name, chore_name, chore_points, due_date) values (%s, %s, %s, %s)"
values = [
  ('Parent', 'Mow The Lawn', '50', '2022-07-03'),
  ('Julia', 'Take Out Trash', '10', '2022-07-03'),
  ('Julia', 'Do Your Homework', '10', '2022-07-04'),
  ('Merve', 'Clean Your Room', '10', '2022-07-05'),
  ('Merve', 'Do The Dishes', '20', '2022-07-04'),
  ('Andrew', 'Take Out Trash', '10', '2022-07-05'),
  ('Andrew', 'Do Your Laundry', '20', '2022-07-07')
]
cursor.executemany(query, values)
db.commit()

# Selecting Records
cursor.execute("select child_name from username_users;")
print('---------- USERNAME USERS ----------')
[print(x) for x in cursor]
# Selecting Records
cursor.execute("select chore_name, chore_points from username_chore_options;")
print('---------- CHORE OPTIONS ----------')
[print(x) for x in cursor]
# Selecting Records
cursor.execute("select * from username_assigned;")
print('---------- ASSIGNED CHORES ----------')
[print(x) for x in cursor]
db.close()