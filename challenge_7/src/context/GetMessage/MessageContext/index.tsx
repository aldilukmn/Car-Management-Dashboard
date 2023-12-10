import React, { createContext } from "react";


interface MessageProps {
  messageSuccess: string;
  setMessageSuccess: React.Dispatch<React.SetStateAction<string>>;
}

const defaultValue: MessageProps = {
  messageSuccess: '',
  setMessageSuccess: React.useState,
}

const MessageContext = createContext<MessageProps>(defaultValue);

export default MessageContext;