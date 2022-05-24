from wsgiref.simple_server import make_server
from pyramid.config import Configurator
from pyramid.response import Response, FileResponse

import mysql.connector as mysql
from dotenv import load_dotenv
import os
 
load_dotenv('credentials.env')
 
''' Environment Variables '''
db_host = os.environ['MYSQL_HOST']
db_user = os.environ['MYSQL_USER']
db_pass = os.environ['MYSQL_PASSWORD']
db_name = os.environ['MYSQL_DATABASE']

def get_vals(req):
  data = req.matchdict['chore_data']
  datasp = data.split('-')
  distance = datasp[0]
  sheet = datasp[1]
  print(distance)
  print(sheet)
  return True

def get_home(req):
  return FileResponse("ECE140B_Test_Server/index.html")

 
if __name__ == '__main__':
  with Configurator() as config:
    config.add_route('get_vals','/chores/{chore_data}')
    config.add_view(get_vals, route_name='get_vals', renderer='json')
    
    config.add_route('home', '/')
    config.add_view(get_home, route_name='home')
    
    config.add_static_view(name='/', path='./public', cache_max_age=3600)
    app = config.make_wsgi_app()
    
 
server = make_server('0.0.0.0', 6543, app)
print('Web server started on: http://0.0.0.0:6543')
server.serve_forever()