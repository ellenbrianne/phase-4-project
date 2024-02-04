from config import app, db
from models import User, Location, Experience, Rating

if __name__ == "__main__":

	with app.app_context():

		User.query.delete()
		Location.query.delete()
		Experience.query.delete()
		Rating.query.delete()

		u1 = User(username="jo shaw", email="jo@bellsouth.net", age="22")
		u2 = User(username="shane doe", email="shane@yahoo.com", age="34")
		db.session.add_all([u1, u2])
		db.session.commit()

		l1 = Location(city="Wilmington", state="NC")
		l2 = Location(city="Denver", state="CO")
		db.session.add_all([l1, l2])
		db.session.commit()

		r1 = Rating(community=4, crowds=2, safety=3)
		r2 = Rating(community=2, crowds=3, safety=1)
		db.session.add_all([r1, r2])
		db.session.commit()

		e1 = Experience(length="6 months", rating_id=r1.id, user_id=u2.id, location_id=l1.id)
		e2 = Experience(length="1 year", rating_id=r2.id, user_id=u1.id, location_id=l2.id)
		db.session.add_all([e1, e2])
		db.session.commit()