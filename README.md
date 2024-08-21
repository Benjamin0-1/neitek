# Neitek Full Stack Web App

## Overview

Neitek is a full-stack web application that allows users to manage sales and commissions, and view detailed records. The application is protected by JWT authentication, supports user registration, and provides features for managing and viewing sales and commission data.

<img width="1424" alt="neitek-home" src="https://github.com/user-attachments/assets/b84d31f0-80d0-40fe-a3bc-066bc9a38a4b">
<img width="1426" alt="neitek-comission" src="https://github.com/user-attachments/assets/8de0f4d1-8219-4fc6-b6b1-ac89be99982b">
<img width="1423" alt="neitek-create-sale" src="https://github.com/user-attachments/assets/434bba77-46bd-4157-9ea3-06f1b58eb111">


## Features

### Frontend

1. **User Authentication and Authorization**
   - **Login and Signup:** Users can create accounts and log in using JWT-based authentication.
   - **Password Recovery:** Users can request password resets via OTP.

2. **Navigation**
   - **Sidebar Navigation:** A responsive sidebar provides navigation links to Home, Profile, Settings, and FAQ sections.

3. **Sales and Commissions Management**
   - **Create Sales Records:** Users can input and create new sales records.
   - **View Sales Records:** Users can view and filter sales records by different criteria.
   - **View Commissions:** Admins can view detailed commission records in a tabular format, including base commission, service bonus, equipment bonus, and total commission.

4. **Notifications**
   - **Toast Notifications:** Uses `react-toastify` to provide user feedback on actions (e.g., successful operations, errors).

5. **Responsive Layout**
   - **Mobile and Desktop Views:** Adapts the layout for different screen sizes to enhance user experience.

### Backend

1. **API Endpoints**
   - **Authentication:**
     - `POST /api/auth/login`: Authenticates users and issues JWTs.
     - `POST /api/auth/signup`: Registers new users.
   - **Sales Management:**
     - `POST /api/sales/create-sale`: Creates new sales records.
     - `GET /api/sales/all-sales`: Retrieves all sales records.
   - **Commission Management:**
     - `GET /api/comission/all-comissions`: Retrieves all commission records.
   - **User Management:**
     - `GET /api/users/profile`: Retrieves user information.

2. **Database Models**
   - **User:** Manages user data including authentication details and profile information.
   - **Sales:** Tracks sales records with fields for month, service sales, equipment sales, and total sales.
   - **Comission:** Handles commission data including base commission, service bonus, equipment bonus, and total commission.

3. **Sequelize ORM**
   - **Model Definitions:** Defines models for Users, Sales, and Comissions.
   - **Associations:** 
     - `User` has many `Sales`.
     - `Sales` has many `Comissions`.

4. **Security**
   - **JWT Authentication:** Secures endpoints using JWTs for authentication and authorization.
   - **Password Hashing:** Stores passwords securely using bcrypt.

5. **Error Handling**
   - **Validation Errors:** Validates input data and returns appropriate error messages.
   - **Server Errors:** Catches and reports server-side errors.

## Installation

### Frontend

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/neitek-fullstack-app.git
   cd neitek-fullstack-app/frontend

2. ```bash
    npm install
    npm start
When you first run the project, 2 default users will be created along with Sales and Comission data.
These users are: email: user1@example.com password: password123 email: user2@example.com password: password123 
the start command will run both client and server at once.
All you need to do is make sure you have a local postgresql instance running, which you can then configure in .env inside of /api/src
