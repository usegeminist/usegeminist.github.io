const composer = document.getElementById('composer');
const input = document.getElementById('input');
const messages = document.getElementById('messages');
const temperature = document.getElementById('temperature');
const tempVal = document.getElementById('tempVal');

let conversation = [];

temperature.addEventListener('input', () => {
  tempVal.textContent = temperature.value;
});

composer.addEventListener('submit', async (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  const model = document.getElementById('model').value;

  messages.innerHTML += `<div><strong>You:</strong> ${text}</div>`;
  input.value = '';

  conversation.push({ role: "user", parts: [{ text }] });

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=AIzaSyDySdjLJSfzEv8ZvBr_sZsf7LTo2WVrggg`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: conversation,
          generationConfig: { temperature: parseFloat(temperature.value) }
        })
      }
    );

    if (!response.ok) {
      alert('API key failed');
      return;
    }

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || '[No reply]';

    messages.innerHTML += `<div><strong>Gemini:</strong> ${reply}</div>`;
    messages.scrollTop = messages.scrollHeight;

    conversation.push({ role: "model", parts: [{ text: reply }] });

  } catch {
    alert('API key failed');
  }
});

const newChatBtn = document.getElementById('newChatBtn');

newChatBtn.addEventListener('click', () => {
  conversation = [];
  messages.innerHTML = "";
});
