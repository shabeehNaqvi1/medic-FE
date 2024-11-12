"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  getMessages,
  addNewMessage,
  openImagePreview,
  setPreviewUrl,
} from "@/features/message/messageSlice";
import { extractTime } from "../../lib/extractTime";
import io from "socket.io-client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { IoMdDownload } from "react-icons/io";
import Image from "next/image";

const Messages: React.FC = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state: RootState) => state.message.messages);
  const currentUser = useSelector((state: RootState) => state.user.user);
  const [scrollTop, setScrollTop] = React.useState<number>();
  const [page, setPage] = React.useState(1);
  const [socket, setSocket] = useState<any>(null);
  const { user } = useUser();
  const bodyData = {
    senderId: currentUser?._id,
  };
  const lastMessageRef = React.useRef<HTMLDivElement>(null);
  const selectedConversation = useSelector(
    (state: RootState) => state.conversations.selectedConversation
  );
  React.useEffect(() => {
    // Fetch messages
    dispatch(
      //@ts-ignore
      getMessages({
        data: bodyData,
        id: selectedConversation?.participants[0]._id,
      })
    );
  }, [selectedConversation]);

  React.useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  React.useEffect(() => {
    const socket = io(
      "https://medic-chat-back-end-dd14e4e2098a.herokuapp.com",
      {
        query: {
          email: user && user?.email,
        },
      }
    );
    setSocket(socket);
    socket.on("newMessage", (message: any) => {
      console.log("newMesaage", message);
      dispatch(addNewMessage(message));
    });

    return () => {
      socket?.off("newMessage");
    };
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto h-screen" id="chatContainer">
      {messages?.map((message: any) => (
        <div
          className={`chat ${
            message !== undefined && message?.senderId === currentUser._id
              ? "chat-end"
              : "chat-start"
          } px-4 py-3`}
          key={message !== undefined && message._id}
          ref={lastMessageRef}
        >
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src={
                  message !== undefined && message.senderId === currentUser?._id
                    ? currentUser?.profilePicture
                    : selectedConversation?.participants[0]?.profilePicture
                }
              />
            </div>
          </div>
          <div className="chat-bubble text-white pb-2 text-lg bg-yellow-500">
            {message?.message !== "" ? (
              message?.message
            ) : message?.file !== "" && !message.file.includes("pdf") ? (
              <div
                className="flex items-center justify-center max-w-[500px] max-h-[350px] overflow-hidden hover:cursor-pointer"
                onClick={() => {
                  dispatch(setPreviewUrl(message.file));
                  dispatch(openImagePreview());
                }}
              >
                <Image
                  src={message.file}
                  alt="file"
                  width={1920}
                  height={1080}
                  className="object-cover min-h-full min-w-full"
                />
              </div>
            ) : (
              <>
                <div className="flex flex-col">
                  {message.previewUrl && (
                    <div className="mt-[10px] flex items-center justify-center max-w-[350px] max-h-[150px] overflow-hidden">
                      <Image
                        src={message.previewUrl}
                        alt={message.fileName}
                        width={1920}
                        height={1080}
                        className="object-cover object-top min-h-full min-w-full border border-solid border-[#ddd] p-[5px] bg-[#fff]"
                      />
                    </div>
                  )}
                  <a
                    href={message !== undefined && message.file}
                    target="_blank"
                    download={message?.fileName}
                    rel="noreferrer"
                    className="text-white flex items-center gap-4 break-all py-4"
                  >
                    {message?.fileName || "Download File"}{" "}
                    <IoMdDownload className="text-xl" />
                  </a>
                </div>
              </>
            )}
          </div>
          <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
            <span>
              {extractTime(message !== undefined && message?.createdAt)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Messages;
