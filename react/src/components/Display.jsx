import { PropTypes } from "prop-types";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { addUser } from "../store/userSlice";
import Changename from "./ChangeName";

const Display = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [counter, setCounter] = useState(0);
  const countPor3 = useMemo(() => counter * 3, [counter]);

  const handleDispatch = async (e) => {
   setName(() => e.target.value);
    dispatch(
      addUser({
        name: e.target.value,
      })
    );
  };
  return (
    <>
      <header className="top-0 h-48 bg-gray-900 text-white">
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/display"}>dd</NavLink>
        <NavLink to={"/formulario"}>Form</NavLink>
      </header>
      <input onChange={handleDispatch} className="bg-blue-300" />

      <h1>
        Name: {user.name} {user.token}
      </h1>
      <NavLink to={"/"}>Home</NavLink>
      <button onClick={() => navigate("/")}>Redirect</button>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Changename name={name} callback={setCounter} />
      <p>
        Contador: {counter}, por 3 es {countPor3}
      </p>
    </>
  );
};

Display.propTypes = {
  cambio: PropTypes.func,
};

export default Display;
