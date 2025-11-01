import React from 'react';
import { BotIcon } from './icons';

export const Header: React.FC = () => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md p-4 flex items-center fixed top-0 left-0 right-0 z-10 border-b border-gray-200 dark:border-gray-700">
      <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
        <BotIcon className="w-6 h-6 text-gray-800" />
      </div>
      <div>
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">EduKannadaBot</h1>
        <p className="text-sm text-green-600 dark:text-green-400 font-medium">Online</p>
      </div>
    </header>
  );
};
