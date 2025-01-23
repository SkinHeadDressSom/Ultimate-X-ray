-- Create Enum Type\
CREATE TYPE status_type AS ENUM ('Scheduled', 'Completed');

-- Create Users Table
CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    username VARCHAR(50) NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(40),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Create Patients Table
CREATE TABLE Patients (
    patient_id SERIAL PRIMARY KEY,
    HN INT NOT NULL UNIQUE,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    date_of_birth DATE NOT NULL,
    sex VARCHAR(6) NOT NULL,
    height INT,
    weight INT,
    phone VARCHAR(15),
    address TEXT
);

-- Create MedicalRecords Table
CREATE TABLE MedicalRecords (
    record_id SERIAL PRIMARY KEY,
    patient_id INT NOT NULL REFERENCES Patients(patient_id),
    user_id INT NOT NULL REFERENCES Users(user_id),
    AN INT NOT NULL UNIQUE,
    description TEXT,
    clinical_history  TEXT,
    examination_details TEXT,
    findings TEXT,
    impression TEXT,
    recommendations TEXT,
    action_comments TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    status status_type DEFAULT 'Scheduled'
);

-- Create Images Table
CREATE TABLE Images (
    image_id SERIAL PRIMARY KEY,
    XN INT NOT NULL UNIQUE,
    record_id INT NOT NULL REFERENCES MedicalRecords(record_id),
    file_path TEXT NOT NULL,
    uploaded_at TIMESTAMP DEFAULT NOW(),
    processed_at TIMESTAMP,
    result VARCHAR(20) 
);

-- Create Annotations Table
CREATE TABLE Annotations (
    annotation_id SERIAL PRIMARY KEY,
    image_id INT NOT NULL REFERENCES Images(image_id),
    file_path TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Join table for attached image in report
CREATE TABLE MedicalRecordAnnotations (
    id SERIAL PRIMARY KEY,
    record_id INT NOT NULL REFERENCES MedicalRecords(record_id) ON DELETE CASCADE,
    annotation_id INT NOT NULL REFERENCES Annotations(annotation_id) ON DELETE CASCADE
);

-- Insert Users
INSERT INTO Users ( name, username, password_hash, role) VALUES
('Thomas Shelby', 'test', '$2a$10$JJsQTNUQyWnp89rdvkAXgOTSdfTKN9pq1L277KW/.wMqwiW234jvm', 'General Practitioner');

-- Insert Patients
INSERT INTO Patients (HN, first_name, last_name, date_of_birth, sex, height, weight, phone, address) VALUES
(93800044, 'Alice', 'Brown', '1982-03-11', 'Female', 170, 65, '3216549870', '789 Pine St'),
(93800045, 'Charlie', 'Davis', '1995-12-02', 'Male', 175, 80, '6549873210', '123 Oak St'),
(93800046, 'Emily', 'Evans', '1988-09-14', 'Female', 160, 55, '7890123456', '456 Maple St'),
(93800047, 'Frank', 'Green', '1975-11-30', 'Male', 185, 90, '8901234567', '789 Cedar St'),
(93800048, 'Grace', 'Hall', '1993-01-19', 'Female', 155, 50, '9012345678', '123 Walnut St');

-- Insert MedicalRecords
INSERT INTO MedicalRecords (AN, patient_id, user_id, clinical_history, examination_details, description, findings, impression, recommendations, action_comments, status) VALUES
(134986, 1, 1, 'Diabetes', 'Blood sugar check', 'Blood test', 'Normal levels', 'Stable', 'Continue medication', 'Monitor levels', 'Completed'),
(134987, 1, 1, 'Back pain', 'MRI scan', 'Spinal scan', 'Mild disc bulge', 'Requires physiotherapy', 'Under observation', 'Follow exercise routine', 'Scheduled'),
(134988, 2, 1, 'Heart disease', 'ECG', 'Heart function test', 'Mild arrhythmia', 'Monitor closely', 'Requires medication', 'Advised diet changes', 'Completed'),
(134989, 2, 1,'Allergy', 'Skin test', 'Allergic reaction', 'Positive for pollen', 'Avoid allergens', 'Mild symptoms', 'Use antihistamines', 'Scheduled'),
(134990, 2, 1, 'Flu', 'Physical exam', 'Routine check', 'Normal flu symptoms', 'Rest and hydrate', 'Mild illness', 'No issues', 'Completed');

-- Insert Images
INSERT INTO Images (XN, record_id, file_path, uploaded_at, processed_at, result) VALUES
(782316, 1, '/images/patient3_scan1.jpg', NOW(), NOW(), 'Normal'),
(782317, 1, '/images/patient4_scan1.jpg', NOW(), NULL, 'Abnormal'),
(782318, 1, '/images/patient5_scan1.jpg', NOW(), NOW(), 'Abnormal'),
(782319, 2, '/images/patient6_scan1.jpg', NOW(), NOW(), 'Normal'),
(782320, 2, '/images/patient7_scan1.jpg', NOW(), NULL, 'Normal');

-- Insert Annotations
INSERT INTO Annotations (image_id, file_path, created_at) VALUES
(1, '/annotations/patient3_scan1.jpg' , NOW()),
(2, '/annotations/patient3_scan1.jpg', NOW()),
(3, '/annotations/patient3_scan1.jpg', NOW()),
(4, '/annotations/patient3_scan1.jpg', NOW()),
(5, '/annotations/patient3_scan1.jpg', NOW());

