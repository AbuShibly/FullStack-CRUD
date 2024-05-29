import React, { useState } from "react";
import { Button, Form, FloatingLabel } from "react-bootstrap";
import axios from "axios";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Assets/Styles/Nav.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const formData = {
    email: email,
    password: password,
  };

  const loginData = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.info("Please Fill All Fields", {
        position: "top-center",
        type: "warning",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "dark",
      });
      return;
    }
    if (password.length < 8) {
      toast.info("Password Must Be 8 Character Long", {
        position: "top-center",
        type: "warning",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "dark",
      });
      return;
    }

    if (!/[A-Z]/.test(password)) {
      toast.info("Password Must Include At Least One Uppercase Letter", {
        position: "top-center",
        type: "warning",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "dark",
      });
      return;
    }

    if (!/[a-z]/.test(password)) {
      toast.info("Password Must Include At Least One Lowercase Letter", {
        position: "top-center",
        type: "warning",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "dark",
      });
      return;
    }

    if (!/[0-9]/.test(password)) {
      toast.info("Password Must Include At Least One Number", {
        position: "top-center",
        type: "warning",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "dark",
      });
      return;
    }

    const URL = "http://localhost:2000/login";
    await axios
      .post(URL, formData)
      .then((res) => {
        console.log(res.data.return);
        const userData = res?.data?.return;
        localStorage.setItem("userData", JSON.stringify(userData));
        const event = new Event("userDataChanged");
        window.dispatchEvent(event);
        if (res.status === 200) {
          toast.info(`${res.data.Message}`, {
            position: "top-right",
            type: "success",
            autoClose: 2000,
            closeOnClick: true,
            pauseOnHover: true,
            theme: "dark",
          });
          setTimeout(() => {
            navigate("/home");
          }, 3000);
        }
      })
      .catch((err) => {
        const error = err?.response?.data?.Message;
        console.log(error);
        if (error) {
          toast.info(`${error}`, {
            position: "top-center",
            type: "warning",
            autoClose: 3000,
            closeOnClick: true,
            pauseOnHover: true,
            theme: "dark",
          });
        }
      });
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="d-flex justify-content-center align-items-center p-5 vh-100">
      <Form className="shadow-lg p-5 rounded-3 background">
        <h3 className="text-center mb-4">Login</h3>

        <FloatingLabel
          controlId="floatingInput"
          label="Enter Email :"
          className="mb-4"
        >
          <Form.Control
            type="email"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingInput"
          label="Enter Password :"
          className="mb-4"
        >
          <Form.Control
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <span onClick={handleShowPassword} className="Eye-icon">
            {showPassword ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
          </span>
        </FloatingLabel>
        <div className="mt-4 d-flex flex-column gap-3">
          <Button onClick={loginData} variant="success" type="submit">
            Login
          </Button>
          <p>
            Not Yet Registered? <a href="/signup">SignUp</a>
          </p>
        </div>
      </Form>
      <ToastContainer />
    </div>
  );
};

export default Login;
