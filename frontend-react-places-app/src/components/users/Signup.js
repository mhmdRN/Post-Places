import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
const defaultValues = {
  name: "",
  email: "",
  password: "",
  confirm_password: "",
};
const Signup = () => {
  const [formValues, setFormValues] = useState(defaultValues);
  const [error, setError] = useState(defaultValues);
  const navigation = useNavigate();
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };
  const errorHandler = () => {
    setError((prev) => ({
      ...prev,
      name: formValues.name === "" ? "Please fill out the missing fields" : "",
      email:
        formValues.email === "" ? "Please fill out the missing fields" : "",
      password:
        formValues.password === "" ? "Please fill out the missing fields" : "",
      confirm_password:
        formValues.confirm_password === ""
          ? "Please fill out the missing fields"
          : "",
    }));
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    errorHandler();
    const { name, email, password, confirm_password } = formValues;
    if (password !== confirm_password) {
      setError((prev) => ({
        ...prev,
        confirm_password: "Passwords don't match",
      }));
      return;
    }
    if (
      (name === "") |
      (email === "") |
      (password === "") |
      (confirm_password === "")
    ) {
      return;
    }
    const formData = new FormData();
    formData.append("name", formValues.name);
    formData.append("email", formValues.email);
    formData.append("password", formValues.password);
    await axios
      .post("http://127.0.0.1:8000/api/user/store", formData)
      .then(({ data }) => {
        navigation("/login");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <Form
      className="col-md-6 shadow-lg p-5 my-2 rounded mx-auto"
      onSubmit={submitHandler}
    >
      <Form.Group className="mb-3 text-center fw-bold fs-5">
        <Form.Label>Signup</Form.Label>
        <hr />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Name:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          name="name"
          onChange={inputHandler}
        />
        {error.name && (
          <Form.Label className=" text-danger">{error.name}</Form.Label>
        )}
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
        <Form.Label>Confirm Password:</Form.Label>
        <Form.Control
          type="password"
          placeholder="Retype password"
          name="confirm_password"
          onChange={inputHandler}
        />
        {error.confirm_password && (
          <Form.Label className=" text-danger">
            {error.confirm_password}
          </Form.Label>
        )}
      </Form.Group>
      <Form.Group className="mb-3">
        <Link to="/Login" className="float-end">
          Already have an account?
        </Link>
      </Form.Group>
      <br />
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default Signup;
