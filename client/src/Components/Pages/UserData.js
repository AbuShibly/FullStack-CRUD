import React, { useState, useEffect } from "react";
import { Table, Container } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RiChatDeleteLine } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Assets/Styles/Nav.css";

function UserData() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const getData = async () => {
    const URL = "http://localhost:2000/get";
    await axios
      .get(URL)
      .then((res) => {
        // console.log(res.data);
        setUsers(res.data.result);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  const handleGotoUpdate = (user) => {
    navigate("/update", { state: user });
  };

  const handleDelete = async (_id) => {
    const URL = `http://localhost:2000/delete`;
    const config = {
      data: {
        id: _id,
      },
    };
    await axios
      .delete(URL, config)
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          toast.info(`${res.data.Message}`, {
            position: "top-right",
            type: "error",
            autoClose: 2000,
            closeOnClick: true,
            pauseOnHover: true,
            theme: "dark",
          });
        }
        setUsers(users.filter((user) => user._id !== _id));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Container className="my-5 d-flex justify-content-center align-items-center vh-100">
      <Table bordered>
        <thead>
          <tr className="text-center table-th-style">
            <th>Id</th>
            <th>Name</th>
            <th>Avatar</th>
            <th>Email</th>
            <th>Password</th>
            <th>Phone</th>
            <th>Update / Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id} className="table-tr-style">
              <td className="table-data">{index + 1}</td>
              <td className="table-data">{user.name}</td>
              <td className="text-center">
                <img
                  src={user.avatar}
                  alt="User-Img"
                  width={50}
                  className="rounded-circle"
                />
              </td>
              <td className="table-data">{user.email}</td>
              <td className="table-data">{user.password}</td>
              <td className="table-data">{user.phone}</td>
              <td className="d-flex justify-content-center align-items-center gap-4 p-4">
                <FiEdit
                  onClick={() => handleGotoUpdate(user)}
                  className="text-info fs-4 icon-hover"
                />
                <RiChatDeleteLine
                  onClick={() => handleDelete(user._id)}
                  className="text-danger fs-4 icon-hover"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ToastContainer />
    </Container>
  );
}

export default UserData;
