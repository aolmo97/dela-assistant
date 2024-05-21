// app/page.tsx
import React from "react";
import VoiceAssistant from "./components/VoiceAssistant";

const Home: React.FC = () => {
  return (
    <div>
      <h1>Asistente de Voz</h1>
      <VoiceAssistant />
    </div>
  );
};

export default Home;
