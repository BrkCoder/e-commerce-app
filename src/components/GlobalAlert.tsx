import { Alert } from "antd";
import { useAlertStore } from "../store/useAlertStore";
import "./GlobalAlert.css";

const GlobalAlert: React.FC = () => {
  const { visible, message, description, type, close } = useAlertStore();

  if (!visible) return <></>;

  return (
    <div className="global-alert-container">
      <Alert
        message={message}
        description={description || ""}
        type={type}
        closable
        onClose={close}
        showIcon
      />
    </div>
  );
};

export default GlobalAlert;
