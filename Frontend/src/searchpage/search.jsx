import React, { useState } from "react";
import { ReactComponent as SearchIcon } from "./search-2-line.svg";

const FindPatient = () => {
    const [patientID, setPatientID] = useState("");

    const handleSearch = () => {
        if (patientID) {
            
        } else {
            alert("Please enter a patient ID.");
        }
    };

    const handleChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setPatientID(value); // อนุญาตเฉพาะตัวเลขเท่านั้น
        }
    };

    return (
        <div style={styles.outerContainer}>
            <div style={styles.container}>
                <h1 style={styles.heading}>Find patient</h1>
                <div style={styles.searchBox}>
                    <input
                        type="text"
                        placeholder="Enter patient ID"
                        value={patientID}
                        onChange={handleChange}
                        style={styles.input}
                    />
                    <button onClick={handleSearch} style={styles.button}>
                        <SearchIcon width="50" height="20" />
                    </button>
                </div>
                
            </div>
        </div>
    );
};

const styles = {
    outerContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#e0e0e0",
    },
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "50px",
        backgroundColor: "#f7f9fc",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    },
    heading: {
        fontSize: "24px",
        marginBottom: "20px",
        color: "#333",
    },
    searchBox: {
        display: "flex",
        alignItems: "center",
        border: "1px solid #ccc",
        borderRadius: "25px",
        padding: "5px 10px",
        backgroundColor: "#fff",
    },
    input: {
        border: "none",
        outline: "none",
        padding: "10px",
        fontSize: "16px",
        flex: 1,
    },
    button: {
        backgroundColor: "#d4e5ff",
        color: "#fff",
        border: "none",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        marginLeft: "10px",
    },
    popupButton: {
        marginTop: "20px",
        padding: "10px 20px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
    popup: {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        zIndex: 1000,
    },
    closeButton: {
        marginTop: "10px",
        padding: "10px 20px",
        backgroundColor: "#ff4d4d",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
};

export default FindPatient;
