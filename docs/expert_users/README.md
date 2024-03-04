# Map Coloring Puzzle Solver

## Description

The Map Coloring Puzzle Solver is a web application designed to challenge users with the task of coloring a map such that no two adjacent regions have the same color. It utilizes Flask for backend logic, React for the user interface, and PostgreSQL for data storage.

## Getting Started

These instructions will help you set up a copy of the project on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following installed:
- Python 3.8 or newer
- Node.js 14.x or newer
- PostgreSQL 12.x or newer
- Git

### Installation

Follow these steps to get your development environment running:

#### Backend Setup

1. **Clone the repository**
    ```bash
    git clone https://github.com/<your-username>/map-coloring-puzzle-solver.git
    cd map-coloring-puzzle-solver
    ```

2. **Set up the Python virtual environment**
    ```bash
    cd backend
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. **Install Python dependencies**
    ```bash
    pip install -r requirements.txt
    ```

4. **Configure the database**

    Make sure PostgreSQL is installed and running. Create a database and update the Flask application's configuration to use your database URL.

5. **Initialize the database**
    ```bash
    flask db upgrade
    ```

6. **Run the Flask application**
    ```bash
    flask run
    ```

    The Flask server should now be running on `http://localhost:5000`.

#### Frontend Setup

1. **Navigate to the frontend directory and install dependencies**
    ```bash
    cd ../frontend
    npm install
    ```

2. **Start the React application**
    ```bash
    npm start
    ```

    The React app should now be running on `http://localhost:3000`.

### Environment Variables

- For the backend, create a `.env` file in the `backend` directory to store environment variables such as `DATABASE_URL`.
- For the frontend, if you need to communicate with the backend, set the backend API URL in a `.env` file in the `frontend` directory.

### Deployment

#### Deploying the Flask App to Heroku

1. **Log in to Heroku and create an app**
    ```bash
    heroku login
    heroku create <app-name>
    ```

2. **Add a PostgreSQL addon to your Heroku app**
    ```bash
    heroku addons:create heroku-postgresql:hobby-dev --app <app-name>
    ```

3. **Deploy your application to Heroku**
    ```bash
    git add .
    git commit -m "Ready for deployment"
    git push heroku main
    ```

4. **Run migrations on Heroku**
    ```bash
    heroku run flask db upgrade --app <app-name>
    ```

#### Deploying the React App

You can deploy the frontend to services like Netlify or Vercel by connecting your GitHub repository and following their deployment instructions.

## Contributing

Please read [CONTRIBUTING.md](https://github.com/<your-username>/map-coloring-puzzle-solver/CONTRIBUTING.md) for the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/<your-username>/map-coloring-puzzle-solver/LICENSE.md) file for details.
