import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
const defaultValues = {
  title: "",
  description: "",
  image: null,
};

const Edit = () => {
  const [formValues, setFormValues] = useState(defaultValues);
  const userToken = useSelector((state) => state.userToken);
  const navigate = useNavigate();
  const param = useParams();
  useEffect(() => {
    const fetchPlace = async () => {
      await axios
        .get(`http://127.0.0.1:8000/api/places/${param.placeId}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then(({ data }) => {
          setFormValues((pre) => ({
            ...pre,
            title: data.place.title,
            description: data.place.description,
            image: data.place.image,
          }));
        })
        .catch((error) => {
          console.log(error.message);
        });
    };
    fetchPlace();
  }, [param.placeId]);
  const inputHandler = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormValues((prev) => ({ ...prev, [name]: files[0] }));
    } else setFormValues((prev) => ({ ...prev, [name]: value }));
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("_method", "PATCH");
    formData.append("title", formValues.title);
    formData.append("description", formValues.description);
    if (formValues.image !== null) {
      formData.append("image", formValues.image);
    }
    await axios
      .post(`http://127.0.0.1:8000/api/places/${param.placeId}`, formData, {
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
        <Form.Label>Edit Place</Form.Label>
        <hr />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Title:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter title"
          name="title"
          onChange={inputHandler}
          value={formValues.title}
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
          value={formValues.description}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Image:</Form.Label>
        <Form.Control type="file" name="image" onChange={inputHandler} />
        <img
          src={`http://127.0.0.1:8000/storage/${formValues.image}`}
          alt={formValues.title}
          width="150px"
          className="my-3"
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default Edit;
