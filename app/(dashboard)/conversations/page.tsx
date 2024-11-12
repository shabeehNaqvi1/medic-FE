"use client";

import React, { useState } from "react";
import SidebarMessages from "../../components/sidebar/SidebarMessages";
import MessageContainer from "../../components/messages/MessageContainer";
import { useDispatch, useSelector } from "react-redux";
import { showMe } from "@/features/user/userSlice";
import { useUser } from "@auth0/nextjs-auth0/client";
import { RootState } from "@/store/store";
import io from "socket.io-client";
import { setOnlineUsers } from "@/features/user/userSlice";
import Loading from "@/app/components/Loading";

const Page: React.FC = () => {
  const { user, isLoading } = useUser();
  const [socket, setSocket] = useState<any>(null);
  const currentUser = useSelector((state: RootState) => state.user.user);
  const loading = useSelector((state: RootState) => state.user.loading);
  const isChatOpen = useSelector((state : RootState) => state.conversations.isChatOpen);
  const dispatch = useDispatch();
  React.useEffect(() => {
    //@ts-ignore
    dispatch(showMe(user && { email: user?.email }));
  },[]);

  React.useEffect(() => {
    if (user) {
      const socket = io(
        "https://medic-chat-back-end-dd14e4e2098a.herokuapp.com",
        {
          query: {
            email: user && user?.email,
          },
        }
      );
      setSocket(socket);
      socket.on("getOnlineUsers", (users) => {
        dispatch(setOnlineUsers(users));
      });
      return () => {
        socket.close();
      };
    } else {
      if (socket) {
        socket.close();
      }
    }
  }, [user]);
  if(isLoading || loading) return <Loading />
  return (
    <div className="flex h-[calc(100vh-80px)] mt-[80px]">
      <div
        className={` w-full md:w-[45%] lg:w-[33%] xl:w-[27%] 2xl:w-[22%] ${
          isChatOpen ? "hidden md:flex" : "flex"
        }`}
      >
        <SidebarMessages  />
      </div>
      <div
        className={`flex-grow w-full md:w-[65%] ${
          isChatOpen ? "flex" : "hidden md:flex"
        }`}
      >
        {isChatOpen && <MessageContainer />}
      </div>
    </div>
  );
};

export default Page;
