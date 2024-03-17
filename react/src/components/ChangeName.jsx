import { PropTypes } from "prop-types";
export default function Changename({ name, callback }) {
  return (
    <>
      <div>{name}</div>
      <button onClick={() => callback((c) => c + 1)}>Count</button>
    </>
  );
}

Changename.propTypes = {
  name: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
};
