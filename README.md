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
- `BrowserRouter` is used in `main.jsx` to provide client-side routing.
- `App.jsx` contains state for the current user and all experiences, as well as `useEffect` to load these on initial render.
    - All other components are rendered conditionally based on whether current user is `null`.
- `AuthPage.jsx` renders `LoginForm.jsx` & `SignupForm.jsx`.
- `LoginForm.jsx` & `SignupForm.jsx` both use `formik` & `yup` for inputs & display errors.
    - Use `addUser` function after successful POST request to set `user` state in `App.jsx`.
- `NavBar.jsx` provides `Link`s to Home & all Experiences, as well as contains the DELETE request for Logout functionality.
- `Home.jsx` renders filtered list of `experiences` from state based on current user.
    - Provides a `Link` to `ExpForm.jsx` to add a new experience.
- `ExpForm.jsx` uses `yup` & `formik` for user input to create a new experience via POST request.
    - Displays formik errors on submit and navigates user back to Home after successful creation.
- `ExpContainer.jsx` renders all experiences using `ExpCard.jsx`.
- `ExpCard.jsx` provides a preview with limited details for each experience, as well as a `Link` to 'more' details for each card.
- `ExpID.jsx` uses `useParams` to render details of an individual experience.
    - Based on current user, a `Link` to `EditForm.jsx` and a delete button are shown as well.
    - Delete button performs DELETE request.
    - `useEffect` is used with `params.id` to determine current user's access to modify & delete functionality.
- `EditForm.jsx` uses `formik` & `yup`, performs PATCH request to modify an existing user's experience using `useParams` and navigates back to Home.
- Styled components is used for styling each individual component.
2. Python & Flask-SQLAlchemy code exist in `server` folder.
- `instance` folder contains the sqlite3 database, `app.db`.
- `migrations` contains all of the db migrations so far.
- `config.py` contains majority of the Flask imports.
    - Flask `app`, Migrate, SQLAlchemy, CORS, Bcrypt, and Api initialization.
- `seed.py` contains my db seed data.
- `models.py` contains my 3 models which use `bcrypt` and `SerializerMixin`.
    - User model contains constraints, a `hybrid_property _password_hash`, `serialize_rules`, relationship with Experience, and `association_proxy` with locations.
    - Location model contains constraints & a validation, `serialize_rules`, and a relationship with Experience.
    - Experience model acts as a join table.
        - Contains user & location foreign keys.
        - Also has validation, relationships with Location & User, & `serialize_rules`.
- `app.py` contains all backend routes using `flask_restful`.
    - `/auth` checks if there's a current `user_id` stored in `session` object.
    - `/signup` creates a new User instance & `password_hash` & stores that `user_id` in `session` object.
    - `/login` uses `authenticate` method from User model to check password & username in db & set `session[user_id]`.
    - `/logout` removes `user_id` from `session` object if it's not already `null`.
    - `/experiences` contains a `get` & a `post` method depending on the request which either retrieve all experience instances or create a new one.
    - `/experiences/<int:id>` use a given `id` from frontend request to dynamically `get` one experience instance, `patch` an instance using `setattr`, or `delete` one instance.

## Usage
- All users are initially brought to the authorization page which will prompt user login or provide an option to create an account.
- Once signed up/logged in, a user is brought to their homepage which offers a preview of their experience reviews and an option to add a new experience.
- After an experience has been created, its user has the option to edit or modify the experience or to delete it from the profile.
- Via the navigation bar, a logged in user can choose to view all other users' experiences, in a preview list, or in more detail with the 'more' button.
- A logged in user also always has the option to Logout in the navigation bar.