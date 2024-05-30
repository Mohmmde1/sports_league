
# Sport League

This Django web application facilitates the management and display of a sports league's ranking table based on uploaded game results. It allows users, such as league administrators or managers, to upload CSV files containing game data, which is then processed to calculate team points and generate a ranking table. Users can also perform CRUD operations on game results, enabling them to add, edit, and delete games as needed. Additionally, the application offers unit tests for ensuring the reliability of its functionality. It is designed to be user-friendly, efficient, and extensible, catering to the needs of sports league organizers seeking a streamlined solution for managing league standings and game data.



## Features

- Light/dark mode toggle
- Swagger API documentation at [http://localhost:8000/swagger/](http://localhost:8000/swagger/)
- User authentication (login and registration)
- Game results management (add, edit, delete)
- CSV upload for game results
- Dynamic ranking table generation

## Installation

Clone the project

```bash
  git clone https://github.com/Mohmmde1/sports_league.git
```

## Run Locally


Go to the project directory

Navigate to the project directory

```bash
cd path/to/sports_league
```

Go to the sports_league directory

```bash
  cd sports_league
```


Install pipenv

```bash
  pip install pipenv
```

Create new environment 

```bash
  pipenv shell
```

Install dependencies

```bash
  pipenv install
```

Start the server

```bash
  python manage.py runserver 0.0.0.0:8000
```

**Create a new terminal session**

Navigate to the project directory

```bash
cd path/to/sports_league
```


Go to the frontend directory

```bash
  cd frontend
```

Change name of .env file

```bash
  mv .env.template .env
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## Run With Docker 


Verify that docker is installed

```bash
  docker --version
```

Go to the project directory

```bash
  cd sports_league
```

Go to the sports_league directory

```bash
  cd sports_league
```

Change name of .env file

```bash
  mv .env.docker.template .env
```

Go to frontend directory

```bash
  cd ../frontend
```

Change name of .env file

```bash
  mv .env.docker.template .env
```

Start the docker config

```bash
  docker compose up
```


## Running Tests

To run tests for this project, follow these steps:

**Navigate to the project directory:**

```bash
cd path/to/sports_league
```

**Navigate to the backend**:
```bash
cd sports_league
```

**Activate the virtual environment** (if not already activated):
```bash
pipenv shell
```

**Run the tests**:
```bash
python manage.py test
```

  This command will execute all the tests within the Django project.


## Documentation

- [Draw.io](https://drive.google.com/file/d/1ztP22dwLUxEHHhtQjPXImcoCd8GXGgZU/view?usp=sharing)

Explore and test the API endpoints using Swagger documentation. Navigate to [http://localhost:8000/swagger/](http://localhost:8000/swagger/) to access the Swagger UI. Users can log in or register through the `/auth/login` or registration endpoints respectively. After authentication, obtain the access key and insert it in the appropriate header field in Swagger for authorized access to the API.

## Usage/Examples

Use file example from sample-data folder and upload it
## Acknowledgements

This project was made possible thanks to the following resources:

- [Shadcn UI](https://github.com/shadcn/shadcn-ui)
- [v0.dev](https://github.com/v0dev/v0.dev)
- [Dj-rest-auth](https://github.com/jazzband/dj-rest-auth)

These resources and projects have provided inspiration, guidance, and tools that have greatly contributed to the development of this project.
## Tech Stack

**Client:** React, Next.js, TailwindCSS, Shadcn UI

**Server:** Django REST Framework

**Database:** PostgreSQL, SQLite

**Containerization:** Docker

This project leverages the following technologies:

- **Client-side**: Utilizing React for interactive user interfaces, Next.js for server-side rendering, and TailwindCSS for efficient styling, along with Shadcn UI components for enhanced UI elements.

- **Server-side**: Employing Django REST Framework to build robust and scalable APIs for server logic and data management.

- **Database**: Utilizing PostgreSQL for production environments and SQLite for development purposes, ensuring efficient data storage and retrieval.

- **Containerization**: Docker is used for containerizing the application, providing consistent and reproducible environments across different platforms and simplifying deployment processes.
