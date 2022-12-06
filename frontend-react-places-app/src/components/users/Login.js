import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { authActions } from "../store";
const defaultValues = {
  email: "",
  password: "",
};
const Login = () => {
  const [formValues, setFormValues] = useState(defaultValues);
  const [error, setError] = useState(defaultValues);
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };
  const errorHandler = () => {
    setError((prev) => ({
      ...prev,
      email:
        formValues.email === "" ? "Please fill out the missing fields" : "",
      password:
        formValues.password === "" ? "Please fill out the missing fields" : "",
    }));
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    errorHandler();
    const { email, password } = formValues;

    if ((email === "") | (password === "")) {
      return;
    }
    const formData = new FormData();
    formData.append("email", formValues.email);
    formData.append("password", formValues.password);
    await axios
      .post("http://127.0.0.1:8000/api/user/login", formData, {
        withCredentials: true,
      })
      .then(({ data }) => {
        console.log(data);
        if (!data.error) {
          dispatch(authActions.logIN(data));
          navigation("/");
        } else {
          setError((prev) => ({
            ...prev,
            email: data.error,
          }));
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <Form
      className="col-md-6 shadow-lg p-5  my-5 rounded mx-auto"
      onSubmit={submitHandler}
    >
      <Form.Group className="mb-3 text-center fw-bold fs-5">
        <Form.Label>Login</Form.Label>
        <hr />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          name="email"
          onChange={inputHandler}
        />
        {error.email && (
          <Form.Label className=" text-danger">{error.email}</Form.Label>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          name="password"
          onChange={inputHandler}
        />
        {error.password && (
          <Form.Label className=" text-danger">{error.password}</Form.Label>
        )}
      </Form.Group>
      <Form.Group className="mb-3">
        <Link to="/signup" className="float-end">
          Don't have an account? maybe create one!
        </Link>
      </Form.Group>
      <br />
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default Login;
