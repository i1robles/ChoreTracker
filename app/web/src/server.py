from wsgiref.simple_server import make_server
from pyramid.config import Configurator
from pyramid.response import FileResponse

import mysql.connector as mysql
import os

db_user = os.environ['MYSQL_USER']
db_pass = os.environ['MYSQL_PASSWORD']
db_name = os.environ['MYSQL_DATABASE']
db_host = os.environ['MYSQL_HOST']

def get_home(req):
  return FileResponse("templates/home.html")

def get_kvp(req):
  return FileResponse("templates/kvp.html")

def get_team(req):
  return FileResponse("templates/team.html")

def get_product_page(req):
  return FileResponse("templates/product.html")

''' Route Configurations '''
if __name__ == '__main__':
  with Configurator() as config:
    # Add the landing page for the website
    config.add_route('home', '/')
    # Directs the route to the function that can generate the view
    config.add_view(get_home, route_name='home')

    # Adds key value proposition route in the website
    config.add_route('kvp', '/kvp')
    # Directs the route to the function that can generate the view
    config.add_view(get_kvp, route_name='kvp')

    # Adds key value proposition route in the website
    config.add_route('team', '/team')
    # Directs the route to the function that can generate the view
    config.add_view(get_team, route_name='team')

    # Adds key value proposition route in the website
    config.add_route('product', '/product')
    # Directs the route to the function that can generate the view
    config.add_view(get_product_page, route_name='product')

    config.add_static_view(name='/', path='./public', cache_max_age=3600)
    app = config.make_wsgi_app()

  server = make_server('0.0.0.0', 6000, app)
  server.serve_forever()