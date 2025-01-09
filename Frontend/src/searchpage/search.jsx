import React, { useState } from "react";
import { ReactComponent as SearchIcon } from "./search-2-line.svg";

const FindPatient = () => {
    const [patientID, setPatientID] = useState("");

    // ฟังก์ชั่นแจ้งเตือนการค้นหาข้อมูลผู้ป่วย
    const handleSearch = () => {
        if (patientID) {
            
        } else {
            alert("Please cheack patient ID again.");
        }
    };

    // ฟังก์ชั่นจำกัด input ID จำกัดแค่ตัวเลข
    const handleChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setPatientID(value); 
        }
    };

    // ช่อง input ID จำกัดแค่ตัวเลข
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
    
    //กรอบนอก
    outerContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#e0e0e0",
    },

    //กรอบใน
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

    // text Find patient
    heading: {
        fontSize: "24px",
        marginBottom: "20px",
        color: "#333",
    },

    //ช่องกรอก
    searchBox: {
        display: "flex",
        alignItems: "center",
        border: "1px solid #ccc",
        borderRadius: "30px",
        padding: "5px 10px",
        backgroundColor: "#fff",
    },

    //ข้อความในช่องกรอก
    input: {
        border: "none",
        outline: "none",
        padding: "10px",
        fontSize: "16px",
        flex: 1,
    },

    //ปุ่มค้นหา
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

};

export default FindPatient;
