# MindScope – Student Wellbeing Prediction

A machine learning-based web application that predicts a student's mental health score using input data.

## About the Project

MindScope is a student wellbeing prediction project built with Machine Learning and FastAPI. It provides a simple web interface where users can enter student-related information and receive a predicted mental health score.

**Note:** This project is for educational purposes only. It is not a medical diagnostic tool.

## Features

- Machine Learning-based prediction
- FastAPI backend
- Interactive web interface
- Input validation using Pydantic
- Real-time prediction through REST API
- Responsive frontend design

## Technologies Used

- Python
- Pandas
- Scikit-learn
- FastAPI
- Pydantic
- HTML
- CSS
- JavaScript
- Joblib

## Project Structure

```text
MindScope-Student-Wellbeing/
│
├── main.py
├── Mental_Health_model.pkl
├── requirements.txt
├── index.html
├── style.css
├── script.js
├── README.md
└── .gitignore
```

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/JonaeidBhuiyan/MindScope-Student-Wellbeing.git
cd MindScope-Student-Wellbeing
```

### 2. Create a virtual environment

```bash
python -m venv venv
```

### 3. Activate the environment

Windows:

```bash
venv\Scripts\activate
```

### 4. Install dependencies

```bash
pip install -r requirements.txt
```

### 5. Run the FastAPI server

```bash
uvicorn main:app --reload
```

### 6. Open API documentation

Visit:

http://127.0.0.1:8000/docs

## API Endpoint

**POST** `/predict`

The API accepts student information and returns a predicted mental health score.

## Author

**Jonaeid Bhuiyan**

GitHub: https://github.com/JonaeidBhuiyan