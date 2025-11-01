import React from 'react';

export const BotIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M4.5 2.25a.75.75 0 000 1.5v16.5a.75.75 0 001.5 0v-1.148a3.375 3.375 0 016.095-2.073 4.875 4.875 0 018.683 1.151.75.75 0 001.442-.441A6.375 6.375 0 0013.5 15.75a4.875 4.875 0 00-8.28-3.045.75.75 0 00-.72.045V2.25zM15 9.75a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 0115 9.75zM15.75 12a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3zM9 9.75A.75.75 0 019.75 9h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 019 9.75zM9.75 12a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z"
      clipRule="evenodd"
    />
  </svg>
);


export const SendIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
  </svg>
);
