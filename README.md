## Getting Started

Follow these instructions to set up and run the backend server locally.

### Prerequisites

 *Ensure you have the following installed:*
- Node.js and npm.
- MongoDB for database management.
- Your Firebase configuration for authentication (if applicable).

### Installation

1. **Clone the repository or download the ZIP file:**:
   - **Clone**:
     ```bash
     https://github.com/rijviislam/stock-x-server.git
     ```
   - **Download ZIP**:
     - Click on the green "Code" button at the top right of this repository.
     - Select "Download ZIP".
     - Extract the downloaded ZIP file.

2. **Navigate to the project directory**:
   ```bash
   cd your-repository
3. **Install the necessary dependencies:**
     ```bash
     npm install
4. **Set up MongoDB and Firebase configurations:**
- Ensure your MongoDB connection URI is ready.
- Create a .env file at the root of the project and add the following environment variables

  ```bash 
  # .env file
   PORT=5000 
   MONGO_URI=your_mongo_uri
    FIREBASE_API_KEY=your_firebase_api_key
    FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
  

*If Firebase is used for authentication, ensure the Firebase service account credentials are properly set up.*

5. **Start the server:**
 - To run the backend server in development mode, run
     ```bash
     npm run dev
- The server will start on http://localhost:5000 by default.
6. **API Documentation**:
- Base URL: The API endpoints are prefixed with /api. For example:
- GET /api/products: Retrieves the list of products.
- POST /api/users: Creates a new user.
- You can use tools like Postman or cURL to test API endpoints.

7. **MongoDB Configuration:**
*If you're using Firebase for user authentication:*

- Set up Firebase in the Firebase console.
- Ensure you have added the appropriate Firebase credentials to the .env file.
- Make sure to enable necessary Firebase services such as authentication, Firestore, etc.

8. **Running Tests**
```
npm test
```
9. **Deployment**
- For deployment, ensure that all environment variables are properly set and that the server is running in production mode:
```
npm start
