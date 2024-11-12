import React from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { getConversationsCurrentUser } from "@/features/conversations/conversationSlice";
import { selectConversation } from "@/features/conversations/conversationSlice";


const Conversation: React.FC= () => {
  const currentUser = useSelector((state : RootState) => state.user.user);
  const currentUserConversations = useSelector((state : RootState) => state.conversations.conversations);
  const isOnline = true; // Change this based on the actual status
  const dispatch = useDispatch();

  React.useEffect(() => {
    // Fetch user conversations
    //@ts-ignore
    dispatch(getConversationsCurrentUser({ currentUser: currentUser?._id }));
  }, [currentUser]);

  return (
    <>
      {currentUserConversations.map((conversation : any) => {
        return (
          <div
            key={conversation._id}
            className="flex gap-2 items-center hover:bg-white rounded p-2 py-4  cursor-pointer"
            onClick={() => dispatch(selectConversation(conversation))}
          >
            <div className="relative w-12 h-12">
              <Image
                src={conversation?.participants[0]?.profilePicture}
                alt="user avatar"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
              {isOnline && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
              )}
            </div>
            <div className="flex flex-col flex-1 gap-2">
              <div className="flex gap-3 justify-between">
                <p className="font-sans text-gray-900">{`${
                  conversation?.participants[0]?.role === "Doctor"
                    ? `DR. ${`${conversation?.participants[0]?.firstName} ${conversation?.participants[0]?.lastName}`}`
                    : ""
                }`}</p>
                <span className="text-xl"></span>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Conversation;
