import { useEffect, useState, type SetStateAction } from 'react';
import { io } from 'socket.io-client';

export const SocketComponent = () => {
  const [textFieldValue, settextFieldValue] = useState('');
  const [messageFieldValue, setMessageFieldValue] = useState<any[]>([]);

  const handleChangeTextFieldValue = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    settextFieldValue(event.target.value);
  };
  const socket = io('http://localhost:3000/');

  useEffect(() => {
    const handleChangeMessageFieldValue = (data: any) => {
      setMessageFieldValue((message) => [...message, data]);
    };

    socket.on('message', handleChangeMessageFieldValue);
  });

  const onPress = () => {
    try {
      socket.emit('message', textFieldValue);

      socket.on('message', (data: any) => {
        setMessageFieldValue(data);
        console.log(data);
      });
    } catch (error) {
      alert(error);
    }
  };
  return (
    <>
      <div className="bg-black-500 p-25 justify-center flex-col items-center">
        <div>
          <input
            type="text"
            value={textFieldValue}
            className="rounded border-2 p-1.5 border-solid border-white"
            placeholder="Enter text Here"
            onChange={handleChangeTextFieldValue}
          />
          <button
            title="Press Here"
            className="bg-white m-2.5 p-1.5 rounded text-black"
            onClick={onPress}
          >
            Send!
          </button>
        </div>

        <ul>
          {messageFieldValue.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
    </>
  );
};
