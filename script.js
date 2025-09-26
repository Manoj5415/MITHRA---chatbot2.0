const chatWindow = document.getElementById("chat-window");
// Offline Knowledge Base (~150+ questions can be expanded)
const healthFAQ = {
  // Greetings
  "hi": "🤖 MITHRA: Hello! How can I help you today?",
  "hello": "🤖 MITHRA: Hi there! Ask me any health-related question.",
  "hey": "🤖 MITHRA: Hey! I’m MITHRA, your health assistant.",
  "how are you": "🤖 MITHRA: I’m an AI chatbot, always ready to assist you!",
  "good morning": "🤖 MITHRA: Good morning! How can I help you today?",
  "good evening": "🤖 MITHRA: Good evening! Do you have any health queries?",
  "thanks": "🤖 MITHRA: You’re welcome!",
  "thank you": "🤖 MITHRA: Happy to help!",
  "bye": "🤖 MITHRA: Goodbye! Stay healthy!",
  "good night": "🤖 MITHRA: Good night! Take care of your health.",

  // Common Illnesses
  "cold": "🤖 MITHRA: For a common cold, rest well, drink fluids, and take vitamin C.",
  "flu": "🤖 MITHRA: Flu symptoms include fever, cough, sore throat, fatigue, and body aches.",
  "fever": "🤖 MITHRA: Fever is a temporary increase in body temperature. Drink fluids and rest.",
  "headache": "🤖 MITHRA: Headaches can be caused by stress, dehydration, or lack of sleep.",
  "migraine": "🤖 MITHRA: Migraines are severe headaches. Rest in a dark room and consult a doctor if frequent.",
  "stomach ache": "🤖 MITHRA: Stomach ache can be due to indigestion, gas, or infection. Stay hydrated and eat light food.",
  "diarrhea": "🤖 MITHRA: Drink plenty of fluids, avoid junk food, and consult a doctor if severe.",
  "constipation": "🤖 MITHRA: Eat high-fiber foods, drink water, and exercise regularly.",

  // Chronic Diseases
  "diabetes": "🤖 MITHRA: Diabetes affects blood sugar. Eat healthy and exercise regularly.",
  "blood sugar": "🤖 MITHRA: Maintain normal blood sugar with diet, exercise, and medications if prescribed.",
  "blood pressure": "🤖 MITHRA: Normal blood pressure is around 120/80 mmHg.",
  "hypertension": "🤖 MITHRA: Hypertension is high blood pressure. Reduce salt, exercise, and monitor regularly.",
  "heart disease": "🤖 MITHRA: Eat healthy, exercise, avoid smoking, and monitor cholesterol levels.",
  "obesity": "🤖 MITHRA: Maintain healthy weight with balanced diet and regular exercise.",
  "cholesterol": "🤖 MITHRA: Keep cholesterol in check by avoiding fatty foods and exercising regularly.",

  // Preventive Health & Lifestyle
  "exercise": "🤖 MITHRA: Regular exercise improves physical and mental health.",
  "healthy diet": "🤖 MITHRA: Eat fruits, vegetables, whole grains, lean proteins, and avoid excessive sugar.",
  "hydration": "🤖 MITHRA: Drink at least 8 glasses of water daily for proper hydration.",
  "sleep": "🤖 MITHRA: Aim for 7-9 hours of quality sleep every day.",
  "stress": "🤖 MITHRA: Practice mindfulness, meditation, and deep breathing to reduce stress.",
  "mental health": "🤖 MITHRA: Take breaks, socialize, and consult a professional if needed.",
  "vaccination": "🤖 MITHRA: Vaccines protect against many diseases. Follow the vaccination schedule.",
  "hygiene": "🤖 MITHRA: Wash hands frequently, cover your mouth when sneezing, and maintain personal hygiene.",

  // Women & Men’s Health
  "menstruation": "🤖 MITHRA: Maintain hygiene during periods, and consult a doctor if pain is severe.",
  "pregnancy": "🤖 MITHRA: Eat nutritious food, stay hydrated, and consult your doctor regularly.",
  "breast health": "🤖 MITHRA: Regular self-checks and mammograms help early detection of breast issues.",
  "prostate health": "🤖 MITHRA: Regular checkups and healthy lifestyle help maintain prostate health.",
  "sexual health": "🤖 MITHRA: Practice safe sex, get tested, and consult a doctor for concerns.",

  // Children & Elderly
  "child health": "🤖 MITHRA: Ensure balanced diet, vaccinations, and regular exercise for children.",
  "elderly health": "🤖 MITHRA: Focus on diet, exercise, regular checkups, and mental well-being for seniors.",
  "immunity": "🤖 MITHRA: Eat healthy, exercise, sleep well, and avoid stress to boost immunity.",
  "nutrition": "🤖 MITHRA: Include proteins, vitamins, and minerals in your diet for overall health.",

  // Common Diseases
  "covid": "COVID-19 is caused by coronavirus. Wash hands, wear masks, and maintain distance.",
  "flu prevention": "Wash hands frequently, maintain social distance, and get vaccinated.",
  "cancer": "Early detection improves treatment outcomes. Avoid smoking and maintain healthy lifestyle.",
  "kidney health": "Stay hydrated, maintain blood pressure, and avoid excess salt.",
  "liver health": "Avoid alcohol abuse, eat healthy, and consult a doctor for regular checkups.",

  // Emergency & Advice
  "chest pain": "🤖 MITHRA: Chest pain can be serious. Call emergency services immediately.",
  "shortness of breath": "🤖 MITHRA: Seek medical attention immediately if severe.",
  "injury": "🤖 MITHRA: Clean the wound, apply antiseptic, and consult a doctor if needed.",
  "poisoning": "🤖 MITHRA: Call emergency services and follow poison control instructions.",

  // Additional General
  "what is health": "🤖 MITHRA: Health is a state of complete physical, mental, and social well-being.",
  "why exercise": "🤖 MITHRA: Exercise improves fitness, mental health, and prevents chronic diseases.",
  "why eat healthy": "🤖 MITHRA: Healthy eating provides essential nutrients and reduces disease risk.",
  "how to reduce stress": "🤖 MITHRA: Practice meditation, deep breathing, and regular exercise.",
  "how to lose weight": "🤖 MITHRA: Combine balanced diet, regular exercise, and sufficient sleep.",
  "how to gain weight": "🤖 MITHRA: Eat protein-rich foods, healthy fats, and perform strength training.",
  "what is immunity": "🤖 MITHRA: Immunity is the body’s ability to fight infections and stay healthy.",
  "how to improve immunity": "🤖 MITHRA: Eat nutritious food, sleep well, exercise, and manage stress.",
  "what is mental health": "🤖 MITHRA: Mental health includes emotional, psychological, and social well-being.",
  "how to improve mental health": "🤖 MITHRA: Practice mindfulness, social interaction, and seek help when needed."
};

