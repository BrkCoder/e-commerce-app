// GlobalAlert.tsx
import { Alert } from 'antd';
import { useAlertStore } from '../store/alertStore'; // or useContext if preferred
import "./GlobalAlert.css";

const GlobalAlert = () => {
  const { visible, message, description, type, close } = useAlertStore();

  if (!visible) return <></>;

  return (
    <div className='global-alert-container'>
      <Alert message={message} description={description || ''} type={type} closable onClose={close}  showIcon/>
    </div>
  );
};

export default GlobalAlert;
