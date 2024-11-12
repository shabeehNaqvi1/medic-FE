"use client";
import { PropsWithChildren, useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Loading from "../components/Loading";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { toast } from "react-hot-toast";
import io from "socket.io-client";
import {
  openNotification,
  closeNotification,
} from "@/features/conversations/conversationSlice";
import { FaWindowClose } from "react-icons/fa";

function Layout({ children }: PropsWithChildren) {
  const { user, isLoading } = useUser();
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.user);
  const loadingUser = useSelector((state: RootState) => state.user.loadingUser);
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    if (user && user.email) {
      const socket = io(
        "https://medic-chat-back-end-dd14e4e2098a.herokuapp.com",
        {
          query: { email: user.email },
        }
      );

      socket.on("connect", () => {
        console.log("Connected to socket server");
      });

      socket.on("newConversation", (conversation: any) => {
        console.log("New conversation received:", conversation);
        dispatch(openNotification());
      });

      setSocket(socket);

      return () => {
        socket.off("newConversation");
        socket.disconnect();
      };
    }
  }, [user]);

  const notification = useSelector(
    (state: RootState) => state.conversations.newConversationNotification
  );

  useEffect(() => {
    if (notification) {
      toast.custom(
        (t) => (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "white",
              padding: "1rem",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <span style={{ marginRight: "auto", color: "green" }}>
              You have a new conversation
            </span>
            <button
              onClick={() => {
                setTimeout(() => {
                  dispatch(closeNotification());
                }, 100);
                toast.dismiss(t.id);
              }}
            >
              <FaWindowClose className="text-xl ml-4 rounded-full" />
            </button>
          </div>
        ),
        { duration: Infinity }
      );
    }
  }, [notification]);

  if (isLoading || loadingUser) return <Loading />;

  return (
    <main>
      <div>{children}</div>
    </main>
  );
}

export default Layout;
