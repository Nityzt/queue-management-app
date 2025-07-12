import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./Queue.css";

function Queue() {
  const [queueItems, setQueueItems] = useState([]);
  const [newName, setNewName] = useState("");
  const [newStudentId, setNewStudentId] = useState("");
  const [loading, setLoading] = useState(true);

  // IMPORTANT: create socket outside useEffect
  const socket = io("https://queue-management-app.onrender.com", {
    transports: ["websocket"],
  });

  useEffect(() => {
    // Fetch data initially
    fetch("https://queue-management-app.onrender.com/api/queue")
      .then((res) => res.json())
      .then((data) => {
        setQueueItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching queue:", err);
        setLoading(false);
      });

    // Listen for added items
    socket.on("queue-added", (newItem) => {
  console.log("Socket newItem received:", newItem);
  setQueueItems((prev) => [...prev, newItem]);
});


    // Listen for removed items
    socket.on("queue-deleted", (id) => {
      setQueueItems((prev) => prev.filter((item) => item._id !== id));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleAdd = () => {
    if (!newName.trim() || !/^\d{1,9}$/.test(newStudentId)) {
      alert("Please enter a name and a numeric Student ID up to 9 digits.");
      return;
    }

    fetch("https://queue-management-app.onrender.com/api/queue", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName, studentId: newStudentId }),
    })
      .then((res) => res.json())
      .then((newItem) => {
        // Add optimistically
        setQueueItems((prev) => [...prev, newItem]);
        setNewName("");
        setNewStudentId("");
      })
      .catch((err) => {
        console.error("Error adding to queue:", err);
      });
  };

  const handleDelete = (id) => {
    // Optimistically remove before waiting for socket event
    setQueueItems((prev) => prev.filter((item) => item._id !== id));

    fetch(`https://queue-management-app.onrender.com/api/queue/${id}`, {
      method: "DELETE",
    }).catch((err) => {
      console.error("Error deleting from queue:", err);
    });
  };
  console.log("Rendering queueItems:", queueItems);
  return (
    <div className="queue-container">
      <h1>Queue Management</h1>
      {loading ? (
        <p>Loading...</p>
      ) : queueItems.length === 0 ? (
        <p>No items in the queue.</p>
      ) : (
        <ul className="queue-list">
          {queueItems.map((item) => (
            <li key={item._id} className="queue-item">
              <span>
                {item.name} (ID: {item.studentId || "N/A"})
              </span>
              <button onClick={() => handleDelete(item._id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <div className="queue-input">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Enter name"
        />
        <input
          type="number"
          value={newStudentId}
          onChange={(e) => {
            const val = e.target.value.slice(0, 9);
            setNewStudentId(val);
          }}
          placeholder="Enter Student ID (max 9 digits)"
        />
        <button onClick={handleAdd}>Add</button>
      </div>
    </div>
  );
}

export default Queue;
