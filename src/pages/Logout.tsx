import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout: React.FC = () => {
  const nav = useNavigate();
  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    // small delay so user sees a transition if needed
    setTimeout(() => nav('/'), 200);
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">Signing you out...</div>
    </div>
  );
};

export default Logout;
