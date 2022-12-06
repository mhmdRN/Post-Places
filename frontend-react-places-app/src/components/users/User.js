import Badge from "react-bootstrap/Badge";
const User = (props) => {
  return (
    <div className="col-6 shadow-lg mx-auto my-3 rounded-pill">
      <div className="h3">{props.name}</div>
      <div className="h4 m-3 pb-3">
        <Badge bg="primary">{props.totalPlaces}</Badge>
        <span className="mx-2">
          {props.totalPlaces > 1 ? "Places" : "Place"}
        </span>
      </div>
    </div>
  );
};

export default User;
