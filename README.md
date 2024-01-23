# Your Next Move
## Purpose
Users can create their own profiles & review their experiences living in a particular city/state, as well as view all other experience reviews from other users.

## Installation
1. Run `pipenv install && pipenv shell` in project directory to download & utilize Python/Flask dependencies.
2. Run `npm install --prefix client` to install React dependencies.
3. Run `python server/seed.py` to populate example reviews from other users.
4. Finally, run `honcho start -f Procfile.dev` to run front & backend servers; visit http://localhost:4000 to view the website.

## Code walkthrough
1. React code exists in `client` folder.
- BrowserRouter is used in App.jsx to provide client-side routing.



## Usage
- All users are initially brought to the authorization page which will prompt user login or provide an option to create an account.
- Once signed up/logged in, a user is brought to their homepage which offers a preview of their experience reviews and an option to add a new experience.
- After an experience has been created, its user has the option to edit or modify the experience or to delete it from the profile.
- Via the navigation bar, a logged in user can choose to view all other users' experiences, in a preview list, or in more detail with the 'more' button.
- A logged in user also always has the option to Logout in the navigation bar.