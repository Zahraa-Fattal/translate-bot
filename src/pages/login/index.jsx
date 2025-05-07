import React from "react";
import AuthForm from "../../components/form/form";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import { showSuccess, showError } from "../../lib/react.toastify";
export default function Login() {
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      console.log("Login submitted:", values);

      const isValidUser = await authenticateUser(values.email, values.password);

      if (isValidUser) {
        navigate("/chat");
        showSuccess({ message: "Login successful" });
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error) {
      showError({ message: "Login failed" });
      console.error("Login error:", error);
      throw error;
    }
  };

  const authenticateUser = async (email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const validUsers = [
          { email: "user@example.com", password: "password123" },
        ];

        const isValid = validUsers.some(
          (user) => user.email === email && user.password === password
        );
        resolve(isValid);
      }, 500);
    });
  };

  return (
    <div
      className={`${
        darkMode ? "bg-black" : "bg-white"
      } w-full min-h-screen flex flex-col items-center justify-center`}
    >
      <AuthForm
        title="Log In"
        subtitle="Welcome Back To AMAIZO"
        onSubmit={handleSubmit}
        submitButtonText="Log In"
        socialLogin={true}
        login={true}
        fields={[
          {
            name: "email",
            label: "Email Address",
            type: "email",
            placeholder: "Email",
          },
          {
            name: "password",
            label: "Password",
            type: "password",
            placeholder: "Password",
          },
        ]}
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          password: Yup.string()
            .min(8, "Must be at least 8 characters")
            .required("Required"),
        })}
      />
      <div
        className={`flex items-center ${
          darkMode ? "text-[#FDFEFF]" : "text-black"
        } text-[15px]`}
      >
        <p>Don't have an account?</p>
        <Link to="/register" className="underline">
          Sign Up
        </Link>
      </div>
    </div>
  );
}
