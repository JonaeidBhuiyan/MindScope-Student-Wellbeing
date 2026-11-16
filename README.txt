MINDSCOPE — UNIQUE FRONTEND
================================

Files:
- index.html
- style.css
- script.js

How to use:
1. Keep these three files in the same folder as your existing main.py.
2. Keep Mental_Health_model.pkl and .venv313 unchanged.
3. Start your FastAPI backend:
   python -m uvicorn main:app --reload
4. Open index.html with VS Code Live Server.
5. Submit the form to test the prediction.

The frontend sends POST requests to:
http://127.0.0.1:8000/predict

Important:
- This frontend matches the StudentData fields and prediction response
  described for your existing FastAPI backend.
- Do not replace or edit main.py or the model file for this frontend update.
- Google Fonts are loaded from the internet; fallback fonts are included.


Update:
- Replaced only style.css to fix typed number/text values becoming unreadable
  when an input field is focused or filled.
- The original dark color theme, layout, and visual style are preserved.
