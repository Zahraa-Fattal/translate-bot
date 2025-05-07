import React from "react";
import AuthForm from "../../components/form/form";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
export default function Login() {
  const { darkMode } = useTheme();
  const handleSubmit = (values) => {
    console.log("Login submitted:", values);
  };

  return (
    <div
      className={`${
        darkMode ? "bg-black" : "bg-white"
      } w-full min-h-screen flex flex-col items-center justify-center`}
    >
      <AuthForm
        title="Sign Up"
        subtitle="Welcome Back To AMAIZO"
        onSubmit={handleSubmit}
        submitButtonText="Create your free account"
        socialLogin={true}
        signup={true}
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
          {
            name: "confirm_password",
            label: "confirm password",
            type: "password",
            placeholder: "confirm password",
          },
        ]}
        initialValues={{
          email: "",
          password: "",
          confirm_password: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),

          password: Yup.string()
            .min(8, "Must be at least 8 characters")
            .required("Required"),
          confirm_password: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Required"),
        })}
      />
      <div
        className={`flex items-center ${
          darkMode ? "text-[#FDFEFF]" : "text-black"
        } text-[15px]`}
      >
        <p>Already have an account?</p>
        <Link to="/login" className="underline ">
          Log In
        </Link>
      </div>
    </div>
  );
}
