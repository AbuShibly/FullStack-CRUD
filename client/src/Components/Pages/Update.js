import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Assets/Styles/Nav.css";

const Update = () => {
  const navigate = useNavigate();

  const User = useLocation().state;
  console.log(User);

  const [name, setName] = useState(User?.name);
  const [email, setEmail] = useState(User?.email);
  const [password, setPassword] = useState(User?.password);
  const [phone, setPhone] = useState(User?.phone);
  const [avatar, setAvatar] = useState(User?.avatar);

  const formData = {
    id: User._id,
    name: name,
    email: email,
    password: password,
    phone: phone,
    avatar: avatar,
  };

  const putData = async (e) => {
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

    const URL = "http://localhost:2000/put";
    await axios
      .put(URL, formData)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          toast.info(`${res.data.Message}`, {
            position: "top-right",
            type: "info",
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
        console.log(err);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center my-5 p-5 vh-100">
      <Form className="shadow-lg p-5 rounded-3 background">
        <h3 className="text-center mb-4">Update</h3>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name :</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email :</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password :</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPhone">
          <Form.Label>Phone :</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Phone Number"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicAvatar">
          <Form.Label>Avatar :</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Avatar URL"
            onChange={(e) => setAvatar(e.target.value)}
            value={avatar}
          />
        </Form.Group>
        <div className="mt-4">
          <Button onClick={putData} variant="primary" type="submit">
            Update
          </Button>
        </div>
      </Form>
      <ToastContainer />
    </div>
  );
};

export default Update;
