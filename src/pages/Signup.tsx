import { Button, Flex, Form, Input } from "antd";
import { createUser, type User } from "../services/Users";
import { useAlertStore } from "../store/alertStore";
import type { CreateUserData } from "../services/Users";
import useLogin from "../hooks/useLogin";
import useProfile from "../hooks/useProfile";
import "./Signup.css";

interface SignUpValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const SignUp = () => {
  const { show } = useAlertStore();
  const { handleLogin } = useLogin();
  const { handleProfile } = useProfile();

  const convertSignUpValuesToUser = (values: SignUpValues): CreateUserData => {
    return {
      id: 0,
      email: values.email,
      password: values.password,
      username: values.email,
    };
  };

  const createNewUser = (user: CreateUserData) => {
    return createUser(user)
      .then((response: Pick<User, "username" | "password">) => {
        console.log("User created successfully:", response);
        setTimeout(() => {
          handleLogin({
            username: "johnd", //response.username,
            password: "m38rmF$", // response.password
          })
            .then((response: Pick<User, "id">) => {
              console.log("Login successful after signup:", response);
              handleProfile(1); // Assuming 1 is the user ID for the newly created user
            })
            .catch((error: Error) => {
              console.error("Error logging in after signup:", error);
            });
        }, 3000);
      })
      .catch((error: Error) => {
        console.error("Error creating user:", error);
      });
  };

  const handleSignUp = (values: SignUpValues) => {
    const newUser = convertSignUpValuesToUser(values);
    show(
      "success",
      "User created successfully",
      "You will be redirected to the home page shortly."
    );
    createNewUser(newUser);
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Sign Up</h2>
      <Form
        name="signup-form"
        className="signup-form"
        layout="vertical"
        initialValues={{ email: "", password: "" }}
        onFinish={handleSignUp}
      >
        <Flex gap={"2rem"}>
          <Form.Item
            style={{ width: "50%" }}
            label="First Name"
            name="firstName"
            rules={[
              {
                required: true,
                type: "string",
                message: "First name is required",
              },
            ]}
          >
            <Input placeholder="Enter First Name" size="large" />
          </Form.Item>
          <Form.Item
            style={{ width: "50%" }}
            label="Last Name"
            name="lastName"
            rules={[
              {
                required: true,
                type: "string",
                message: "Last name is required",
              },
            ]}
          >
            <Input placeholder="Enter Last Name" size="large" />
          </Form.Item>
        </Flex>
        <Flex gap={"2rem"}>
          <Form.Item
            style={{ width: "50%" }}
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                type: "string",
                message: "Please enter a valid username",
              },
            ]}
          >
            <Input placeholder="Enter Username" size="large" />
          </Form.Item>
          <Form.Item
            style={{ width: "50%" }}
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                type: "string",
                message: "Please enter a valid password",
              },
            ]}
          >
            <Input.Password placeholder="Enter Password" size="large" />
          </Form.Item>
        </Flex>
        <Flex justify="center">
          <Form.Item layout="horizontal" style={{ width: "50%" }}>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Sign Up
            </Button>
          </Form.Item>
        </Flex>
      </Form>
    </div>
  );
};
