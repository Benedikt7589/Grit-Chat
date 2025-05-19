function sendMessage() {
  const input = document.getElementById("message-input");
  const message = input.value.trim();
  if (message === "") return;

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.innerText = message;

  const chatArea = document.getElementById("chat-area");
  chatArea.appendChild(bubble);
  input.value = "";

  // Scroll to bottom
  chatArea.scrollTop = chatArea.scrollHeight;
}

function deleteLastMessage() {
  const chatArea = document.getElementById("chat-area");
  if (chatArea.lastChild) {
    chatArea.removeChild(chatArea.lastChild);
  }
}

function downloadChat() {
  const chatElement = document.querySelector(".app");

  // PDF Download using html2pdf.js
  const opt = {
    margin:       0,
    filename:     'whatsapp-chat.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2, useCORS: true },
    jsPDF:        { unit: 'pt', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().set(opt).from(chatElement).save();

  // PNG Download using html2canvas and toBlob
  html2canvas(chatElement, { scale: 2, useCORS: true }).then(canvas => {
    canvas.toBlob(function(blob) {
      const link = document.createElement('a');
      link.download = 'whatsapp-chat.png';
      link.href = URL.createObjectURL(blob);
      link.click();
      URL.revokeObjectURL(link.href);
    }, 'image/png');
  });
}