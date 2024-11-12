import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { FaWindowClose } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { updateConversation } from "@/features/conversations/conversationSlice";

const Timer = ({ conversationId }) => {
  const dispatch = useDispatch();
  const initialTime = 20; // 30 minutes in seconds

  const calculateTimeLeft = () => {
    const endTime = localStorage.getItem(`timerEndTime_${conversationId}`);
    if (endTime) {
      // @ts-ignore
      const remainingTime = Math.floor((new Date(endTime) - new Date()) / 1000);
      return remainingTime > 0 ? remainingTime : 0;
    }
    return initialTime;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem(`timerEndTime_${conversationId}`)) {
      const endTime = new Date(new Date().getTime() + initialTime * 1000);
      // @ts-ignore
      localStorage.setItem(`timerEndTime_${conversationId}`, endTime);
    }

    const intervalId = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(intervalId);
  }, [conversationId]);

  useEffect(() => {
    if (timeLeft === 0) {
      setShowModal(true);
      localStorage.removeItem(`timerEndTime_${conversationId}`);
    }
  }, [timeLeft, conversationId]);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return {
      hours: hours.toString().padStart(2, "0"),
      minutes: minutes.toString().padStart(2, "0"),
      seconds: seconds.toString().padStart(2, "0"),
    };
  };

  const { hours, minutes, seconds } = formatTime(timeLeft);

  useEffect(() => {
    if (showModal === true) {
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
              Time's up! Do you want to stop the conversation?
            </span>
            <button
              className="text-lg ml-4 py-1 px-2 bg-green-500 text-white rounded-xl"
              onClick={() => {
                setTimeout(() => {
                  setShowModal(false);
                }, 100);
                // @ts-ignore
                toast.dismiss(t.id);
                dispatch(
                  //@ts-ignore
                  updateConversation({ conversationId: conversationId })
                );
              }}
            >
              Yes
            </button>
          </div>
        ),
        { duration: Infinity }
      );
    }
  }, [showModal]);

  const handleYesClick = () => {
    setShowModal(false);
    toast.dismiss();
  };

  return (
    <div>
      <div className="font-mono text-2xl flex space-x-2">
        <span className="bg-gray-800 text-white p-2 rounded">{hours}</span>:
        <span className="bg-gray-800 text-white p-2 rounded">{minutes}</span>:
        <span className="bg-gray-800 text-white p-2 rounded">{seconds}</span>
      </div>
      {/* {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-4 rounded-lg">
            <p>Time's up! Do you want to stop the conversation?</p>
            <button
              onClick={handleYesClick}
              className="bg-red-500 text-white p-2 rounded"
            >
              Yes
            </button>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Timer;
