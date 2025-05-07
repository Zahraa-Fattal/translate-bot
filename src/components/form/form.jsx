import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import google from "../../assets/google.png";
import apple from "../../assets/apple.png";

const AuthForm = ({
  title,
  subtitle,
  onSubmit,
  socialLogin,

  fields,
  initialValues,
  validationSchema,
  submitButtonText,
  signup,
  login,
}) => {
  return (
    <div className="relative w-full max-w-lg h-[618px] rounded-[26px] p-[2px]">
      <div
        className="absolute inset-0 rounded-[26px] p-[2px] bg-gradient-to-br from-[#0379FF] via-[#B74BDD] to-[#FF805F] pointer-events-none"
        style={{
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      ></div>

      <div
        className="w-full h-full rounded-[25px] flex flex-col justify-center p-8"
        style={{
          background: `
             linear-gradient(
              135deg,
              rgba(3, 121, 255, 0.15) 0%,
              rgba(183, 75, 221, 0.15) 50%,
              rgba(255, 128, 95, 0.15) 100%
            ),
            linear-gradient(
              to bottom right,
              rgba(3, 121, 255, 0.1) 0%,
              rgba(183, 75, 221, 0.1) 50%,
              rgba(255, 128, 95, 0.1) 100%
            ),
            #000000
          `,
        }}
      >
        <div className="flex justify-center mb-4">
          <img src={Logo} alt="Logo" className="w-[228px] h-[63px]" />
        </div>

        <div className="text-center mb-6">
          <h2 className="text-[32px] font-semibold text-white mb-2">{title}</h2>
          {subtitle && <p className="text-[15px] text-[#FFFFFF]">{subtitle}</p>}
        </div>

        {socialLogin && (
          <div className="space-y-3 mb-4 ">
            <button className="w-full flex items-center justify-center gap-3 py-2.5 border border-[#FFFFFF] rounded-full  hover:bg-gray-900 text-[#FDFEFF] text-[15px]">
              <img src={google} alt="Google" className="h-[20px] w-[20px]" />
              <span>Sign Up With Google</span>
            </button>
            <button className="w-full flex items-center justify-center gap-3 py-2.5 border border-[#FFFFFF] rounded-full  hover:bg-gray-900 text-[#FDFEFF] text-[15px]">
              <img src={apple} alt="Apple" className="h-[20px] w-[20px]" />
              <span>Sign Up With Apple</span>
            </button>
            <button className="w-full py-2.5 border border-[#FFFFFF] rounded-full  hover:bg-gray-900 text-[#FDFEFF] text-[15px]">
              Sign up with Single Sign-On
            </button>
          </div>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-3 mt-6">
              {fields.map((field) => (
                <div key={field.name} className="space-y-1 ">
                  <Field
                    type={field.type || "text"}
                    name={field.name}
                    id={field.name}
                    placeholder={field.placeholder || field.label}
                    className="w-full px-4 py-2.5 text-sm border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-[#7C7979]"
                  />
                  <ErrorMessage
                    name={field.name}
                    component="div"
                    className="text-red-400 text-sm"
                  />
                </div>
              ))}
              {login && (
                <div className="flex justify-center items-center ">
                  <Link to="/" className="text-[15px] text-[#8C8787] mb-2 ">
                    Forgot password?
                  </Link>
                </div>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#FF9478] text-white py-2.5 rounded-md hover:bg-opacity-90 transition duration-200 text-sm font-semibold"
              >
                {isSubmitting ? "Processing..." : submitButtonText}
              </button>
            </Form>
          )}
        </Formik>

        {signup && (
          <>
            <p className="text-center text-gray-500 text-xs mt-3">
              By Signing Up You Agree To Our{" "}
              <span className=" underline">Terms Of Service</span>.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
