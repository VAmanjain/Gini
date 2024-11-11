"use client";

// import React, { useState, useEffect, useRef } from 'react';
// import { Send, Bot, User, Loader2 } from 'lucide-react';
// import ReactMarkdown from 'react-markdown'; // Importing ReactMarkdown
// import remarkGfm from 'remark-gfm'; // For GitHub Flavored Markdown

// type Message = {
//   id: string;
//   role: 'user' | 'ai';
//   content: string;
// };

// export default function AIChatAssistant() {
//   const [input, setInput] = useState('');
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const scrollAreaRef = useRef<HTMLDivElement>(null);

//   const generateText = async () => {
//     if (!input.trim()) return;

//     setIsLoading(true);
//     setError(null);
//     const userMessage: Message = { id: Date.now().toString(), role: 'user', content: input };
//     setMessages(prev => [...prev, userMessage]);
//     setInput('');

//     try {
//       const response = await fetch('/api/generate', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ body: input }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to generate response');
//       }

//       const data = await response.json();
//       const aiMessage: Message = { id: (Date.now() + 1).toString(), role: 'ai', content: data.output };
//       setMessages(prev => [...prev, aiMessage]);
//     } catch (error) {
//       console.error('Error generating text:', error);
//       setError('An error occurred while generating text. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (scrollAreaRef.current) {
//       scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
//     }
//   }, [messages]);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     generateText();
//   };

//   return (
//     <>
//       <style jsx global>{`
//         @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
//         body {
//           font-family: 'Space Mono', monospace;
//         }
//       `}</style>
//       <div className="flex flex-col h-screen bg-gray-900 text-white">
//         <div className="flex-grow flex flex-col bg-gray-800 shadow-lg overflow-hidden">
//           <div className="p-4 bg-gray-700 border-b border-gray-600">
//             <h2 className="text-2xl font-bold text-center text-blue-400">AI Chat Assistant</h2>
//           </div>
//           <div className="flex-grow overflow-hidden">
//             <div className="h-full overflow-y-auto p-4 space-y-4" ref={scrollAreaRef}>
//               {messages.map((message) => (
//                 <div
//                   key={message.id}
//                   className={`flex items-start space-x-2 ${
//                     message.role === 'user' ? 'justify-end' : 'justify-start'
//                   } animate-fade-up`}
//                 >
//                   {message.role === 'ai' && (
//                     <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white flex-shrink-0">
//                       <Bot size={20} />
//                     </div>
//                   )}
//                   <div
//                     className={`rounded-lg p-3 max-w-[80%] ${
//                       message.role === 'user' ? 'bg-blue-600' : 'bg-gray-700'
//                     } shadow-md`}
//                   >
//                     <ReactMarkdown 
//                       children={message.content} 
//                       remarkPlugins={[remarkGfm]} // Enable GitHub Flavored Markdown
//                       className="markdown" // Custom CSS class for styling
//                     />
//                   </div>
//                   {message.role === 'user' && (
//                     <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white flex-shrink-0">
//                       <User size={20} />
//                     </div>
//                   )}
//                 </div>
//               ))}
//               {isLoading && (
//                 <div className="flex items-center space-x-2 animate-fade-up">
//                   <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
//                     <Loader2 size={20} className="animate-spin" />
//                   </div>
//                   <div className="bg-gray-700 rounded-lg p-3 shadow-md">
//                     Generating response...
//                   </div>
//                 </div>
//               )}
//               {error && (
//                 <div className="bg-red-500 text-white p-3 rounded-lg mt-2 animate-fade-up">
//                   {error}
//                 </div>
//               )}
//             </div>
//           </div>
//           <div className="p-4 bg-gray-700 border-t border-gray-600">
//             <form onSubmit={handleSubmit} className="flex w-full space-x-2">
//               <input
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 placeholder="Type your message..."
//                 className="flex-grow px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
//               />
//               <button
//                 type="submit"
//                 disabled={isLoading || !input.trim()}
//                 className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
//               >
//                 <Send size={18} />
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }


import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type Message = {
  id: string;
  role: 'user' | 'ai';
  content: string;
};

const AIChatAssistant = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const generateText = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    setError(null);
    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ body: input }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate response');
      }

      const data = await response.json();
      const aiMessage: Message = { id: (Date.now() + 1).toString(), role: 'ai', content: data.output };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error generating text:', error);
      setError('An error occurred while generating text. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generateText();
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white font-['VT323']">
      <div className="flex-grow flex flex-col bg-gray-800 shadow-lg overflow-hidden">
        <div className="p-4 bg-gray-700 border-b border-gray-600">
          <h2 className="text-2xl font-bold text-center text-blue-400">Talk to Gini........</h2>
        </div>
        <div className="flex-grow overflow-hidden">
          <div className="h-full overflow-y-auto p-4 space-y-4" ref={scrollAreaRef}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-2 ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                } animate-fade-up`}
              >
                {message.role === 'ai' && (
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white flex-shrink-0">
                    <Bot size={20} />
                  </div>
                )}
                <div
                  className={`rounded-lg p-3 max-w-[80%] ${
                    message.role === 'user' ? 'bg-blue-600' : 'bg-gray-700'
                  } shadow-md`}
                >
                  <ReactMarkdown
                    children={message.content}
                    remarkPlugins={[remarkGfm]}
                    className="markdown"
                  />
                </div>
                {message.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white flex-shrink-0">
                    <User size={20} />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center space-x-2 animate-fade-up">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                  <Loader2 size={20} className="animate-spin" />
                </div>
                <div className="bg-gray-700 rounded-lg p-3 shadow-md">
                  Generating response...
                </div>
              </div>
            )}
            {error && (
              <div className="bg-red-500 text-white p-3 rounded-lg mt-2 animate-fade-up">
                {error}
              </div>
            )}
          </div>
        </div>
        <div className="p-4 bg-gray-700 border-t border-gray-600">
          <form onSubmit={handleSubmit} className="flex w-full space-x-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AIChatAssistant;