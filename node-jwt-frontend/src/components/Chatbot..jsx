// import React, { useState , useEffect} from "react";
// import axiosInstance from "../instances/AxiosInstances";
// import axios from "axios";

// const Chatbot = ({getProducts}) => {
//   const [query, setQuery] = useState("");
//   const [messages, setMessages] = useState([{sender:"bot", text: "Hello! How can I assist you today?"}]);
//   const email = localStorage.getItem("email"); // Get the email from localStorage   
  

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!query.trim()) return;

//     const userMessage = { sender: "user", text: query };
//     setMessages((prev) => [...prev, userMessage]);

//     try {
//         console.log("Sending query to the server:", query);
//         console.log("User email:", email);
//       const response = await axios.post("http://localhost:4000/query-agent", {
//         email,
//         query
//       });

//       const botMessage = { sender: "bot", text: response.data.response };
//       setMessages((prev) => [...prev, botMessage]);
//       await getProducts();

//     } catch (error) {
//       const botError = {
//         sender: "bot",
//         text: "Error fetching response. Please try again.",
//       };
//       setMessages((prev) => [...prev, botError]);
//     }

//     setQuery("");
//   };

//   return (
//     <div className="md:max-w-md w-full p-4 mx-auto text-black shadow-xl rounded-md bg-black h-64  md:h-[600px] flex flex-col">
//       <div className="md:text-xl text-sm font-bold text-center text-white mb-4">Product Control Agent</div>

//       <div className="flex-1 text-sm  overflow-y-auto scrollbar-hide space-y-3 px-1 py-2">
//         {messages.map((msg, i) => (
//           <div
//             key={i}
//             className={`p-2 rounded-lg  ${
//               msg.sender === "user"
//                 ? "bg-gray-900 text-white lg:ml-10 md:ml-5 self-end text-right"
//                 : "bg-gray-800 text-white lg:mr-10 md:mr-5 self-start"
//             }`}
//           >
//             {msg.text}
//           </div>
//         ))}
//       </div>

//       <form
//         onSubmit={handleSubmit}
//         className="mt-4 flex gap-2 border-t pt-2"
//       >
//         <input
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder="Ask a question..."
//           className="flex-1 md:px-3 px-1 md:text-base p-1 text-sm  border text-white bg-gray-700 rounded-md focus:outline-none"
//         />
//         <button
//           type="submit"
//           className="bg-gray-800 md:text-base text-xs p-1 text-white md:px-4  px-1 rounded-md transition-all duartion-300 hover:bg-gray-900"
//         >
//           Send
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Chatbot;


import React, { useState, useEffect, useRef, use } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; // Import the AuthContext
import Cookies from "js-cookie"; // Import Cookies for token management

const Chatbot = ({ getProducts }) => {
  const [query, setQuery] = useState("");
  const username = localStorage.getItem("user");

  const [messages, setMessages] = useState([
    { sender: "bot", text: `Hello ${username} ! How can I assist you today?` }
  ]);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const email = localStorage.getItem("email");
  const [isSpeaking, setIsSpeaking] = useState(false);
 const {welcomeMessage} = useAuth(); // Access welcomeMessage from AuthContext
 
  // 🔊 Speak function
  const speakText = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      setIsSpeaking(true);
      utterance.pitch = 1;
      utterance.rate = 1;
       // Reset speaking state when speech ends
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      window.speechSynthesis.speak(utterance);
    }
  };


  useEffect(() => {
    if(welcomeMessage){
      speakText(messages[0].text);
      setIsSpeaking(true);
    }
  },[welcomeMessage])

  useEffect(() => {

      // speakText(messages[0].text);

    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.lang = "en-US";
      recognition.interimResults = false;

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        processQuery(transcript); // ✅ Auto-submit on voice input complete
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onerror = (e) => {
        console.error("Speech recognition error:", e);
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const handleVoiceInput = () => {
    if (recognitionRef.current) {
      if (isListening) {
        recognitionRef.current.stop();
      } else {
        recognitionRef.current.start();
      }
      setIsListening(!isListening);
    }
  };

  const processQuery = async (inputText) => {
    if (!inputText.trim()) return;

    const userMessage = { sender: "user", text: inputText };
    setMessages((prev) => [...prev, userMessage]);

    try {
      // const response = await axios.post("https://ai-product-agent-zes0.onrender.com/query-agent", {
      const response = await axios.post("http://127.0.0.1:4000/query-agent", {
        email,
        query: inputText
      });

      const botText = response.data.response;
      const botMessage = { sender: "bot", text: botText };
      setMessages((prev) => [...prev, botMessage]);
      speakText(botText); // 🗣️ Speak response

      await getProducts();
    } catch (error) {
      const botErrorText = "Error fetching response. Please try again.";
      const botError = { sender: "bot", text: botErrorText };
      setMessages((prev) => [...prev, botError]);
      speakText(botErrorText); // 🗣️ Speak error
    }

    setQuery("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    processQuery(query);
  };

  return (
    <div className="md:max-w-md w-full p-4 mx-auto text-black shadow-xl rounded-md bg-black h-96 md:h-[600px] flex flex-col">
      <div className="md:text-xl text-sm font-bold text-center text-white mb-4">Product Control Agent</div>

      <div className="flex-1 text-sm overflow-y-auto scrollbar-hide space-y-3 px-1 py-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg ${
              msg.sender === "user"
                ? "bg-gray-900 text-white lg:ml-10 md:ml-5 self-end text-right"
                : "bg-gray-800 text-white lg:mr-10 md:mr-5 self-start"
            } md:text-base text-xs`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-4 flex gap-2 border-t pt-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask a question..."
          className="flex-1 md:px-3 px-1 md:text-base p-1 text-sm border text-white bg-gray-700 rounded-md focus:outline-none"
        />
       { !isSpeaking? <button
          type="button"
          onClick={handleVoiceInput}
          className={`bg-gray-700 md:text-base text-xs p-1 px-2 rounded-md text-white transition ${
            isListening ? "bg-red-600" : "hover:bg-gray-900"
          }`}
          title="Voice Input"
        >
          🎤
        </button>
         :
        <button 
         className="bg-gray-700 md:text-base text-xs p-1  rounded-md text-white transition"
        onClick={()=>{window.speechSynthesis.cancel();
          setIsListening(false);
          setIsSpeaking(false);}}>
          🔇 
        </button>}
        <button
          type="submit"
          className="bg-gray-800 md:text-base text-xs p-1 text-white md:px-4 px-1 rounded-md transition-all duration-300 hover:bg-gray-900"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chatbot;


