// src/components/LoginPage.jsx
import React, { useState } from "react";
import styles from "../styles/LoginPage.module.css";

export default function LoginPage({ setUser }) {
    const [role, setRole] = useState("student");
    const [name, setName] = useState("");
    const [studentID, setStudentID] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Hardcoded login for demo
        if (role === "admin") {
            setUser({ role: "admin", name: "Admin", studentID: null });
        } else {
            if (name && studentID) {
                setUser({ role: "student", name, studentID });
            }
        }
    };

    return (
        <div className={styles.loginContainer}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Role:
                    <select value={role} onChange={e => setRole(e.target.value)}>
                        <option value="student">Student</option>
                        <option value="admin">Admin</option>
                    </select>
                </label>
                {role === "student" && (
                    <>
                        <label>
                            Name:
                            <input type="text" value={name} onChange={e => setName(e.target.value)} required />
                        </label>
                        <label>
                            Student ID:
                            <input type="text" value={studentID} onChange={e => setStudentID(e.target.value)} required />
                        </label>
                    </>
                )}
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
