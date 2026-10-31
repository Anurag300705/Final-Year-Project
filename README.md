# Signal - Student Digital Wellness & Mental Health Predictor

An AI-powered full-stack web application that assesses and predicts student mental wellness scores based on digital lifestyle habits, screen time, sleep, academic routines, and perceived stress.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS v4, Framer Motion, Lucide React, React Router
- **Backend**: FastAPI, Uvicorn, Pydantic, Scikit-learn, Pandas, NumPy, Joblib
- **Machine Learning**: Random Forest Regressor Pipeline (`Model.pkl`)

---

## 📁 Project Structure

```text
Final-Year-Project/
├── backend/
│   ├── Model.pkl           # Trained ML pipeline model
│   ├── Untitled10.ipynb    # Training notebook & EDA
│   ├── main.py             # FastAPI backend with /predict endpoint
│   └── requirements.txt    # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── FrontPage.jsx   # Assessment form with 12 features & prediction meter
│   │   │   ├── AboutPage.jsx   # Project mission & ML architecture details
│   │   │   └── Navbar.jsx      # Navigation header
│   │   ├── App.jsx             # Route configuration
│   │   └── main.jsx
│   └── package.json
└── README.md
```

---

## ⚙️ Prerequisites

- **Python** 3.10+
- **Node.js** 18+ and **npm**

---

## 🚀 Getting Started

### 1. Backend Setup (FastAPI)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate      # On Windows: venv\Scripts\activate
   ```

3. Install required packages:
   ```bash
   pip install -r requirements.txt
   ```

4. Start the FastAPI server:
   ```bash
   uvicorn main:app --reload --port 8000
   ```

- **API Documentation (Swagger)**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **Health Check (`GET` & `HEAD`)**: [http://localhost:8000/health](http://localhost:8000/health) *(Ideal for uptime monitoring bots & preventing free Render instance spin-down)*

---

### 2. Frontend Setup (React + Vite)

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. *(Optional)* Configure API URL:
   Create a `.env` file in `frontend/`:
   ```env
   VITE_API_URL=http://localhost:8000
   ```
   *(Defaults to `http://localhost:8000` if omitted)*

4. Start the development server:
   ```bash
   npm run dev
   ```

- **Frontend Application**: [http://localhost:5173](http://localhost:5173)

---

## 📊 Model & Input Features

The model predicts a wellness score from `0.0` to `10.0` using 12 features:

| Feature | Type | Description |
| :--- | :--- | :--- |
| **Age** | Numeric | Student age in years |
| **Gender** | Categorical | Male, Female, Other |
| **Academic Level** | Categorical | Undergraduate, Graduate, High School |
| **Country** | Categorical | Country of residence |
| **Most Used Platform** | Categorical | Instagram, YouTube, Facebook, WhatsApp, etc. |
| **Purpose of Use** | Categorical | Entertainment, Education, Networking, News |
| **Avg Daily Usage** | Numeric | Screen time (hours/day) |
| **Daily Unlocks** | Numeric | Phone screen unlocks per day |
| **Study Hours** | Numeric | Study/work time (hours/day) |
| **Physical Activity**| Numeric | Daily exercise/activity (hours/day) |
| **Sleep** | Numeric | Sleep duration (hours/night) |
| **Stress Level** | Ordinal | Low, Medium, High, Very High |

---

## 🔒 Notes & Security

- Do not commit `.env` or local virtual environment folders (`venv/`, `node_modules/`).
- This application provides educational estimates and does not replace clinical or medical evaluations.
