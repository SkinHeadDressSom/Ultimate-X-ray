-- Create Patients Table
CREATE TABLE Patients (
    patient_id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    date_of_birth DATE NOT NULL,
    sex CHAR(1) NOT NULL,
    height_cm INT,
    weight_kg INT,
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
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Create Images Table
CREATE TABLE Images (
    image_id SERIAL PRIMARY KEY,
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
    role VARCHAR(20),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Insert Sample Data
INSERT INTO Patients (first_name, last_name, date_of_birth, sex, height_cm, weight_kg, phone, address) VALUES
('John', 'Doe', '1985-06-15', 'M', 180, 75, '1234567890', '123 Main St'),
('Jane', 'Smith', '1990-08-22', 'F', 165, 60, '9876543210', '456 Elm St');

INSERT INTO MedicalRecords (patient_id, clinical_history, examination_details, findings, impression, recommendations, action_comments, attached_images) VALUES
(1, 'Hypertension', 'Routine check-up', 'Normal', 'Healthy', 'Maintain diet', 'No issues', 1),
(2, 'Asthma', 'Follow-up', 'Mild symptoms', 'Requires monitoring', 'Continue medication', 'Scheduled next visit', 2);

INSERT INTO Images (record_id, file_path, uploaded_at, processed_at, result) VALUES
(1, '/images/patient1_scan1.jpg', NOW(), NOW(), 'Normal'),
(2, '/images/patient2_scan1.jpg', NOW(), NULL, 'Pending');

INSERT INTO Annotations (image_id, bounding_data, description, created_by, created_at) VALUES
(1, '{"x": 10, "y": 20, "width": 50, "height": 50}', 'Lung abnormality', 1, NOW()),
(2, '{"x": 15, "y": 25, "width": 60, "height": 60}', 'Heart shadow', 2, NOW());

INSERT INTO Users (username, password_hash, role) VALUES
('admin', 'hashed_password_1', 'admin'),
('doctor', 'hashed_password_2', 'medical_staff');
