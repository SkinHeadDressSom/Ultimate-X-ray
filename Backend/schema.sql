-- Create Enum Type\
CREATE TYPE status_type AS ENUM ('Pending', 'Completed');

-- Create Users Table
CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(30) NOT NULL,
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
    AN INT NOT NULL UNIQUE,
    description TEXT,
    clinical_history  TEXT,
    examination_details TEXT,
    findings TEXT,
    impression TEXT,
    recommendations TEXT,
    action_comments TEXT,
    attached_images INT,
    created_by INT NOT NULL REFERENCES Users(user_id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    status status_type DEFAULT 'Pending'
);

-- Create Images Table
CREATE TABLE Images (
    image_id SERIAL PRIMARY KEY,
    XN INT NOT NULL UNIQUE,
    record_id INT NOT NULL REFERENCES MedicalRecords(record_id),
    file_path TEXT NOT NULL,
    uploaded_at TIMESTAMP DEFAULT NOW(),
    processed_at TIMESTAMP,
    result VARCHAR(100) DEFAULT 'Pending'
);

-- Create Annotations Table
CREATE TABLE Annotations (
    annotation_id SERIAL PRIMARY KEY,
    image_id INT NOT NULL REFERENCES Images(image_id),
    bounding_data JSON,
    annotation_detail TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);



-- Insert Patients
INSERT INTO Patients (HN, first_name, last_name, date_of_birth, sex, height, weight, phone, address) VALUES
(93800044, 'Alice', 'Brown', '1982-03-11', 'Female', 170, 65, '3216549870', '789 Pine St'),
(93800045, 'Charlie', 'Davis', '1995-12-02', 'Male', 175, 80, '6549873210', '123 Oak St'),
(93800046, 'Emily', 'Evans', '1988-09-14', 'Female', 160, 55, '7890123456', '456 Maple St'),
(93800047, 'Frank', 'Green', '1975-11-30', 'Male', 185, 90, '8901234567', '789 Cedar St'),
(93800048, 'Grace', 'Hall', '1993-01-19', 'Female', 155, 50, '9012345678', '123 Walnut St');

-- Insert MedicalRecords
INSERT INTO MedicalRecords (AN, patient_id, clinical_history, examination_details, description, findings, impression, recommendations, action_comments, attached_images, created_by, status) VALUES
(134986, 1, 'Diabetes', 'Blood sugar check', 'Blood test', 'Normal levels', 'Stable', 'Continue medication', 'Monitor levels', 3, 1, 'Completed'),
(134987, 1, 'Back pain', 'MRI scan', 'Spinal scan', 'Mild disc bulge', 'Requires physiotherapy', 'Under observation', 'Follow exercise routine', 4, 1, 'Pending'),
(134988, 2, 'Heart disease', 'ECG', 'Heart function test', 'Mild arrhythmia', 'Monitor closely', 'Requires medication', 'Advised diet changes', 5, 2, 'Completed'),
(134989, 2, 'Allergy', 'Skin test', 'Allergic reaction', 'Positive for pollen', 'Avoid allergens', 'Mild symptoms', 'Use antihistamines', 6, 2, 'Pending'),
(134990, 2, 'Flu', 'Physical exam', 'Routine check', 'Normal flu symptoms', 'Rest and hydrate', 'Mild illness', 'No issues', 7, 3, 'Completed');

-- Insert Images
INSERT INTO Images (XN, record_id, file_path, uploaded_at, processed_at, result) VALUES
(782316, 1, '/images/patient3_scan1.jpg', NOW(), NOW(), 'Normal'),
(782317, 1, '/images/patient4_scan1.jpg', NOW(), NULL, 'Abnormal'),
(782318, 1, '/images/patient5_scan1.jpg', NOW(), NOW(), 'Abnormal'),
(782319, 2, '/images/patient6_scan1.jpg', NOW(), NOW(), 'Normal'),
(782320, 2, '/images/patient7_scan1.jpg', NOW(), NULL, 'Normal');

-- Insert Annotations
INSERT INTO Annotations (image_id, bounding_data, created_at) VALUES
(1, '{"x": 20, "y": 30, "width": 40, "height": 40}', NOW()),
(2, '{"x": 25, "y": 35, "width": 45, "height": 45}', NOW()),
(3, '{"x": 30, "y": 40, "width": 50, "height": 50}', NOW()),
(4, '{"x": 35, "y": 45, "width": 55, "height": 55}', NOW()),
(5, '{"x": 40, "y": 50, "width": 60, "height": 60}', NOW());