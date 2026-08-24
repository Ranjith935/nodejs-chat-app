# Node.js Real-Time Chat App

A simple real-time chat application built with **Node.js, Express and Socket.IO**.

## Features

- Join with a username
- Real-time messaging
- Online user count
- Join/leave notifications
- Responsive browser UI
- Health-check endpoint

## Tech Stack

- Node.js
- Express.js
- Socket.IO
- HTML
- CSS
- JavaScript

## Run locally

### 1. Clone the repository

```bash
git clone https://github.com/Ranjith935/nodejs-chat-app.git
cd nodejs-chat-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the server

```bash
npm start
```

For development:

```bash
npm run dev
```

### 4. Open the app

Open http://localhost:3000 in your browser.

Open the URL in two browser tabs/windows to test real-time messaging between users.

## API

### Health check

`GET /health`

Returns:

```json
{
  "status": "ok"
}
```

## Project structure

```text
nodejs-chat-app/
├── public/
│   ├── index.html
│   ├── app.js
│   └── style.css
├── .gitignore
├── package.json
├── README.md
└── server.js
```
