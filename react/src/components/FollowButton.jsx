import { Button } from '@material-tailwind/react';
import { debounce } from 'lodash';
import { PropTypes } from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToList, removeFromList } from "../store/userSlice";

export default function FollowButton({ serie }) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isInList, setIsInList] = useState(true);
  const [loading, setLoading] = useState(false);
  useEffect(
    () => setIsInList(user.series.find(item=>item.id === serie.id)),
    []
  );

  const addToStore = () => {
    dispatch(addToList(serie));
    setIsInList(true);
    setLoading(false)
  };
  const removeFromStore = () => {
    dispatch(removeFromList(serie));
    setIsInList(false);
    setLoading(false)
  };

  const add = debounce(addToStore,700)
  const remove = debounce(removeFromStore,700)
  return (
    <>
      {!isInList && (
        <Button
          onClick={()=>{
            setLoading(true)
            add()
          }}
          className="dark:text-purple-500 text-lg font-semibold dark:hover:text-purple-400 dark:hover:border-purple-400  dark:border-purple-500 text-blue-500 border-blue-500 hover:shadow-md dark:hover:shadow-purple-500 hover:shadow-blue-500  rounded-xl px-3 py-2 border-2 bg-transparent"
          color=''
        >
          {!loading ? <i className="bi bi-suit-heart-fill me-3"></i> : <i className="fa-solid fa-spinner fa-spin me-3"></i>}Seguir
        </Button>
      )}
      {isInList && (
        <Button
          onClick={()=>{
            setLoading(true);
            remove()
          }}
          className="dark:text-purple-500 text-lg font-semibold dark:hover:text-purple-400 dark:hover:border-purple-400  dark:border-purple-500 hover:shadow-blue-500 text-blue-500 border-blue-500 hover:shadow-md dark:hover:shadow-purple-500  rounded-xl px-3 py-2 border-2 bg-transparent"
        >
          {!loading ? <i className="fa-solid fa-heart-crack me-3"></i>: <i className="fa-solid fa-spinner fa-spin me-3"></i>}Eliminar
        </Button>
      )}
    </>
  );
}

FollowButton.propTypes = {
  serie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    episodes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        duration: PropTypes.number.isRequired,
        thumbnail: PropTypes.string,
      })
    ),
  }).isRequired,
};
