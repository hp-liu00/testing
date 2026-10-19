const whatsappChat = document.getElementById("whatsapp-chat");

if (whatsappChat) {
  whatsappChat.addEventListener("click", () => {
    if ("speechSynthesis" in window && "SpeechSynthesisUtterance" in window) {
      window.speechSynthesis.speak(new window.SpeechSynthesisUtterance("How can I help you"));
    }
  });
}