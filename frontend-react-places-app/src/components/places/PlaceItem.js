import Card from "react-bootstrap/Card";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import { useEffect, useState } from "react";

const PlaceItem = (props) => {
  const userId = useSelector((state) => state.userId);

  const [id, setId] = useState("");

  useEffect(() => {
    const getUserId = async () => {
      await axios
        .get(`http://127.0.0.1:8000/api/places/${props.id}`, {
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
        })
        .then(({ data }) => {
          setId(data.place.userId);
        })
        .catch((error) => {
          console.log(error.message);
        });
    };
    getUserId();
  }, [props.id]);
  return (
    <>
      <Card className="col-6 text-center text-white p-3 bg-dark">
        <img
          src={`http://127.0.0.1:8000/storage/${props.image}`}
          alt={props.title}
          width="100%"
          className="mx-auto"
        />
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>{props.description}</Card.Text>

          {userId === id ? (
            <div className="float-end">
              <Link
                to={`/place/edit/${props.id}`}
                className="btn btn-primary me-2"
              >
                Edit
              </Link>
              <Link
                to=""
                className="btn btn-danger"
                onClick={props.showHandler}
              >
                Delete
              </Link>
            </div>
          ) : (
            ""
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default PlaceItem;
