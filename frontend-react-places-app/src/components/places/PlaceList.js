import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import PlaceItem from "./PlaceItem";
import { useSelector } from "react-redux";
import Model from "../Model";

const PlaceList = () => {
  const [places, setPlace] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const navigate = useNavigate();
  const [id, setItemId] = useState("");
  const token = useSelector((state) => state.userToken);
  const param = useParams();
  // const [spinner, setSpinner] = useState(true);
  useEffect(() => {
    const fetchPlaces = async () => {
      await axios
        .get(`http://127.0.0.1:8000/api/user/${param.userId}`)
        .then(({ data }) => {
          setPlace(data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    };
    fetchPlaces();
  }, [param.userId]);

  const closeHandler = () => {
    setShowModel(false);
  };

  const showHandler = () => {
    setShowModel(true);
  };

  const deleteHandler = async (e, id) => {
    e.preventDefault();
    await axios
      .delete(`http://127.0.0.1:8000/api/places/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
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
    <div>
      {showModel && (
        <Model
          closeHandler={closeHandler}
          submitHandler={(e) => deleteHandler(e, id)}
        />
      )}
      {places.length > 0 ? (
        places.map((place, index) => {
          return (
            <li
              className="row justify-content-center my-5"
              onClick={() => setItemId(place.id)}
            >
              <PlaceItem
                key={Math.random() * 1000000}
                id={place.id}
                title={place.title}
                description={place.description}
                image={place.image}
                token={token}
                showHandler={showHandler}
              />
            </li>
          );
        })
      ) : (
        <li className="row justify-content-center p-5 m-5 fw-bold lead border rounded-pill">
          No places yet! maybe post some?
        </li>
      )}
    </div>
  );
};

export default PlaceList;
