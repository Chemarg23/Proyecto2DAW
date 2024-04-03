import { Button } from "@material-tailwind/react";
import { PropTypes } from "prop-types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ChatService from "../services/ChatService";
import { CommentBox } from "./CommentBox";
import Message from "./Message";

export default function ChatRoom({ room }) {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [show, setShow] = useState(false);
  const [file, setFile] = useState();
  const service = new ChatService();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const newSocket = new WebSocket(`ws://localhost:8080/chat/${room}`);
    setSocket(newSocket);
    service
      .get(room, page)
      .then((response) => {
        response.data.length > 4 && setShow(true);
        setMessages((prev) => [prev, ...response.data]);
        setPage(page + 1);
      })
      .catch(() => newSocket.close());
    return () => {
      newSocket.close();
    };
  }, []);

  const sendMessage = async (text) => {
    if (text) {
      if(file){
      const response = await service.saveImg(file)
      const data = JSON.stringify({
        user: { id: user.id },
        message: text,
        room: room,
        imgPath: response.data
      })
      socket.send(data);
    }else{
      const data = JSON.stringify({
        user: { id: user.id },
        message: text,
        room: room
      })
      socket.send(data);}
    }
  };

  const loadMore = () => {
    service.get(room, page).then((response) => {
      response.data.length < 5 && setShow(false);
      setMessages((prev) => [...prev, ...response.data]);
      setPage(page + 1);
    });
  };

  useEffect(() => {
  if (socket) {

    socket.onmessage = async (e) => {
      const jsonMessage = JSON.parse(e.data);      
      setMessages((messages) => [jsonMessage, ...messages]);
    };

    socket.onerror = (error) => {
      console.error("Error:", error);
    };

    socket.onclose = (event) => {
      console.log("Conexión cerrada:", event.code, event.reason);
    };
  }
}, [socket, file]);


  
  return (
    <>
      <h1 className="dark:text-white text-5xl font-bold">Chat a tiempo real</h1>
      <hr className="my-5" />
      <p className="dark:text-white text-xl font-bold">
        Deje su comentario, {user.name}
      </p>
      <CommentBox onSend={sendMessage} updateFile={setFile} />

      {messages.map((message, index) => (
        <div key={index}>
          <Message message={message} />
        </div>
      ))}
      <div className="mb-5">
        {show ? (
          <Button
            className="dark:bg-purple-700 dark:hover:bg-purple-600 rounded-lg px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white w-[95%] mt-5 ms-10"
            onClick={loadMore}
          >
            Cargar más
          </Button>
        ) : (
          <div className="dark:text-white text-center text-lg font-semibold mt-5">
            No quedan más comentarios en esta sala
          </div>
        )}
      </div>
    </>
  );
}

ChatRoom.propTypes = {
  room: PropTypes.number.isRequired,
};
