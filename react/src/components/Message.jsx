import PropTypes from 'prop-types';
import { useSelector } from "react-redux";

import { baseUrl } from "../services/Service";
export default function Message({ message }) {
  const user = useSelector((state) => state.user);
  const fecha = new Date(message.createdAt);
  const format = {
    weekday: "short",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  const date = fecha.toLocaleDateString("es-ES", format);
  return (
    <>
      {message?.id && (
        <div className="flex items-start gap-2.5 mt-5 ">
          <img
            className="w-8 h-8 rounded-full shadow-sm shadow-black dark:shadow-purple-700"
            src={!message.user?.imgPath.includes("default.png") ? `${baseUrl}stream/img/user/${
              message.user?.imgPath}` : "https://thumbs.dreamstime.com/b/línea-icono-del-negro-avatar-perfil-de-usuario-121102131.jpg"}
            alt="Jese image"
          />
          <div className="flex flex-col gap-2.5 w-full leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700 relative">
            
            <div className="relative">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <span className="text-md font-semibold text-gray-900 dark:text-white">
                  {message.user?.name}
                  {user.id === message.user?.id && (
                    <span className="rounded-md ms-3 text-center py-1 px-4 dark:bg-purple-700 text-white bg-blue-500 w-16">
                      Tú
                    </span>
                  )}
                </span>
              </div>
              <span className="absolute top-0 right-0 text-sm font-normal text-gray-500 dark:text-gray-400 sm:block hidden">
                {date}
              </span>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse dark:text-gray-200">
              {message?.message}
            </div>
            {
              message.imgPath && (message.imgPath.includes(".mp4") ?<video  
              src={`${baseUrl}stream/img/chat/${message.imgPath}`}
              controls={true}
              width="100%"
              height="100%"
              className="rounded-lg"></video>:  <img className="w-52 h-48" src={`${baseUrl}stream/img/chat/${message.imgPath}`}/> )
            }
          </div>
        </div>
      )}
    </>
  );
}

Message.propTypes = {
    message: PropTypes.shape({
      id: PropTypes.number.isRequired,
      createdAt: PropTypes.string.isRequired,
      user: PropTypes.shape({
        name: PropTypes.string.isRequired,
        imgPath: PropTypes.string,
      }).isRequired,
      message: PropTypes.string.isRequired,
    }).isRequired,
  };