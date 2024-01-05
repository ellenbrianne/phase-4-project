from config import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    age = db.Column(db.Integer)
    ## add in username & password for auth

    serialize_rules = ('-experiences.user', )

    experiences = db.relationship('Experience', back_populates='user')

    locations = association_proxy('experiences', 'location', creator=lambda location_obj: Experience(location=location_obj))

class Location(db.Model, SerializerMixin):
    __tablename__ = "locations"

    id = db.Column(db.Integer, primary_key=True)
    city = db.Column(db.String)
    state = db.Column(db.String)

    serialize_rules = ('-experiences.location', )

    experiences = db.relationship('Experience', back_populates='location')


class Experience(db.Model, SerializerMixin):
    __tablename__ = "experiences"
    
    id = db.Column(db.Integer, primary_key=True)
    length = db.Column(db.String)
    community = db.Column(db.Integer)
    crowds = db.Column(db.Integer)
    safety = db.Column(db.Integer)
    ## add constraints/validations so these are <= 5
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    location_id = db.Column(db.Integer, db.ForeignKey('locations.id'))

    serialize_rules = ('-user.experiences', '-location.experiences')

    location = db.relationship('Location', back_populates='experiences')
    user = db.relationship('User', back_populates='experiences')