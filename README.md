Personal Finance Tracker

A full-stack web application for tracking personal finances, managing transactions, and visualizing expenses using charts.

🚀 Features
Add and manage transactions
Monthly financial summary
Data visualization with charts
Secure backend API

🛠️ Tech Stack
Frontend:
React.js
Next.js
Shadcn/ui
Recharts
React Router
Axios

Backend:
Node.js
Express.js
MongoDB

📂 Project Structure

├── client/            # Frontend (React + Next.js)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/    # Backend URL Context
│   │   ├── utils/
│   │   ├── App.js
│   │   ├── index.js
│   ├── package.json
│   ├── .env
│
├── server/            # Backend (Node.js + Express)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── index.js
│   ├── package.json
│   ├── .env

🔧 Setup Instructions

1️⃣ Clone the Repository

git clone https://github.com/your-username/personal-finance-tracker.git
cd personal-finance-tracker

2️⃣ Install Dependencies

Frontend:
cd client
npm install

Backend:
cd server
npm install

3️⃣ Configure Environment Variables

Create a .env file in the server/ directory:
MONGO_URI=your_mongo_db
PORT=5000


4️⃣ Start the Development Server

Backend:
cd server
npm start

Frontend:
cd client
npm run dev

5️⃣ Open in Browser

Visit: http://localhost:5173 (or the port from Vite)

🔥 Deployment

Backend: Hosted on Render
Frontend: Hosted on Vercel

👨‍💻 Author: Your Name

GitHub: hustlers9720