// AI fallback using Hugging Face free API
async function getAIAnswer(question) {
  try {
    const response = await fetch("https://api-inference.huggingface.co/models/gpt2", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inputs: `You are MITHRA, a helpful health assistant. Answer the question: ${question}` })
    });
    const data = await response.json();
    if (data && data[0]?.generated_text) return data[0].generated_text;
    return "🤖 MITHRA: Sorry, I couldn't generate an answer.";
  } catch (error) {
    return "🤖 MITHRA: AI server error, please try again later.";
  }
}

// Combined answer: offline first, AI fallback
async function getAnswer(question) {
  question = question.toLowerCase();
  for (let key in healthFAQ) {
    if (question.includes(key)) return healthFAQ[key];
  }
  return await getAIAnswer(question);
}

// Send message
async function sendMessage() {
  const input = document.getElementById("user-input");
  const userText = input.value.trim();
  if (!userText) return;

  // Display user message
  const userMsg = document.createElement("div");
  userMsg.className = "message user";
  userMsg.innerText = userText;
  chatWindow.appendChild(userMsg);

  // Typing indicator
  const botMsg = document.createElement("div");
  botMsg.className = "message bot";
  botMsg.innerText = "🤖 MITHRA: typing...";
  chatWindow.appendChild(botMsg);
  chatWindow.scrollTop = chatWindow.scrollHeight;

  // Get answer
  const answer = await getAnswer(userText);
  botMsg.innerText = answer;
  chatWindow.scrollTop = chatWindow.scrollHeight;

  input.value = "";
}

// Enter key triggers send
document.getElementById("user-input").addEventListener("keypress", function(e){
  if(e.key === "Enter") sendMessage();
});

