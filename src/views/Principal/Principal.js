import "./Principal.css";
import { imgauth } from "../../assets";

function Principal() {
  return (
    <div className="container-fluid">
      <div className="background-img-principal">
        <img className="img-main" src={imgauth} alt="logo de imgauth" />
      </div>
    </div>
  );
}

export default Principal;