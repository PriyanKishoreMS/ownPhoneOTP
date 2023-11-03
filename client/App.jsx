import HomeScreen from './screens/HomeScreen';
import {useEffect, useState} from 'react';

function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const ws = new WebSocket('ws://ip:3000');
    console.log(ws);

    ws.onopen = () => {
      console.log('Connected');
      ws.send('Hello Server');
    };

    ws.onmessage = event => {
      console.log(`Received: ${event.data}`);
      setData(event.data);
    };

    ws.onclose = () => {
      console.log('Connection closed');
    };

    ws.onerror = error => {
      console.log(`Error: ${error.message}`);
    };

    return () => {
      ws.close();
    };
  }, []);

  return <HomeScreen data={data} />;
}

export default App;
