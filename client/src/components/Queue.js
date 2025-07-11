import React, { useEffect, useState } from "react";
import "./Queue.css";

function Queue() {
  const [queueItems, setQueueItems] = useState([]);
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch existing queue items
  useEffect(() => {
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
  }, []);

  // Function to handle adding a new item
  const handleAdd = () => {
    if (!newName.trim()) return;

    fetch("https://queue-management-app.onrender.com/api/queue", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: newName })
    })
      .then((res) => res.json())
      .then((data) => {
        setQueueItems([...queueItems, data]);
        setNewName("");
      })
      .catch((err) => {
        console.error("Error adding to queue:", err);
      });
  };

  // Function to handle deleting an item
  const handleDelete = (id) => {
    fetch(`https://queue-management-app.onrender.com/api/queue/${id}`, {
      method: "DELETE"
    })
      .then(() => {
        setQueueItems(queueItems.filter((item) => item._id !== id));
      })
      .catch((err) => {
        console.error("Error deleting from queue:", err);
      });
  };

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
              <span>{item.name}</span>
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
        <button onClick={handleAdd}>Add</button>
      </div>
    </div>
  );
}

export default Queue;
