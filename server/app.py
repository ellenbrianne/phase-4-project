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
        data = request.get_json()
        user = User(username=data['username'], email=data['email'], age=data['age'])
        user.password_hash = data['password']

        db.session.add(user)
        db.session.commit()

        return make_response(user.to_dict(), 201)
        
api.add_resource(Signup, '/signup')

if __name__ == "__main__":
  app.run(port=5555, debug=True)
