import React, { useEffect, useState } from 'react';
import api from "../api";
import socket from "../socket";
import styles from "../styles/Queue.module.css";

export default function Queue() {
    const [queue, setQueue] = useState([]);

    // When fetching from API
    useEffect(() => {
        api.get('/queue')
            .then(res => {
                console.log("API /queue response:", res.data);
                setQueue(res.data);
            })
            .catch(err => console.error(err));
    }, []);

// When receiving from socket
    useEffect(() => {
        const handleQueueUpdated = (data) => {
            console.log("Socket queueUpdated:", data);
            setQueue(data);
        };
        socket.on('queueUpdated', handleQueueUpdated);
        return () => {
            socket.off('queueUpdated', handleQueueUpdated);
        };
    }, []);


    return (
        <div className={styles.queueContainer}>
            <h1>Current Queue</h1>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Student ID</th>
                    <th>Status</th>
                    <th>Joined</th>
                </tr>
                </thead>
                <tbody>
                {queue.map((item, idx) => (
                    <tr key={item._id}>
                        <td>{idx + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.studentID}</td>
                        <td>{item.status.replace('_', ' ')}</td>
                        <td>{new Date(item.joinedAt).toLocaleString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
