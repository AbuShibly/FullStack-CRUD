import React, { useState } from "react";
import { Button, Form, FloatingLabel } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Assets/Styles/Nav.css";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState("");

  const formData = {
    name: name,
    email: email,
    password: password,
    phone: phone,
    avatar: avatar,
  };

  // console.log(formData);

  const postData = async (e) => {
    e.preventDefault();

    if (!name || !email || !phone || !password || !avatar) {
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

    if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-z]+$/.test(email)) {
      toast.info("Enter Valid Email", {
        position: "top-center",
        type: "warning",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "dark",
      });
      return;
    }

    if (phone.length < 5 || phone.length > 15) {
      toast.info("Number Must Be Between 5 to 15 Digits", {
        position: "top-center",
        type: "warning",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "dark",
      });
      return;
    }

    if (!/^[0-9]+$/.test(phone)) {
      toast.info("Enter Valid Phone Number", {
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
        autoClose: 2000,
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
        autoClose: 2000,
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
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "dark",
      });
      return;
    }

    const URL = "http://localhost:2000/post";
    await axios
      .post(URL, formData)
      .then((res) => {
        // console.log(res.data.Message);
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
        if (err.response.data.Message) {
          toast.info(`${err.response.data.Message}`, {
            position: "top-center",
            type: "warning",
            autoClose: 2000,
            closeOnClick: true,
            pauseOnHover: true,
            theme: "dark",
          });
        }
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center my-5 p-5 vh-100">
      <Form className="shadow-lg p-5 rounded-3 background">
        <h3 className="text-center mb-4">Register</h3>
        <FloatingLabel
          controlId="floatingInput"
          label="Enter Name :"
          className="mb-4"
        >
          <Form.Control
            type="text"
            placeholder="Enter Name"
            onChange={(e) => setName(e.target.value)}
          />
        </FloatingLabel>

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
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingInput"
          label="Enter Phone :"
          className="mb-4"
        >
          <Form.Control
            type="number"
            placeholder="Enter Phone Number"
            onChange={(e) => setPhone(e.target.value)}
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingInput"
          label="Enter Avatar Url"
          className="mb-4"
        >
          <Form.Control
            type="text"
            placeholder="Enter Avatar Url"
            onChange={(e) => setAvatar(e.target.value)}
          />
        </FloatingLabel>

        <div className="mt-4 d-flex flex-column gap-3">
          <Button onClick={postData} variant="success" type="submit">
            Submit
          </Button>
          <p>
            Already a User? <a href="/">LogIn</a>
          </p>
        </div>
      </Form>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
