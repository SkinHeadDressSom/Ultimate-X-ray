-- Create Enum Type\
CREATE TYPE status_type AS ENUM ('Pending', 'Examined');

-- Create Patients Table
CREATE TABLE Patients (
    patient_id SERIAL PRIMARY KEY,
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
    clinical_history TEXT,
    examination_details VARCHAR(100),
    findings TEXT,
    impression TEXT,
    recommendations TEXT,
    action_comments TEXT,
    attached_images INT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    status status_type DEFAULT 'Pending'
);

-- Create Images Table
CREATE TABLE Images (
    image_id SERIAL PRIMARY KEY,
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
    description TEXT,
    created_by INT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Create Users Table
CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(30) NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(40),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Insert Sample Data
INSERT INTO Patients (patient_id, first_name, last_name, date_of_birth, sex, height, weight, phone, address) VALUES
(93800043, 'John', 'Doe', '1985-06-15', 'Male', 180, 75, '1234567890', '123 Main St'),
(45637289, 'Jane', 'Smith', '1990-08-22', 'Female', 165, 60, '9876543210', '456 Elm St');

INSERT INTO MedicalRecords (record_id, patient_id, clinical_history, examination_details, image_description, findings, impression, recommendations, action_comments, attached_images, status) VALUES
(134985, 93800043, 'Hypertension', 'Routine check-up', 'Chest AP' ,'Lung Fields No evidence of pneumothorax', 'Healthy', 'Maintain diet', 'No issues', 1, 'Examined'),
(211328, 45637289, 'Asthma', 'Follow-up', 'Chest PA' ,'Pleura : Mild pleural thickening on the right side; no pleural effusin noted.', 'Requires monitoring', 'Continue medication', 'Scheduled next visit', 2, 'Pending');

INSERT INTO Images (record_id, file_path, uploaded_at, processed_at, result) VALUES
(134985, '/images/patient1_scan1.jpg', NOW(), NOW(), 'Normal'),
(211328, '/images/patient2_scan1.jpg', NOW(), NULL, 'Pending');

INSERT INTO Annotations (image_id, bounding_data, description, created_by, created_at) VALUES
(1, '{"x": 10, "y": 20, "width": 50, "height": 50}', 'Lung abnormality', 1, NOW()),
(2, '{"x": 15, "y": 25, "width": 60, "height": 60}', 'Heart shadow', 2, NOW());

INSERT INTO Users (username, password_hash, role) VALUES
('doctor1', 'hashed_password_1', 'Radiologist'),
('doctor2', 'hashed_password_2', 'General practitioner'),
('doctor3', 'hashed_password_3', 'Radiological technician ');
