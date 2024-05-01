# API Documentation

## Authentication Endpoints

### Register a new user

- **POST** `/api/auth/register`
  - **Sample Input:**
    ```json
    {
        "email": "example@example.com",
        "username": "example_user",
        "password": "example_password",
        "phoneNumber": "1234567890"
    }
    ```
  - **Sample Response:**
    ```json
    {
        "message": "User registered successfully"
    }
    ```

### User login

- **POST** `/api/auth/login`
  - **Sample Input:**
    ```json
    {
        "email": "example@example.com",
        "password": "example_password"
    }
    ```
  - **Sample Response:**
    ```json
    {
        "token": "JWT_token"
    }
    ```

## User Endpoints

### Get improvement analysis based on previous games

- **GET** `/api/user/improvement`
  - **Headers:** Authorization: Bearer JWT_token
  - **Sample Response:**
    ```json
    {
        "improvement": "10.50%"
    }
    ```

### Update user profile name

- **PUT** `/api/user/update-name`
  - **Headers:** Authorization: Bearer JWT_token
  - **Sample Input:**
    ```json
    {
        "name": "New Name"
    }
    ```
  - **Sample Response:**
    ```json
    {
        "_id": "user_id",
        "email": "example@example.com",
        "username": "example_user",
        "phoneNumber": "1234567890",
        "gameProgress": {
            "tracePathCompleted": false,
            "memoryMatchCompleted": false,
            "soundMatchingCompleted": false
        },
        "gameScores": {
            "tracePath": [],
            "memoryMatch": [],
            "soundMatching": []
        },
        "createdAt": "timestamp",
        "updatedAt": "timestamp"
    }
    ```

### Update user profile username

- **PUT** `/api/user/update-username`
  - **Headers:** Authorization: Bearer JWT_token
  - **Sample Input:**
    ```json
    {
        "username": "New_Username"
    }
    ```
  - **Sample Response:**
    ```json
    {
        "_id": "user_id",
        "email": "example@example.com",
        "username": "New_Username",
        "phoneNumber": "1234567890",
        "gameProgress": {
            "tracePathCompleted": false,
            "memoryMatchCompleted": false,
            "soundMatchingCompleted": false
        },
        "gameScores": {
            "tracePath": [],
            "memoryMatch": [],
            "soundMatching": []
        },
        "createdAt": "timestamp",
        "updatedAt": "timestamp"
    }
    ```

### Update user profile email

- **PUT** `/api/user/update-email`
  - **Headers:** Authorization: Bearer JWT_token
  - **Sample Input:**
    ```json
    {
        "email": "new_email@example.com"
    }
    ```
  - **Sample Response:**
    ```json
    {
        "_id": "user_id",
        "email": "new_email@example.com",
        "username": "example_user",
        "phoneNumber": "1234567890",
        "gameProgress": {
            "tracePathCompleted": false,
            "memoryMatchCompleted": false,
            "soundMatchingCompleted": false
        },
        "gameScores": {
            "tracePath": [],
            "memoryMatch": [],
            "soundMatching": []
        },
        "createdAt": "timestamp",
        "updatedAt": "timestamp"
    }
    ```

### Update user profile password

- **PUT** `/api/user/update-password`
  - **Headers:** Authorization: Bearer JWT_token
  - **Sample Input:**
    ```json
    {
        "password": "new_password"
    }
    ```
  - **Sample Response:**
    ```json
    {
        "_id": "user_id",
        "email": "example@example.com",
        "username": "example_user",
        "phoneNumber": "1234567890",
        "gameProgress": {
            "tracePathCompleted": false,
            "memoryMatchCompleted": false,
            "soundMatchingCompleted": false
        },
        "gameScores": {
            "tracePath": [],
            "memoryMatch": [],
            "soundMatching": []
        },
        "createdAt": "timestamp",
        "updatedAt": "timestamp"
    }
    ```

## Game Endpoints

### Save Trace the Path game data

- **POST** `/api/games/trace-path`
  - **Headers:** Authorization: Bearer JWT_token
  - **Sample Input:**
    ```json
    {
        "score": 100,
        "progress": 50,
        "param1": "value1",
        "param2": "value2",
        "param3": "value3",
        "param4": "value4",
        "param5": "value5"
    }
    ```
  - **Sample Response:**
    ```json
    {
        "message": "Trace the Path game data saved successfully",
        "improvement": "10.50%"
    }
    ```

### Save Memory Match game data

- **POST** `/api/games/memory-match`
  - **Headers:** Authorization: Bearer JWT_token
  - **Sample Input:**
    ```json
    {
        "score": 80,
        "timeTaken": 120,
        "trials": 5,
        "correctGuesses": 4,
        "wrongGuesses": 1
    }
    ```
  - **Sample Response:**
    ```json
    {
        "message": "Memory Match game data saved successfully",
        "improvement": "10.50%"
    }
    ```

### Save Sound Matching game data

