from config import app, db, api
from flask import request
from models import User, Location, Experience

if __name__ == "__main__":
  app.run(port=5555, debug=True)
