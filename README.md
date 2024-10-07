# **RealEstate Web Application**

## Project Overview
This is a full-stack real-estate platform built with the **MERN Stack** (MongoDB, Express.js, React.js, Node.js). The application allows users to buy, rent, and sell properties. It features an interactive map for visualizing properties using **React-Leaflet** and includes a real-time messaging feature with **Socket.io** for seamless communication between users.

---

## **Table of Contents**
1. [Features](#features)
2. [Project Link](#project-link)
3. [Tech Stack](#tech-stack)
4. [Installation](#installation)
5. [Usage](#usage)
---

## **Features**
- **Property Listings:** Users can browse, filter, and search for properties to buy, rent, or sell.
- **Interactive Map:** Utilizes **React-Leaflet** to provide map-based visualizations of properties.
- **Real-Time Messaging:** Real-time chat feature using **Socket.io** allows users to connect instantly.
- **Authentication & Authorization:** Secure user authentication with **JWT**.
- **Responsive Design:** Fully responsive UI built with **Tailwind CSS** for mobile and desktop views.
- **Database Management:** Uses **Prisma** to interact with a **MongoDB** database, ensuring efficient data retrieval and management.
  
---

## **Project Link**
[Live Demo](#) (Replace with your deployed project link)

---

## **Tech Stack**
- **Frontend:** React.js, Tailwind CSS, React-Leaflet
- **Backend:** Node.js, Express.js, Socket.io
- **Database:** MongoDB with Prisma ORM
- **Other Tools:** JWT for authentication, Prisma for database queries, Socket.io for real-time messaging

---

## **Installation**

To run this project locally, follow these steps:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/Ayushrawat63/realEstate.git
    cd realEstate
    ```

2. **Install dependencies:**
    ```bash
    npm install
    cd client
    npm install
    ```

3. **Set up environment variables:**  
    Create a `.env` file in the root directory with the following variables:
    ```bash
    MONGO_URI=your-mongodb-connection-string
    JWT_SECRET=your-secret-key
    SOCKET_PORT=your-socket-port
    ```

4. **Start the backend server:**
    ```bash
    npm run dev
    ```

5. **Start the frontend:**
    ```bash
    cd client
    npm start
    ```

---

## **Usage**

1. **User Authentication:** Sign up as a user to start exploring properties and communicate with other users.
2. **Browse Properties:** Use the map or list views to browse available properties for buying, renting, or selling.
3. **Real-Time Messaging:** Chat in real-time with property owners or potential buyers/renters.
4. **Property Management:** Users can list their properties for sale or rent and manage existing listings.

---


You can copy and paste this code directly into your `README.md` file for your real estate project. Make sure to replace placeholders like `your-username` and any project-specific details such as the live demo link!