- **POST** `/api/games/sound-matching`
  - **Headers:** Authorization: Bearer JWT_token
  - **Sample Input:**
    ```json
    {
        "score": 70,
        "param1": "value1",
        "param2": "value2",
        "param3": "value3"
    }
    ```
  - **Sample Response:**
    ```json
    {
        "message": "Sound Matching game data saved successfully",
        "improvement": "10.50%"
    }
    ```

### Get details of specific game for a specific user

- **GET** `/api/games/:gameName/user/:userId`
  - **Headers:** Authorization: Bearer JWT_token
  - **Sample Response:**
    ```json
    {
        "userId": "user_id",
        "gameName": "game_name",
        "score": 100,
        "progress": 50,
        "timeTaken": 120,
        "trials": 5,
        "correctGuesses": 4,
        "wrongGuesses": 1,
        "param1": "value1",
        "param2": "value2",
        "param3": "value3",
        "param4": "value4",
        "param5": "value5",
        "createdAt": "timestamp",
        "updatedAt": "timestamp"
    }
    ```

### Get details of all games played by a specific user

- **GET** `/api/games/user/:userId`
  - **Headers:** Authorization: Bearer JWT_token
  - **Sample Response:**
    ```json
    [
        {
            "userId": "user_id",
            "gameName": "game_name",
            "score": 100,
            "progress": 50,
            "timeTaken": 120,
            "trials": 5,
            "correctGuesses": 4,
            "wrongGuesses": 1,
            "param1": "value1",
            "param2": "value2",
            "param3": "value3",
            "param4": "value4",
            "param5": "value5",
            "createdAt": "timestamp",
            "updatedAt": "timestamp"
        },
        {
            "userId": "user_id",
            "gameName": "game_name",
            "score": 80,
            "timeTaken": 120,
            "trials": 5,
            "correctGuesses": 4,
            "wrongGuesses": 1,
            "param1": "value1",
            "param2": "value2",
            "param3": "value3",
            "param4": "value4",
            "param5": "value5",
            "createdAt": "timestamp",
            "updatedAt": "timestamp"
        }
    ]
    ```

### Get details of scores and games played by all users

- **GET** `/api/games/games`
  - **Headers:** Authorization: Bearer JWT_token
  - **Sample Response:**
    ```json
    [
        {
            "userId": "user_id",
            "gameName": "game_name",
            "score": 100,
            "progress": 50,
            "timeTaken": 120,
            "trials": 5,
            "correctGuesses": 4,
            "wrongGuesses": 1,
            "param1": "value1",
            "param2": "value2",
            "param3": "value3",
            "param4": "value4",
            "param5": "value5",
            "createdAt": "timestamp",
            "updatedAt": "timestamp"
        },
        {
            "userId": "user_id",
            "gameName": "game_name",
            "score": 80,
            "timeTaken": 120,
            "trials": 5,
            "correctGuesses": 4,
            "wrongGuesses": 1,
            "param1": "value1",
            "param2": "value2",
            "param3": "value3",
            "param4": "value4",
            "param5": "value5",
            "createdAt": "timestamp",
            "updatedAt": "timestamp"
        }
    ]
    ```

### Get details of scores and games played by a specific user across all games

- **GET** `/api/games/users/:userId/games`
  - **Headers:** Authorization: Bearer JWT_token
  - **Sample Response:**
    ```json
    [
        {
            "userId": "user_id",
            "gameName": "game_name",
            "score": 100,
            "progress": 50,
            "timeTaken": 120,
            "trials": 5,
            "correctGuesses": 4,
            "wrongGuesses": 1,
            "param1": "value1",
            "param2": "value2",
            "param3": "value3",
            "param4": "value4",
            "param5": "value5",
            "createdAt": "timestamp",
            "updatedAt": "timestamp"
        },
        {
            "userId": "user_id",
            "gameName": "game_name",
            "score": 80,
            "timeTaken": 120,
            "trials": 5,
            "correctGuesses": 4,
            "wrongGuesses": 1,
            "param1": "value1",
            "param2": "value2",
            "param3": "value3",
            "param4": "value4",
            "param5": "value5",
            "createdAt": "timestamp",
            "updatedAt": "timestamp"
        }
    ]
    ```

### Get improved score for the last game played

- **GET** `/api/games/:gameName/improved-score/last-game`
  - **Headers:** Authorization: Bearer JWT_token
  - **Sample Response:**
    ```json
    {
        "lastGame": 100
    }
    ```

### Get improved score for the last 5 games played

- **GET** `/api/games/:gameName/improved-score/last-5-games`
  - **Headers:** Authorization: Bearer JWT_token
  - **Sample Response:**
    ```json
    {
        "last5Games": [100, 80, 90, 95, 85]
    }
    ```

### Get improved score for the last 10 games played

- **GET** `/api/games/:gameName/improved-score/last-10-games`
  - **Headers:** Authorization: Bearer JWT_token
  - **Sample Response:**
    ```json
    {
        "last10Games": [100, 80, 90, 95, 85, 75, 70, 85, 90, 95]
    }
    ```
