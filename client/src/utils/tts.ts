export const speakText = (
  text: string,
  onSpeakingchange?: (speaking: boolean) => void
) => {
  console.log('from speach text', text, onSpeakingchange);

  if (!text.trim() || typeof window === 'undefined') return;
  const synth = window.speechSynthesis;
  synth.cancel();

  const uttarance = new SpeechSynthesisUtterance(text.trim());

  const voices = synth.getVoices();
  const selectedVoice =
    voices.find((v) => v.lang === 'en-US') ||
    voices.find((v) => v.lang.startsWith('en'));

  if (selectedVoice) {
    uttarance.voice = selectedVoice;
  }
  uttarance.lang = selectedVoice?.lang || 'en-US';

  uttarance.rate = 0.9;
  uttarance.pitch = 1;
  uttarance.volume = 1;

  uttarance.onstart = () => {
    console.log('✅ Browser started speaking');
    onSpeakingchange?.(true);
  };

  uttarance.onend = () => {
    console.log('✅ Browser ended speaking');
    onSpeakingchange?.(false);
  };

  uttarance.onerror = (err) => {
    console.error('❌ Speech error:', err);
    onSpeakingchange?.(false);
  };

  synth.speak(uttarance);
};

export const stopSpeaking = () => {
  if (typeof window !== 'undefined') {
    window.speechSynthesis.cancel();
  }
};
