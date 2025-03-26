# MyFlix-client

Web application built with React. Here you can Signup, Login, Watch what movies are in the catalog, mark movies as favorites and search movies by name.

Objective
● Using React, build the client-side for an app called myFlix based on its existing server-side code (REST API and database).

# Features
- **User Authentication**: Users can sign up, log in, and log out.
- **Movie Browsing**: Browse through a collection of movies fetched from the backend API.
- **Movie Details**: View detailed information about a specific movie.
- **User Profile**: View and update user profile information.
- **Favorite Movies**: Add or remove movies from a list of favorites.
- **Search Functionality**: Search for movies by title using a search bar in the navigation.

# Components


## Main view
● Returns ALL movies to the user (each movie item with an image, title, and description)
● Filtering the list of movies with a “search” feature
● Ability to select a movie for more details
● Ability to log out
● Ability to navigate to Profile view


## Single Movie view
        ● Returns data (description, genre, director, image) about a single movie to the user
        ● Allows users to add a movie to their list of favorites

## Login view
        ● Allows users to log in with a username and password

## Signup view
        ● Allows new users to register (username, password, email, date of birth)

## Profile view
        ● Displays user registration details
        ● Allows users to update their info (username, password, email, date of birth)
        ● Displays favorite movies
        ● Allows users to remove a movie from their list of favorites
        ● Allows existing users to deregister

# Technical Requirements
● The application must be a single-page application (SPA)
● The application must use state routing to navigate between views and share URLs
● The application must give users the option to filter movies using a “search” feature
● The application must use Parcel as its build tool
● The application must be written using the React library and in ES2015+
● The application must use Bootstrap as a UI library for styling and responsiveness
● The application must contain function components
● The application must be hosted online
● The application may use React Redux for state management of at least one feature (i.e.,filtering movies)


# Host 

You can check the Project on  https://6744682b5bbf05419eba2f2c--gianflix.netlify.app/ 

# License

This project is licensed under the MIT License.