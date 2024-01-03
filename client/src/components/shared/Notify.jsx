import React from 'react';
import { useSelector } from 'react-redux';
import Toast from './Toast';

const Notify = () => {
  const alert = useSelector((state) => state.alert);
  return (
    <div>
      {alert.success && <Toast msg={alert.success} bgColor='success' />}

      {alert.error && <Toast msg={alert.error} bgColor='error' />}
    </div>
  );
};

export default Notify;
