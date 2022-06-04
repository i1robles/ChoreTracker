from wsgiref.simple_server import make_server
from pyramid.config import Configurator
from pyramid.response import FileResponse
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
  # Connect to the database and retrieve the users
  # db = mysql.connect(host=db_host, database=db_name, user=db_user, passwd=db_pass)
  # cursor = db.cursor()
  # cursor.execute("select child_name, child_points from username_users;")
  # names = cursor.fetchall()
  # db.close()
  # return render_to_response('pages/main.html', {'names': names}, request=req)
  return FileResponse("pages/main.html")

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

    config.add_static_view(name='/', path='./public', cache_max_age=3600)
    app = config.make_wsgi_app()

  server = make_server('0.0.0.0', 6000, app)
  server.serve_forever()
