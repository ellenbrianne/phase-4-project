from config import app, db, api
from flask_restful import Resource
from flask import request, make_response, session
from models import User, Location, Experience

class Auth(Resource):
    def get(self):
        try:
            user = User.query.filter_by(id=session['user_id']).first()
            return make_response(user.to_dict(), 200)
        except:
            return('Unauthorized', 401)

api.add_resource(Auth, '/auth')

class Signup(Resource):
    def post(self):
        try:
            data = request.get_json()
            user = User(username=data['username'], email=data['email'], age=data['age'])
            user.password_hash = data['password']

            db.session.add(user)
            db.session.commit()

            session['user_id'] = user.id

            return make_response(user.to_dict(), 201)
        except:
            return ('Error in signing up', 422)
        
api.add_resource(Signup, '/signup')

class Login(Resource):
    def post(self):
        try:
            user = User.query.filter_by(username=request.get_json()['username']).first()
            if user.authenticate(request.get_json()['password']):
                session['user_id'] = user.id
                return make_response(user.to_dict(), 200)
        except:
            return ("Incorrect Username or Password", 401)

api.add_resource(Login, '/login')

class Logout(Resource):
    def delete(self):
        try:
            if session.get('user_id'):
                session['user_id'] = None
                return ('', 204)
        except:
            return ('No user currently logged in', 401)

api.add_resource(Logout, '/logout')

if __name__ == "__main__":
  app.run(port=5555, debug=True)
