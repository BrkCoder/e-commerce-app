import { useEffect, useRef, type CSSProperties } from "react";
import { Button, Flex, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import useLogin from "../hooks/useLogin";
import useProfile from "../hooks/useProfile";
import { getUsers, type User } from "../services/Users";
import type { LoginPayload } from "../services/Auth";
import type { Rule } from "antd/es/form";
import "./Login.css";


const Login = () => {
  const users = useRef<User[]>([]);
  const { handleLogin } = useLogin();
  const { handleProfile } = useProfile();

  useEffect(() => {
    getUsers()
      .then((response) => {
        users.current = response;
        console.log("Users loaded successfully:", users.current);
      })
      .catch((error) => {
        console.error("Error loading users:", error);
      });
  }, []);

  const handleLoginClick = (values: LoginPayload) => {
    handleLogin({
      username: values.username,
      password: values.password,
    })
      .then((response) => {
        console.log("Login successful:", response);
        
        const id = users.current.find(
          (user) => user.username === values.username
        )?.id;

        if (!id) {
          console.error("User not found");
          return;
        }

        handleProfile(id)
          .then((profile) => {
            console.log("Profile loaded successfully:", profile);
          })
          .catch((error) => {
            console.error("Error loading profile:", error);
          });

      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
  };

  const formInitialValues: LoginPayload = {
    username: "",
    password: "",
  };  

  const formItemStyle: CSSProperties = {
     width: "50%"
  };

  const formInputStyle: CSSProperties = {
    width: "100%"
  };

  const formButtonStyle: CSSProperties = {
    width: "100%"
  };

  const formIconStyle: CSSProperties = {
    color: "rgba(0,0,0,.25)",
  };

  const formItemUsernameRules: Rule[] = [
    {
      required: true,
      type: "string",
      message: "Please enter a valid username!",
    },  
  ];

  const formItemPasswordRules: Rule[] = [
    {
      required: true,
      type: "string",
      message: "Please enter a valid password!",
    },
  ];

  return (
    <div className="login-page">
      <h2 className="login-title">Login</h2>
      <Form<LoginPayload>
        className="login-form"
        layout="vertical"
        initialValues={formInitialValues}
        onFinish={handleLoginClick}
      >
        <Flex justify="center">
          <Form.Item<LoginPayload>
            label="Username:"
            name="username"
            rules={formItemUsernameRules}
            style={formItemStyle}
          >
            <Input
              placeholder="Enter Username"
              prefix={<UserOutlined style={formIconStyle} />}
              size="large"
              style={formInputStyle}
            />
          </Form.Item>
        </Flex>
        <Flex justify="center">
          <Form.Item<LoginPayload>
            label="Password:"
            name="password"
            rules={formItemPasswordRules}
            style={formItemStyle}
          >
            <Input.Password
              placeholder="Enter Password"
              prefix={<LockOutlined style={formIconStyle} />}
              size="large"
              style={formInputStyle}
            />
          </Form.Item>
        </Flex>
        <Flex justify="center">
          <Form.Item layout="horizontal" style={formItemStyle}>
            <Button type="primary" htmlType="submit" style={formButtonStyle}>
              Login
            </Button>
          </Form.Item>
        </Flex>
      </Form>
    </div>
  );
};

export default Login;
