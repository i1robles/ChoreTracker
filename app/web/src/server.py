from wsgiref.simple_server import make_server
from pyramid.config import Configurator
from pyramid.response import FileResponse

def get_home(req):
  return FileResponse("pages/index.html")

def get_kvp(req):
  return FileResponse("pages/kvp.html")

def get_team(req):
  return FileResponse("pages/team.html")

def get_product_page(req):
  return FileResponse("pages/product.html")

def get_login_page(req):
  return FileResponse("pages/login.html")
  
def get_signup_page(req):
  return FileResponse("pages/signUp.html")
  
def get_main_page(req):
  return FileResponse("pages/main.html")

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
