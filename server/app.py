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
            return(401, "Unauthorized")

api.add_resource(Auth, '/auth')

if __name__ == "__main__":
  app.run(port=5555, debug=True)
