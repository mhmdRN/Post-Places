import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import User from "./User";
const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      await axios
        .get("http://127.0.0.1:8000/api/users")
        .then(({ data }) => {
          setUsers(data.places);
        })
        .catch((error) => {
          console.log(error.message);
        });
    };
    fetchUsers();
  }, []);
  return (
    <ul className="list-group text-center my-3">
      {users &&
        users.map((user, key) => {
          return (
            <Link to={`/places/${user.id}`} key={key} className="nav-link">
              {<User name={user.name} totalPlaces={user.places} />}
            </Link>
          );
        })}
    </ul>
  );
};

export default UserList;
