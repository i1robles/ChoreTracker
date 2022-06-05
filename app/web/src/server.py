from posixpath import split
from wsgiref.simple_server import make_server
from pyramid.config import Configurator
from pyramid.response import Response, FileResponse
from pyramid.renderers import render_to_response

import mysql.connector as mysql
import os

db_user = os.environ['MYSQL_USER']
db_pass = os.environ['MYSQL_PASSWORD']
db_name = os.environ['MYSQL_DATABASE']
db_host = os.environ['MYSQL_HOST']

def get_home(req):
  return FileResponse("pages/index.html")

def get_login_page(req):
  return FileResponse("pages/login.html")
  
def get_signup_page(req):
  return FileResponse("pages/signUp.html")
  
def get_main_page(req):
  return FileResponse("pages/main.html")

# get the data in the assigned table
def get_data(req):
  #connect to the database
  db = mysql.connect(host=db_host, user=db_user, passwd=db_pass, database=db_name)
  cursor = db.cursor()
  cursor.execute("USE agile_db")
  # cursor.execute("INSERT INTO table VALUES (%s, %s, %s)", (var1, var2, var3))
  cursor.execute("select * from username_assigned;")

# display all records we get 
  record = cursor.fetchall()
  print("All Data received:")
  print(record)
  db.close()
 
  # if no record found, return error json
  if record is None:
    return {
      'error' : "No data was found for the given ID" ,
      'id': "",
      'GPIO' : "",
      'Keyboard': ""
    }

  return record

# get the child names in the users table
def get_child_names(req):
  #connect to the database
  db = mysql.connect(host=db_host, user=db_user, passwd=db_pass, database=db_name)
  cursor = db.cursor()
  cursor.execute("USE agile_db")
  cursor.execute("select child_name from username_users;")

# display all records we get 
  record = cursor.fetchall()
  print("Child Names received:")
  print(record)
  db.close()
 
  # if no record found, return error json
  if record is None:
    return {
      'error' : "No data was found for the given ID" ,
      'id': "",
      'GPIO' : "",
      'Keyboard': ""
    }

  return record

# get the chores in the chore_options table
def get_chore_names(req):
  #connect to the database
  db = mysql.connect(host=db_host, user=db_user, passwd=db_pass, database=db_name)
  cursor = db.cursor()
  cursor.execute("USE agile_db")
  cursor.execute("select chore_name from username_chore_options;")

# display all records we get 
  record = cursor.fetchall()
  print("Chore Names received:")
  print(record)
  db.close()
 
  # if no record found, return error json
  if record is None:
    return {
      'error' : "No data was found for the given ID" ,
      'id': "",
      'GPIO' : "",
      'Keyboard': ""
    }

  return record


# Add a chore into the assigned table
def assign_chore(req):
  # Retrieve the route argument
  the_id = req.matchdict['assign_id']
  # print(the_id)

  # Parse the_id to get the different parts
  split_array = the_id.split(".")
  child_name = split_array[0]
  chore_name = split_array[1]
  due_date = split_array[2]

  # Connect to the database
  db = mysql.connect(host=db_host, user=db_user, passwd=db_pass, database=db_name)
  cursor = db.cursor()
  cursor.execute("use agile_db")
  # Get the points associated to the chore_name
  query = "select chore_points from username_chore_options where chore_name = %s;"
  cursor.execute(query, (chore_name,))
  chore_points = cursor.fetchall()
  # Extract the number from the fetch
  chore_points = chore_points[0][0]

  # Insert new chore into assigned table
  query = "insert into username_assigned (child_name, chore_name, chore_points, due_date) values (%s, %s, %s, %s)"
  values = [
    (child_name, chore_name, chore_points, due_date)
  ]
  cursor.executemany(query, values)
  db.commit()
  db.close()
  return

