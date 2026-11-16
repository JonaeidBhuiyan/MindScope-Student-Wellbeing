const API_URL = "http://127.0.0.1:8000/predict";

const form = document.getElementById("assessmentForm");
const button = document.getElementById("submitButton");
const buttonText = button.querySelector("span:first-child");
const errorMessage = document.getElementById("errorMessage");
const resultCard = document.getElementById("resultCard");
const scoreValue = document.getElementById("scoreValue");
const scoreRing = document.getElementById("scoreRing");
const statusText = document.getElementById("statusText");
const resultDescription = document.getElementById("resultDescription");

const numericFields = [
  "Age",
  "Avg_Daily_Usage_Hours",
  "Daily_Unlocks",
  "Study_Hours",
  "Physical_Activity_Hours",
  "Sleep_Hours_Per_Night"
];

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.add("show");
}

function clearError() {
  errorMessage.textContent = "";
  errorMessage.classList.remove("show");
}

function animateScore(target) {
  const duration = 1100;
  const startTime = performance.now();
  const from = 0;

  function frame(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4);
    const current = from + (target - from) * eased;
    scoreValue.textContent = current.toFixed(2);

    const degrees = Math.max(0, Math.min(target / 10, 1)) * 360;
    scoreRing.style.background =
      `conic-gradient(#d5e66c ${degrees * eased}deg, rgba(255,255,255,.14) ${degrees * eased}deg)`;

    if (progress < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  clearError();

  if (!form.reportValidity()) return;

  const formData = new FormData(form);
  const payload = Object.fromEntries(formData.entries());

  for (const field of numericFields) {
    payload[field] = Number(payload[field]);
  }

  button.disabled = true;
  buttonText.textContent = "Calculating your score…";
  statusText.textContent = "READING YOUR CHECK-IN";
  resultDescription.textContent = "Your answers are being processed by the trained model.";
  resultCard.classList.remove("is-ready");
  resultCard.classList.add("is-loading");
  scoreValue.textContent = "…";
  scoreRing.style.background = "conic-gradient(#d5e66c 0deg, rgba(255,255,255,.14) 0deg)";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      let message = "The API could not process your answers.";
      if (data.detail) {
        message = Array.isArray(data.detail)
          ? data.detail.map(item => `${item.loc?.slice(-1)[0] || "Field"}: ${item.msg}`).join(" · ")
          : data.detail;
      }
      throw new Error(message);
    }

    const score = Number(data.predicted_mental_health_score);
    if (!Number.isFinite(score)) {
      throw new Error("The API response did not contain a valid predicted score.");
    }

    resultCard.classList.remove("is-loading");
    resultCard.classList.add("is-ready");
    statusText.textContent = "PREDICTION COMPLETED";
    resultDescription.textContent = "Your model prediction is ready. This is the score returned by your trained machine-learning model.";
    animateScore(score);
  } catch (error) {
    resultCard.classList.remove("is-loading");
    statusText.textContent = "PREDICTION NOT AVAILABLE";
    resultDescription.textContent = "Check that your local API is running, then try again.";
    showError(error.message || "Something went wrong. Please try again.");
  } finally {
    button.disabled = false;
    buttonText.textContent = "Generate my score";
  }
});