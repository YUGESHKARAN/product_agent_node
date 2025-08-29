# Product Control Agent
[![License: MIT](https://img.shields.io/github/license/YUGESHKARAN/product_agent_node)](LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/YUGESHKARAN/product_agent_node?style=social)](https://github.com/YUGESHKARAN/product_agent_node/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/YUGESHKARAN/product_agent_node?style=social)](https://github.com/YUGESHKARAN/product_agent_node/network/members)
[![Node.js Version](https://img.shields.io/badge/node-%3E=16.0.0-brightgreen.svg)](https://nodejs.org/)
[![Issues](https://img.shields.io/github/issues/YUGESHKARAN/product_agent_node)](https://github.com/YUGESHKARAN/product_agent_node/issues)
[![Pull Requests](https://img.shields.io/github/issues-pr/YUGESHKARAN/product_agent_node)](https://github.com/YUGESHKARAN/product_agent_node/pulls)
[![Last Commit](https://img.shields.io/github/last-commit/YUGESHKARAN/product_agent_node)](https://github.com/YUGESHKARAN/product_agent_node/commits/main)

![Product Control Agent UI](https://github.com/YUGESHKARAN/product_agent_node/main/ui_product_agent.png)
Meet your next-level assistant: **Product Control Agent** – an AI-powered solution that makes controlling and analyzing your product website smarter and faster. 

---

## 🚀 Overview

**Product Control Agent** is built to automate and simplify CRUD operations on your product website, leveraging the latest in AI to streamline workflows and supercharge productivity. With advanced analysis capabilities, it helps you make better decisions, faster. Vist [this link](https://www.linkedin.com/posts/yugeshkaran01_techlovers-ai-llm-activity-7337033147668119553-D03r?utm_source=share&utm_medium=member_desktop&rcm=ACoAADkZ8EIBpAY9uNYV2sgO7Npeu1ePnNN6Who)  to view the application demo. 

**Note: This repository does not include the Flask backend. Please visit: [ai_product_agent](https://github.com/YUGESHKARAN/ai_product_agent.git)  to access or refer to the AI Agent implementation.**

---

## 🔥 Key Features

- **AI-Driven Automation:** Uses state-of-the-art LLM (Llama 3 70B) to power intelligent CRUD and analysis operations.
- **Seamless CRUD:** Effortlessly manage products, categories, and data on your website.
- **Rapid Analysis:** Get instant, AI-generated insights from your data.
- **Modern Full-stack:** Runs on a robust MERN stack (MongoDB, Express, React, Node.js) with a Flask-based AI backend.
- **CORS-Enabled:** Smooth integration between frontend and backend.
- **JWT Authentication:** Secure access to all endpoints.
- **MongoDB Storage:** Scalable database for all your product data.

---

## 🛠️ Tech Stack

- **Frontend:** React.js, TailwindCSS (`node-jwt-frontend`)
- **Backend:** Node.js, Express, MongoDB, JWT, CORS (`nodejs-jwt-auth`)
- **AI Service:** Flask, Llama 3 70B LLM

---

## 📁 Folder Structure

```
product_agent_node/
├── node-jwt-frontend/    # React.js + TailwindCSS frontend
├── nodejs-jwt-auth/      # Node.js + Express + MongoDB + JWT + CORS backend
├── flask-ai/             # Flask server for Llama 3 70B (if applicable)
├── README.md
└── ...
```

---

## ⚡ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- [Python 3.8+](https://www.python.org/) (for Flask AI service)
- (Optional) [CUDA](https://developer.nvidia.com/cuda-zone) for GPU-accelerated inference

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YUGESHKARAN/product_agent_node.git
   cd product_agent_node
   ```

2. **Install Frontend:**
   ```bash
   cd node-jwt-frontend
   npm install
   cd ..
   ```

3. **Install Backend:**
   ```bash
   cd nodejs-jwt-auth
   npm install
   cd ..
   ```

4. **Install Flask AI Server (optional):**
   ```bash
   cd flask-ai
   pip install -r requirements.txt
   cd ..
   ```

### Environment Setup

- **Backend (`nodejs-jwt-auth/.env`):**
  ```env
  PORT=5000
  MONGODB_URI=mongodb://localhost:27017/your-db
  JWT_SECRET=your_jwt_secret
  ```

- **Frontend (`node-jwt-frontend/.env`):**
  ```
  REACT_APP_API_URL=http://localhost:5000
  ```

- **Flask AI (`flask-ai/.env`):**
  ```
  MODEL_PATH=path/to/llama3-70b-8192
  ```

### Running the Application

- **Backend:**
  ```bash
  cd nodejs-jwt-auth
  npm start
  ```
- **Frontend:**
  ```bash
  cd node-jwt-frontend
  npm start
  ```
- **Flask AI Server:**
  ```bash
  cd flask-ai
  python app.py
  ```

---

## 🌐 Usage

- Visit [http://localhost:5173](http://localhost:5173) for the frontend.
- The frontend communicates with the backend for CRUD operations and with the Flask AI service for advanced analysis.
- Secure all endpoints with JWT tokens for safe operation.

---

## 🤝 Contributing

Contributions and ideas are welcome! Open issues or submit pull requests.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

**Pushing the boundaries of what AI can do to simplify workflows and boost productivity!**
