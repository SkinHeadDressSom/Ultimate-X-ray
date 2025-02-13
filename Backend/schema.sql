-- Create Enum Type\
CREATE TYPE status_type AS ENUM ('Scheduled', 'Completed');
CREATE TYPE role_type AS ENUM ('Rediologist Technician ', 'General Practitioner', 'Radiologist');
-- Create Users Table
CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    username VARCHAR(50) NOT NULL,
    password_hash TEXT NOT NULL,
    role role_type,
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
    AN INT NOT NULL UNIQUE,
    description TEXT,
    clinical_history  TEXT,
    examination_details TEXT,
    findings TEXT,
    impression TEXT,
    recommendations TEXT,
    action_comments TEXT,
    created_by TEXT,
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
    image_id INT NOT NULL REFERENCES Images(image_id) UNIQUE,
    user_id INT NOT NULL REFERENCES Users(user_id) UNIQUE,
    file_path TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT unique_image_user UNIQUE (image_id, user_id)
);


-- Insert Users
INSERT INTO Users ( name, username, password_hash, role) VALUES
('Thomas Shelby', 'test', '$2a$10$JJsQTNUQyWnp89rdvkAXgOTSdfTKN9pq1L277KW/.wMqwiW234jvm', 'General Practitioner');

-- Insert Patients
INSERT INTO Patients (HN, first_name, last_name, date_of_birth, sex, height, weight, phone, address) VALUES
(93800044, 'Alice', 'Brown', '1982-03-11', 'Female', 170, 65, '3216549870', '789 Pine St'),
(93800045, 'Charlie', 'Davis', '1995-12-02', 'Male', 175, 80, '6549873210', '123 Oak St'),
(93800046, 'Emily', 'Evans', '1988-09-14', 'Female', 160, 55, '7890123456', '456 Maple St'),
(93800047, 'Frank', 'Alice', '1975-11-30', 'Male', 185, 90, '8901234567', '789 Cedar St'),
(93800048, 'Davis', 'Hall', '1993-01-19', 'Female', 155, 50, '9012345678', '123 Walnut St');

-- Insert MedicalRecords
INSERT INTO MedicalRecords (AN, patient_id, clinical_history, examination_details, description, findings, impression, recommendations, action_comments, status) VALUES
(134986, 1, 'Diabetes', 'Blood sugar check', 'Blood test', 'Normal levels', 'Stable', 'Continue medication', 'Monitor levels', 'Completed'),
(134987, 1, 'Back pain', 'MRI scan', 'Spinal scan', 'Mild disc bulge', 'Requires physiotherapy', 'Under observation', 'Follow exercise routine', 'Scheduled'),
(134988, 2, 'Heart disease', 'ECG', 'Heart function test', 'Mild arrhythmia', 'Monitor closely', 'Requires medication', 'Advised diet changes', 'Completed'),
(134989, 2, 'Allergy', 'Skin test', 'Allergic reaction', 'Positive for pollen', 'Avoid allergens', 'Mild symptoms', 'Use antihistamines', 'Scheduled'),
(134990, 2, 'Flu', 'Physical exam', 'Routine check', 'Normal flu symptoms', 'Rest and hydrate', 'Mild illness', 'No issues', 'Completed');

-- Insert Images
INSERT INTO Images (XN, record_id, file_path, uploaded_at, processed_at, result) VALUES

(782316, 1, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/original-images/c6c19cc8f966c6353e663a4e299d9a39.png', '1982-07-22 14:23:45', '1982-07-22 13:55:12', 'Normal'),
(782317, 1, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/original-images/8de1d1a853009572844969d046f99f6b.png', '2002-03-17 07:42:50', 'Abnormal'),
(782318, 2, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/original-images/15b164c54f0bf0baac308b47a45a1468.png', '1689-09-16 21:45:10', '1689-09-16 21:11:38', 'Abnormal'),
(782319, 2, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/original-images/15b164c54f0bf0baac308b47a45a1468.png', '2016-12-08 05:37:55', '2016-12-08 05:09:21', 'Normal'),
(782320, 2, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/original-images/ff924bcbd38f123aec723aa7040d7e43.png', '2008-04-02 00:09:21', '2008-04-01 23:58:55', 'Normal');

-- Insert Annotation Images
INSERT INTO Annotations (image_id, user_id, file_path, file_path, created_at) VALUES

(1, 1, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/annotation-images/778592c49dc5b2bd4f4d4f415e174b5c.png', '1982-07-22 14:35:45'),
(2, 1, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/annotation-images/77f4f19048695b17ba4194ae3b9bea8a.png', '2002-03-17 08:20:30'),
(3, 1, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/annotation-images/e652b2cebae0a6c74e292b3112d29e6e.png', '1689-09-16 22:02:10'),
(4, 1, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/annotation-images/ab11a974837f5313912804939bfae79e.png', '2016-12-08 00:15:21');