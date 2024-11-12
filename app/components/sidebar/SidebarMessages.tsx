import React, { useState } from "react";
import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
import UserAccount from "./UserAccount";

const SidebarMessages: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="border-r w-[100%] border-slate-300 p-5 flex flex-col bg-gray-100 h-full">
      <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="divider px-3"></div>
      <Conversations searchTerm={searchTerm} />
      <UserAccount />
    </div>
  );
};

export default SidebarMessages;
