const saveKeyBtn = document.getElementById('saveKeyBtn');
const clearKeyBtn = document.getElementById('clearKeyBtn');
const apiKeyInput = document.getElementById('apiKey');


saveKeyBtn.addEventListener('click', () => {
localStorage.setItem('geminiApiKey', apiKeyInput.value);
alert('API key saved');
});


clearKeyBtn.addEventListener('click', () => {
localStorage.removeItem('geminiApiKey');
apiKeyInput.value = '';
alert('API key cleared');
});


const composer = document.getElementById('composer');
const input = document.getElementById('input');
const messages = document.getElementById('messages');
const temperature = document.getElementById('temperature');
const tempVal = document.getElementById('tempVal');


temperature.addEventListener('input', () => {
tempVal.textContent = temperature.value;
});


composer.addEventListener('submit', async (e) => {
e.preventDefault();
const text = input.value.trim();
if (!text) return;


const key = localStorage.getItem('geminiApiKey');
if (!key) {
alert('API key missing');
return;
}


const model = document.getElementById('model').value;


messages.innerHTML += `<div><strong>You:</strong> ${text}</div>`;
input.value = '';


try {
const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ contents: [{ parts: [{ text }] }], generationConfig: { temperature: parseFloat(temperature.value) } })
});


if (!response.ok) {
alert('API key failed');
return;
}


const data = await response.json();
const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || '[No reply]';
messages.innerHTML += `<div><strong>Gemini:</strong> ${reply}</div>`;
messages.scrollTop = messages.scrollHeight;
} catch {
alert('API key failed');
}
});