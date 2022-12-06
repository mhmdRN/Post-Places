import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useSelector } from "react-redux";
const defaultValues = {
  title: "",
  description: "",
  image: null,
};
const Create = () => {
  const [formValues, setFormValues] = useState(defaultValues);
  const userToken = useSelector((state) => state.userToken);
  const navigate = useNavigate();
  const inputHandler = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormValues((prev) => ({ ...prev, [name]: files[0] }));
    } else setFormValues((prev) => ({ ...prev, [name]: value }));
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", formValues.title);
    formData.append("description", formValues.description);
    formData.append("image", formValues.image);

    await axios
      .post("http://127.0.0.1:8000/api/places", formData, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then(({ data }) => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <Form
      className="container shadow-lg p-5 my-5 rounded"
      onSubmit={submitHandler}
    >
      <Form.Group className="mb-3 text-center fw-bold fs-5">
        <Form.Label>Create Place</Form.Label>
        <hr />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Title:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter title"
          name="title"
          onChange={inputHandler}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description:</Form.Label>
        <textarea
          rows={4}
          className="form-control"
          placeholder="Enter description"
          name="description"
          onChange={inputHandler}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Image:</Form.Label>
        <Form.Control type="file" name="image" onChange={inputHandler} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default Create;
