# Node.js REST API for User Authentication and Business Card Management

This project provides a REST API for user authentication and business card management using Node.js, Express, MongoDB, JWT, and bcrypt.

## Setup

1. Clone the repository:
    ```sh
    git clone https://github.com/your-repo.git
    cd your-repo
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root of your project and add the following variables:
    ```
    PORT=5000
    MONGO_URI=your_mongo_db_connection_string
    JWT_SECRET=your_jwt_secret
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    GOOGLE_REDIRECT_URI=your_google_redirect_uri
    ```

4. Start the server:
    ```sh
    npm run dev
    ```

## API Endpoints

### User Authentication

- **Register User**
  - **POST** `/api/users/register`
  - **Request Body**:
    ```json
    {
      "name": "John Doe",
      "email": "john.doe@example.com",
      "password": "password123",
      "isBusiness": false,
      "isAdmin": false
    }
    ```

- **Login User**
  - **POST** `/api/users/login`
  - **Request Body**:
    ```json
    {
      "email": "john.doe@example.com",
      "password": "password123"
    }
    ```

### Business Card Management

- **Create Card**
  - **POST** `/api/cards`
  - **Headers**: `x-auth-token: your_jwt_token`
  - **Request Body**:
    ```json
    {
      "title": "Software Engineer",
      "description": "Experienced Software Engineer",
      
    }
    ```



## License

This project is licensed under the MIT License.
