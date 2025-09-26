const chatWindow = document.getElementById("chat-window");

// Offline Knowledge Base (~150+ questions can be expanded)
const healthFAQ = {
  "hi": "🤖 MITHRA: Hello! How can I help you today?",
  "hello": "🤖 MITHRA: Hi there! Ask me any health-related question.",
  "covid": "COVID-19 is caused by coronavirus. Wash hands, wear masks, and maintain distance.",
  "flu": "Flu symptoms include fever, cough, sore throat, fatigue, and body aches.",
  "diabetes": "Diabetes affects blood sugar. Eat healthy and exercise regularly.",
  "blood pressure": "Normal blood pressure is around 120/80 mmHg.",
  "healthy diet": "Eat fruits, vegetables, whole grains, lean proteins, and avoid excessive sugar.",
  "exercise": "Regular exercise improves physical and mental health.",
  "mental health": "Practice mindfulness, meditation, and seek help if stressed.",
  "obesity": "Maintain healthy weight with diet and exercise.",
  "vaccination": "Vaccines protect against many diseases. Follow schedules.",
  "hygiene": "Wash hands frequently, cover your mouth when sneezing.",
  "cancer": "Early detection improves treatment outcomes.",
  "heart disease": "Eat healthy, exercise, avoid smoking.",
  "kidney health": "Stay hydrated, maintain blood pressure.",
  "sleep": "Aim for 7-9 hours of quality sleep daily."
  // ... add more to expand to 150+ topics
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
