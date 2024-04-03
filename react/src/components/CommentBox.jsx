import { Button, Textarea } from "@material-tailwind/react";
import { useState } from "react";

export function CommentBox({ onSend, updateFile }) {
  const [message, setMessage] = useState("");

  return (
    <div className="relative w-full">
      <Textarea
        variant="static"
        placeholder="Your Comment"
        rows={8}
        value={message}
        className="dark:text-white dark:border-gray-500 rounded-t-lg border-b-0 border"
        resize={false}        
        onChange={(e) => setMessage(e.target.value)}
      />
      <div className="h-7 rounded-b-lg dark:bg-gray-600 bg-gray-200 -mt-1.5 relative border-gray-500 border-2">
        <div className="relative -top-5 left-2 ">
          <input
            type="file"
            id="fileInput"
            onChange={(e)=>updateFile(e.target.files[0])}
            style={{ display: "none" }}
          />
          <label htmlFor="fileInput" className="mt-1 ms-3 right-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5 dark:text-white cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          </label>
        </div>
      </div>
      <div className="flex w-full justify-end py-1.5">
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={() => setMessage("")}
            className="rounded-md dark:border-red-700 border-2 dark:text-red-700 justify-end bg-gray-800"
          >
            Cancelar
          </Button>
          <Button
            size="sm"
            className="rounded-md dark:bg-purple-700 dark:hover:bg-purple-600 justify-end bg-blue-600 hover:bg-blue-500"
            onClick={() => {
              onSend(message);
              setMessage("");
            }}
          >
            Post Comment
          </Button>
        </div>
      </div>
    </div>
  );
}
