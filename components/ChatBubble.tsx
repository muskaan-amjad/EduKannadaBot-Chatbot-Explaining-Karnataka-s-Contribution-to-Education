import React from 'react';
import { Message, Sender } from '../types';
import { BotIcon } from './icons';

interface ChatBubbleProps {
  message: Message;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isUser = message.sender === Sender.User;

  const bubbleClasses = isUser
    ? 'bg-blue-600 text-white rounded-br-none'
    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none';

  const containerClasses = isUser ? 'justify-end' : 'justify-start';

  return (
    <div className={`flex items-end gap-2 ${containerClasses}`}>
      {!isUser && (
        <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
          <BotIcon className="w-5 h-5 text-gray-800" />
        </div>
      )}
      <div
        className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl shadow ${bubbleClasses}`}
      >
        <p className="text-sm leading-relaxed break-words whitespace-pre-wrap">{message.text}</p>
      </div>
    </div>
  );
};
