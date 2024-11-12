import React from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { getConversationsCurrentUser } from "@/features/conversations/conversationSlice";
import { selectConversation } from "@/features/conversations/conversationSlice";
import { useUser } from "@auth0/nextjs-auth0/client";
import io from "socket.io-client";

interface ConversationsProps {
  searchTerm: string;
}

const Conversations: React.FC<ConversationsProps> = ({ searchTerm }) => {
  const currentUser = useSelector((state: RootState) => state.user.user);
  const [socket, setSocket] = React.useState<any>(null);
  const currentUserConversations = useSelector(
    (state: RootState) => state.conversations.conversations
  );
  const dispatch = useDispatch();
  const { user } = useUser();
  const onlineUsers = useSelector((state: RootState) => state.user.onlineUsers);

  const filteredConversations = currentUserConversations.filter(
    (conversation: any) => {
      const participant = conversation.participants[0];
      if (!participant) {
        return false;
      }
      const participantName =
        `${participant.firstName} ${participant.lastName}`.toLowerCase();
      return participantName.includes(searchTerm.toLowerCase());
    }
  );

  React.useEffect(() => {
    // Fetch user conversations
    //@ts-ignore
    dispatch(getConversationsCurrentUser({ currentUser: currentUser?._id }));
  }, [currentUser]);

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
    socket.on("newConversation", (conversation: any) => {
      //@ts-ignore
      dispatch(getConversationsCurrentUser({ currentUser: currentUser?._id }));
    });

    return () => {
      socket?.off("newConversation");
    };
  }, [currentUserConversations]);

  return (
    <div className="py-2 flex flex-col overflow-auto h-full">
      <>
        {filteredConversations?.map((conversation: any) => {
          const isOnline = onlineUsers?.includes(
            conversation.participants[0].email
          );
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
                {isOnline ? (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                ) : (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>
                )}
              </div>
              <div className="flex flex-col flex-1 gap-2">
                <div className="flex gap-3 justify-between">
                  <p className="font-sans text-gray-900">{`${
                    conversation?.participants[0]?.role === "Doctor"
                      ? `DR. ${`${conversation?.participants[0]?.firstName} ${conversation?.participants[0]?.lastName}`}`
                      : conversation?.participants[0]?.firstName === undefined &&
                        conversation?.participants[0]?.lastName === undefined
                      ? conversation?.participants[0]?.email
                      : `${`${conversation?.participants[0]?.firstName} ${conversation?.participants[0]?.lastName}`}`
                  }`}</p>
                  <span className="text-xl"></span>
                </div>
              </div>
            </div>
          );
        })}
      </>
    </div>
  );
};

export default Conversations;
