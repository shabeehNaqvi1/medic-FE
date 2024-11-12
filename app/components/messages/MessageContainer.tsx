import React, { useState, useEffect } from "react";
import Messages from "./Messages";
import MessageInput from "../../components/messages/MessageInput";
import Image from "next/image";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { closeChat } from "@/features/conversations/conversationSlice";
import { RootState } from "@/store/store";
import { IoMdClose } from "react-icons/io";
import {
  closeImagePreview,
  closePreview,
  emptyFile,
  emptyPreviewUrl,
  sendMessage,
} from "@/features/message/messageSlice";
import Loading from "../Loading";
import { BsSend } from "react-icons/bs";
import Timer from "./Timer";
import io from "socket.io-client";

const MessageContainer: React.FC = () => {
  const selectedConversation = useSelector(
    (state: RootState) => state.conversations.selectedConversation
  );
  const currentUser = useSelector((state: RootState) => state.user.user);
  const file = useSelector((state: RootState) => state.message.messageFile);
  const onlineUsers = useSelector((state: RootState) => state.user.onlineUsers);
  const isOnline = onlineUsers?.includes(
    selectedConversation.participants[0].email
  );
  const isPreviewOpen = useSelector(
    (state: RootState) => state.message.isPreviewOpen
  );
  const isImagePreviewOpen = useSelector(
    (state: RootState) => state.message.isImagePreviewOpen
  );
  const previewUrl = useSelector(
    (state: RootState) => state.message.previewUrl
  );
  const image = useSelector((state: RootState) => state.message.image);
  const loadingImage = useSelector(
    (state: RootState) => state.message.loadingImageFile
  );
  const loadingMessages = useSelector(
    (state: RootState) => state.message.loadingMessages
  );
  const fileName = useSelector(
    (state: RootState) => state.message.messageFileName
  );
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);

  const messageData = {
    message: "",
    senderId: currentUser?._id,
    senderModel: currentUser?.role,
    receiverModel: selectedConversation?.participants[0]?.role,
    receiverEmail: selectedConversation?.participants[0]?.email,
    file: file ? file : "",
    fileName: fileName ? fileName : "",
    previewUrl: previewUrl ? previewUrl : "",
  };

  useEffect(() => {
    const socket = io(
      "https://medic-chat-back-end-dd14e4e2098a.herokuapp.com"
    );
    setSocket(socket);

    return () => {
      socket.close();
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      // @ts-ignore
      sendMessage({
        data: messageData,
        id: selectedConversation?.participants[0]._id,
      })
    );
    dispatch(emptyPreviewUrl());
    dispatch(closePreview());

    // Start the timer on the first message
    if (selectedConversation.messages.length === 1) {
      socket.emit("startTimer", { conversationId: selectedConversation._id });
    }
  };

  useEffect(() => {
    if (selectedConversation.messages.length > 1) {
      socket?.emit("closeTimer", { conversationId: selectedConversation._id });
    }
  }, [selectedConversation, socket]);

  return (
    <div className="flex flex-col w-full bg-gray-200 h-full relative">
      <div className="bg-gray-100 px-4 py-3 mb-2 flex items-center">
        <button
          className="md:hidden text-yellow-50 mr-4"
          onClick={() => dispatch(closeChat())}
        >
          <IoMdArrowRoundBack className="w-7 h-7" />
        </button>
        <span className="text-gray-900 text-lg font-sans font-bold flex flex-row gap-4 items-center relative">
          <div className="relative w-12 h-12">
            <Image
              src={selectedConversation?.participants[0]?.profilePicture}
              width={50}
              height={50}
              alt="user avatar"
              className="rounded-full w-12 h-12 bg-cover"
            />
            {isOnline ? (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
            ) : (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>
            )}
          </div>
          <span className="font-normal">{`${
            selectedConversation?.participants[0]?.role === "Doctor"
              ? `DR. ${`${selectedConversation?.participants[0]?.firstName} ${selectedConversation?.participants[0]?.lastName}`}`
              : selectedConversation?.participants[0]?.firstName === undefined &&
                selectedConversation?.participants[0]?.lastName === undefined
              ? selectedConversation?.participants[0]?.email
              : `${`${selectedConversation?.participants[0]?.firstName} ${selectedConversation?.participants[0]?.lastName}`}`
          }`}</span>
          {selectedConversation?.isConversationActive ? (
            <>
              {selectedConversation?.messages.length > 0 &&
                currentUser?.role === "Doctor" && (
                  <Timer conversationId={selectedConversation._id} />
                )}
            </>
          ) : (
            ""
          )}
        </span>
      </div>
      <Messages />
      <div className="bg-gray-100">
        <MessageInput />
      </div>
      {isPreviewOpen || isImagePreviewOpen ? (
        <div className="absolute flex items-center justify-center flex-col top-0 left-0 w-full h-full bg-black/70">
          {loadingImage || previewUrl === "" ? (
            <>
              <Loading />
            </>
          ) : (
            <>
              <div className="w-11/12 h-4/6 md:h-5/6 bg-white p-4 m-auto rounded-lg flex items-center justify-center overflow-hidden">
                <button
                  className="absolute top-4 right-4"
                  onClick={() => {
                    dispatch(closePreview());
                    dispatch(emptyPreviewUrl());
                    dispatch(closeImagePreview());
                    dispatch(emptyFile());
                  }}
                >
                  <IoMdClose className="w-6 h-6 text-white" />
                </button>
                <div className="flex flex-col gap-4 w-full h-full items-center justify-center">
                  <div className="relative w-full h-full">
                    <Image
                      src={previewUrl}
                      alt={fileName || "image"}
                      layout="fill"
                      objectFit="contain"
                      className="rounded-lg"
                    />
                  </div>
                  {isPreviewOpen && (
                    <div className="flex gap-2 items-center justify-center">
                      <span className="text-lg font-bold">{fileName}</span>
                      <button
                        onClick={handleSubmit}
                        className="flex items-center p-2 mx-2 my-2 bg-yellow-50 rounded-full"
                      >
                        {loadingMessages ? (
                          <div className="w-5 h-5 border-t-2 border-b-2 border-yellow-900 rounded-full animate-spin"></div>
                        ) : (
                          <BsSend className="h-5 w-5 text-white" />
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default MessageContainer;
