import { useNavigate } from "react-router";
import { useAlertStore } from "../store/useAlertStore";
import { handleAuthLogin, type LoginResponse } from "../services/Auth";
import { tokenService } from "../services/Token";
import { useNavStore } from "../store/useNavStore";

const useLogin = () => {
  const navigate = useNavigate();
  const { setActiveNav } = useNavStore();
  const { show, close } = useAlertStore();

  const handleLogin = ({ username, password }: { username: string; password: string }) => {
    return handleAuthLogin(
      { username, password },
      (response: LoginResponse) => {
        tokenService.setToken(response.token);
        navigate("/");
        setActiveNav("home");
        close();
      },
      (error: Error) => {
        show("error", "Login failed", "Please try logging in again.");
        console.error("Login error:", error);
        throw error;
      }
    );
  }

  return { handleLogin };
}

export default useLogin;
