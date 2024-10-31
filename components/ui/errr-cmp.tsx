import React, { useEffect, useState } from 'react';

interface AlertMessageProps {
  text: string;
  duration?: number;
  hideAlert: () => void; // Callback function to hide the alert
}

const AlertMessage: React.FC<AlertMessageProps> = ({ text, duration = 3000, hideAlert }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      hideAlert(); // Trigger the hideAlert callback after the duration
    }, duration);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [duration, hideAlert]);

  return (
    <div className="toast toast-end toast-middle">
      <div className="alert alert-error">
        <span>{text}</span>
      </div>
    </div>
  );
};

export default AlertMessage;