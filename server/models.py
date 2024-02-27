from config import db, bcrypt
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True)
    email = db.Column(db.String)
    age = db.Column(db.Integer)
    _password_hash = db.Column(db.String)
    
    @hybrid_property
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))

    serialize_rules = ('-experiences.user', )

    experiences = db.relationship('Experience', back_populates='user')

    locations = association_proxy('experiences', 'location', creator=lambda location_obj: Experience(location=location_obj))

class Location(db.Model, SerializerMixin):
    __tablename__ = "locations"

    id = db.Column(db.Integer, primary_key=True)
    city = db.Column(db.String, nullable=False)
    state = db.Column(db.String, nullable=False)

    serialize_rules = ('-experiences.location', )

    experiences = db.relationship('Experience', back_populates='location')

    @validates('city', 'state')
    def validate_value(self, key, value):
        if value == '':
            raise ValueError(f'{value} cannot be blank')
        else:
            return value.upper()

class Experience(db.Model, SerializerMixin):
    __tablename__ = "experiences"
    
    id = db.Column(db.Integer, primary_key=True)
    length = db.Column(db.String)
    rating_id = db.Column(db.Integer, db.ForeignKey('ratings.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    location_id = db.Column(db.Integer, db.ForeignKey('locations.id'))

    serialize_rules = ('-user.experiences', '-location.experiences', '-rating.experiences')

    location = db.relationship('Location', back_populates='experiences')
    user = db.relationship('User', back_populates='experiences')
    rating = db.relationship('Rating', back_populates='experiences')
    
        
class Rating(db.Model, SerializerMixin):
    __tablename__ = "ratings"

    id = db.Column(db.Integer, primary_key=True)
    community = db.Column(db.Integer)
    crowds = db.Column(db.Integer)
    safety = db.Column(db.Integer)
    
    @validates('community', 'crowds', 'safety')
    def validate_value(self, key, value):
        if int(value) > 5:
            raise ValueError('Rate on a scale of 1-5')
        else:
            return value
        
    serialize_rules = ('-experiences.rating', )
        
    experiences = db.relationship('Experience', back_populates='rating')