import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

function Queue() {
    const [queue, setQueue] = useState([]);

    useEffect(() => {
        socket.on('queueUpdated', (data) => {
            setQueue(data);
        });

        return () => socket.disconnect();
    }, []);

    return (
        <div>
            <h1>Current Queue</h1>
            {queue.map((item, index) => (
                <p key={index}>{item.name}</p>
            ))}
        </div>
    );
}

export default Queue;
