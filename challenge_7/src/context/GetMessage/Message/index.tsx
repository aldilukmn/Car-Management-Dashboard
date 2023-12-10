import React, { useState } from 'react'
import { MessageContext } from '..';

interface MessageProps {
  children: React.ReactNode;
}

function MessageProvider({children}: MessageProps) {
  const [messageSuccess, setMessageSuccess] = useState<string>('');
  return (
    <>
      <MessageContext.Provider value={{messageSuccess, setMessageSuccess}}>
        {children}
      </MessageContext.Provider>
    </>
  )
}

export default MessageProvider