# Remove a chore from the assigned table
def unassign_chore(req):
  # Retrieve the route argument
  the_id = req.matchdict['unassign_id']

  # Parse the_id to get the different parts
  split_array = the_id.split(".")
  child_name = split_array[0]
  chore_name = split_array[1]
  due_date = split_array[2]

  # Connect to the database
  db = mysql.connect(host=db_host, user=db_user, passwd=db_pass, database=db_name)
  cursor = db.cursor()
  cursor.execute("use agile_db")
  # Insert new chore into assigned table
  query = "delete from username_assigned where child_name = %s and chore_name = %s and due_date = %s"
  values = [
    (child_name, chore_name, due_date)
  ]
  cursor.executemany(query, values)
  db.commit()
  db.close()
  return


# Add a child into the users table
def create_child(req):
  # Retrieve the route argument
  the_id = req.matchdict['child_id']
  print(the_id)

  # Parse the_id to get the different parts
  split_array = the_id.split(".")
  child_name = split_array[0]
  birth_date = split_array[1]

  # Connect to the database
  db = mysql.connect(host=db_host, user=db_user, passwd=db_pass, database=db_name)
  cursor = db.cursor()
  cursor.execute("use agile_db")
  # Insert new chore into assigned table
  query = "insert into username_users (child_name, child_points, birth_date, pin) values (%s, %s, %s, %s)"
  values = [
    (child_name, 0, birth_date, 0)
  ]
  cursor.executemany(query, values)
  db.commit()
  db.close()
  return


def get_vals(req):
  data = req.matchdict['chore_data']

  print(data)
  return True
  
if __name__ == '__main__':
  with Configurator() as config:
    # Add the landing page for the website
    config.add_route('home', '/')
    # Directs the route to the function that can generate the view
    config.add_view(get_home, route_name='home')

    # Adds key value proposition route in the website
    config.add_route('login', '/login')
    # Directs the route to the function that can generate the view
    config.add_view(get_login_page, route_name='login')

    # Adds key value proposition route in the website
    config.add_route('signUp', '/signUp')
    # Directs the route to the function that can generate the view
    config.add_view(get_signup_page, route_name='signUp')

    # Adds key value proposition route in the website
    config.add_route('main', '/main')
    # Directs the route to the function that can generate the view
    config.add_view(get_main_page, route_name='main')

    # Adding route to display data 
    config.add_route('data', '/data')
    #Binds the function get_data to the data route and returns JSON
    #Note: This is a REST route because we are returning a RESOURCE!
    config.add_view(get_data, route_name='data', renderer='json')

    # Adding route to display data 
    config.add_route('child', '/child')
    #Binds the function get_data to the data route and returns JSON
    #Note: This is a REST route because we are returning a RESOURCE!
    config.add_view(get_child_names, route_name='child', renderer='json')

    # Adding route to display data 
    config.add_route('chore', '/chore')
    #Binds the function get_data to the data route and returns JSON
    #Note: This is a REST route because we are returning a RESOURCE!
    config.add_view(get_chore_names, route_name='chore', renderer='json')

    # Adding route to display data 
    config.add_route('assign', '/assign/{assign_id}')
    #Binds the function get_data to the data route and returns JSON
    #Note: This is a REST route because we are returning a RESOURCE!
    config.add_view(assign_chore, route_name='assign', renderer='json')

    # Adding route to display data 
    config.add_route('unassign', '/unassign/{unassign_id}')
    #Binds the function get_data to the data route and returns JSON
    #Note: This is a REST route because we are returning a RESOURCE!
    config.add_view(unassign_chore, route_name='unassign', renderer='json')

    # Adding route to display data 
    config.add_route('create', '/create/{child_id}')
    #Binds the function get_data to the data route and returns JSON
    #Note: This is a REST route because we are returning a RESOURCE!
    config.add_view(create_child, route_name='create', renderer='json')

    config.add_route('get_vals', '/chores/{chore_data}')
    config.add_view(get_vals, route_name='get_vals', renderer='json')
    

    config.add_static_view(name='/', path='./public', cache_max_age=3600)
    app = config.make_wsgi_app()

  server = make_server('0.0.0.0', 6000, app)
  server.serve_forever()
