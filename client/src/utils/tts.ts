export const playAIvoice = (
  text: string,
  onStart: () => void,
  onEnd: () => void
) => {
  if (!('speechSynthesis' in window)) {
    console.error('Text-to-speech not supported in this browser.');
    onEnd();
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.95;
  utterance.pitch = 1;
  const voices = window.speechSynthesis.getVoices();
  const englishVoice = voices.find(
    (v) =>
      v.lang.includes('en') &&
      (v.name.includes('Google') || v.name.includes('Natural'))
  );
  if (englishVoice) {
    utterance.voice = englishVoice;
  }

  // Event triggered when audio actually begins
  utterance.onstart = () => {
    onStart();
  };

  // Event triggered the exact millisecond the AI finishes speaking
  utterance.onend = () => {
    onEnd();
  };

  utterance.onerror = (event) => {
    console.error('Speech synthesis error:', event);
    onEnd();
  };

  window.speechSynthesis.speak(utterance);
};
