# Chat Application

A real-time chat application built with React, WebSocket, and Strapi. Users can connect to a chat server and exchange messages seamlessly.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- Real-time messaging using WebSocket.
- User authentication with JWT.
- Simple and responsive UI.
- View chat history and send messages.
- Logout functionality.

## Technologies Used

- **Frontend**: React, Tailwind CSS
- **Backend**: Strapi, WebSocket
- **Database**: MongoDB/PostgreSQL (depending on your implementation)

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/chat-application.git
   ```

2. Navigate to the project directory:

   ```bash
   cd chat-application
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm start
   ```

5. Ensure your backend server (Strapi) is running and WebSocket connection is established.

## Usage

1. Open your browser and navigate to `http://localhost:3000` (or the appropriate port).
2. You will see the chat application interface.
3. Enter your message in the input field and press "Send" or hit Enter to send messages.
4. Click the "Logout" button to clear your session and redirect to the login page.

## API Endpoints

### WebSocket Connection

- **Endpoint**: `ws://localhost:1337/ws`
- **Actions**:
  - **Connect**: 
    - Message format: 
      ```json
      { "action": "connect", "userId": "yourUserId" }
      ```
  - **Send Message**: 
    - Message format: 
      ```json
      { "action": "message", "content": "yourMessage" }
      ```


