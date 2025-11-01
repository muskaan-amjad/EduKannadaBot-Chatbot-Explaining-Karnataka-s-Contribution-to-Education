import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';

import { Message, Sender } from './types';
import { SYSTEM_INSTRUCTION, INITIAL_GREETING } from './constants';
import { Header } from './components/Header';
import { ChatBubble } from './components/ChatBubble';
import { MessageInput } from './components/MessageInput';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const initializeChat = () => {
      try {
        if (!process.env.API_KEY) {
            throw new Error("API key not found.");
        }
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        chatRef.current = ai.chats.create({
          model: 'gemini-2.5-flash',
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
          },
        });
        setMessages([
          {
            id: 'initial-greeting',
            text: INITIAL_GREETING,
            sender: Sender.Bot,
          },
        ]);
      } catch (error) {
        console.error("Failed to initialize chat:", error);
        setMessages([
          {
            id: 'error-message',
            text: 'Sorry, I am having trouble connecting. Please check the API key and refresh the page. Dhanyavaada!',
            sender: Sender.Bot,
          },
        ]);
      }
    };
    initializeChat();
  }, []);

  const handleSend = useCallback(async () => {
    if (!input.trim() || isLoading || !chatRef.current) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: Sender.User,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await chatRef.current.sendMessage({ message: input });
      const botResponse: Message = {
        id: `${Date.now()}-bot`,
        text: result.text,
        sender: Sender.Bot,
      };
      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: `${Date.now()}-error`,
        text: "Apologies, I couldn't process that. Please try asking in a different way. Dhanyavaada!",
        sender: Sender.Bot,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading]);

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900 font-sans">
      <Header />
      <main className="flex-1 overflow-y-auto p-4 pt-24 pb-4 space-y-4">
        {messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg} />
        ))}
        {isLoading && (
          <div className="flex justify-start items-end gap-2">
             <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                <div className="w-5 h-5 text-gray-800">
                    {/* Placeholder for BotIcon during load to maintain layout */}
                </div>
             </div>
            <div className="flex items-center space-x-1 bg-gray-200 dark:bg-gray-700 px-4 py-3 rounded-2xl rounded-bl-none shadow">
              <span className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </main>
      <div className="sticky bottom-0 left-0 right-0">
        <MessageInput
          input={input}
          setInput={setInput}
          onSend={handleSend}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default App;
