import { RootState } from "@/store/store";
import React from "react";
import { BsSend } from "react-icons/bs";
import { GrDocumentUpload } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import {
  sendMessage,
  uploadFile,
  openPreview,
} from "@/features/message/messageSlice";

const MessageInput: React.FC = () => {
  const currentUser = useSelector((state: RootState) => state.user.user);
  const selectedConversation = useSelector(
    (state: RootState) => state.conversations.selectedConversation
  );
  const loadingMessages = useSelector(
    (state: RootState) => state.message.loadingMessages
  );
  const file = useSelector((state: RootState) => state.message.messageFile);
  const fileName = useSelector(
    (state: RootState) => state.message.messageFileName
  );
  const previewUrl = useSelector(
    (state: RootState) => state.message.previewUrl
  );
  const dispatch = useDispatch();
  const [message, setMessage] = React.useState("");
  const messageData = {
    message: message,
    senderId: currentUser?._id,
    senderModel: currentUser?.role,
    receiverModel: selectedConversation?.participants[0]?.role,
    receiverEmail: selectedConversation?.participants[0]?.email,
    file: file ? file : "",
    fileName: fileName ? fileName : "",
    previewUrl: previewUrl ? previewUrl : "",
  };

  const selectAndUploadDocuments = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    // Perform any validation you need
    const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
    const validDocumentTypes = ["application/pdf", "text/csv"];

    if (
      validImageTypes.includes(file.type) ||
      validDocumentTypes.includes(file.type)
    ) {
      // Handle file upload
      //@ts-ignore
      dispatch(uploadFile(formData));
      dispatch(openPreview());
    } else {
      // Handle unsupported file type
      console.error("Unsupported file type");
    }
  };

  // handle message sending
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      // @ts-ignore
      sendMessage({
        data: messageData,
        id: selectedConversation?.participants[0]._id,
      })
    );
    setMessage("");
  };

  return (
    <form
      className="px-4 my-3 flex flex-row items-center"
      onSubmit={handleSubmit}
    >
      <div className="p-3 mr-2 bg-yellow-50 rounded-full">
        <label htmlFor="uploadFile">
          <span className="flex items-center gap-2 cursor-pointer font-semibold">
            <GrDocumentUpload className="h-4 w-4 text-white" />
          </span>
        </label>
        <input
          type="file"
          id="uploadFile"
          name="file"
          className="custom-file-input hidden"
          accept="image/*,application/pdf,text/csv"
          onChange={selectAndUploadDocuments}
        />
      </div>
      <div className="w-full relative ">
        <input
          type="text"
          className=" text-lg rounded-lg block w-full p-2.5 bg-gray-200 border-2 border-gray-200 focus:border-yellow-50 focus:outline-none focus:ring-0 "
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center p-2 mx-2 my-2 bg-yellow-50 rounded-full"
          disabled={!message && !file}
        >
          {loadingMessages ? (
            <div className="w-5 h-5 border-t-2 border-b-2 border-yellow-900 rounded-full animate-spin"></div>
          ) : (
            <BsSend className="h-5 w-5 text-white" />
          )}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
