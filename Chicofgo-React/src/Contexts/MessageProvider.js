import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const MessageContext = createContext();

export function useMessage() {
  return useContext(MessageContext);
}

function MessageProvider(props) {
  const { children } = props;
  const [message, setMessage] = useState([]);
  async function getMessage() {
    try {
      const response = await axios.get(
        'http://localhost:3001/api/products/message'
      );
      const output = response.data.map((item) => {
        return {
          ...item,
          message_time: item.message_time.substring(0, 10),
        };
      });
      setMessage(output);
    } catch (error) {}
  }
  return (
    <MessageContext.Provider value={{ message, getMessage }}>
      {children}
    </MessageContext.Provider>
  );
}

export default MessageProvider;
