from config import app, db, api
from flask_restful import Resource
from flask import request, make_response, session, render_template
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

class Experiences(Resource):

    def get(self):
        try:
            exp_list = [e.to_dict() for e in Experience.query.all()]
            return make_response(exp_list, 200)
        except:
            return ('There are currently no experiences to show', 204)
        
    def post(self):
        data = request.get_json()

        try:
            new_l = Location(city=data['city'], state=data['state'])
            db.session.add(new_l)
            db.session.commit()

            new_e = Experience(
                        length=data['length'], community=data['community'], crowds=data['crowds'],
                        safety=data['safety'], user_id=data['user_id'], location_id=new_l.id)
        except:
            return ('Error creating new experience', 422)
        
        db.session.add(new_e)
        db.session.commit()

        return make_response(new_e.to_dict(), 201)
        
api.add_resource(Experiences, '/experiences')

class ExperienceID(Resource):

    def get(self, id):
        try:
            e = Experience.query.filter_by(id=id).first()
            return make_response(e.to_dict(), 200)
        except:
            return ('Error retrieving this experience', 404)
        
    def delete(self, id):
        try:
            e = Experience.query.filter_by(id=id).first()
            db.session.delete(e)
            db.session.commit()
            return make_response('', 204)
        except:
            return ('Experience not found', 404)
        
    def patch(self, id):
        try:
            exp = Experience.query.filter_by(id=id).first()
    
            for attr in request.get_json():
                setattr(exp, attr, request.get_json()[attr])

            exp.community = int(request.get_json()['community'])
            exp.crowds = int(request.get_json()['crowds'])
            exp.safety = int(request.get_json()['safety'])

            db.session.add(exp)
            db.session.commit()

            return make_response(exp.to_dict(), 200)
        except:
            return ('Invalid form input', 422)
        
api.add_resource(ExperienceID, '/experiences/<int:id>')

# save for deployment
# @app.route('/')
# @app.route('/<int:id>')
# def index(ind=0):
#     return render_template("index.html")

if __name__ == "__main__":
  app.run(port=5555, debug=True)
