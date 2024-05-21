"use client";

import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import axios from "axios";

const languages = [
  { code: "en-US", name: "English (United States)" },
  { code: "en-GB", name: "English (United Kingdom)" },
  { code: "es-ES", name: "Spanish (Spain)" },
  { code: "es-MX", name: "Spanish (Mexico)" },
  // Añade más idiomas aquí
];

const VoiceAssistant: React.FC = () => {
  const [language, setLanguage] = useState("es-ES"); // Idioma predeterminado
  const [response, setResponse] = useState(""); // Respuesta del LLM
  const {
    transcript,
    interimTranscript,
    finalTranscript,
    resetTranscript,
    listening,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      console.log("El navegador no soporta reconocimiento de voz");
      return;
    }

    SpeechRecognition.startListening({
      continuous: true,
      interimResults: true,
      language,
    });

    return () => {
      SpeechRecognition.stopListening();
    };
  }, [language]);

  useEffect(() => {
    if (finalTranscript) {
      console.log("Transcripción final:", finalTranscript);
      axios
        .post("http://localhost:3001/api/generate", { prompt: finalTranscript })
        .then((res) => {
          setResponse(res.data.choices[0].message.content);
          resetTranscript();
        })
        .catch((error) => {
          console.error("Error al generar respuesta:", error);
        });
    }
  }, [finalTranscript, resetTranscript]);

  return (
    <div>
      <label htmlFor="language">Seleccione el idioma: </label>
      <select
        id="language"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
      <p>Micrófono: {listening ? "Encendido" : "Apagado"}</p>
      <p>Transcripción: {transcript}</p>
      <p>Transcripción interina: {interimTranscript}</p>
      <p>Respuesta del LLM: {response}</p>
    </div>
  );
};

export default VoiceAssistant;
