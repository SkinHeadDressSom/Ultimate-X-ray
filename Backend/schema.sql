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
    image_id INT NOT NULL REFERENCES Images(image_id),
    user_id INT NOT NULL REFERENCES Users(user_id),
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
(93800047, 'Frank', 'Alice', '1975-11-30', 'Male', 185, 90, '8901234567', '789 Cedar St'),
(93800048, 'Davis', 'Hall', '1993-01-19', 'Female', 155, 50, '9012345678', '123 Walnut St');

-- Insert MedicalRecords
INSERT INTO MedicalRecords (AN, patient_id, clinical_history, examination_details, description, findings, impression, recommendations, action_comments, status) VALUES
(134986, 1, 'Chronic cough', 'Chest X-ray', 'Lung opacity', 'Mild infection', 'Needs antibiotics', 'Prescribed medication', 'Follow-up in 2 weeks', 'Completed'),
(134987, 1, 'Shortness of breath', 'Chest X-ray', 'Bilateral infiltrates', 'Early pneumonia', 'Monitor progression', 'Hydration and rest', 'Re-evaluate in 5 days', 'Scheduled'),
(134988, 1, 'Chest tightness', 'Chest X-ray', 'Hyperinflated lungs', 'Suggestive of COPD', 'Pulmonary rehab needed', 'Bronchodilators prescribed', 'Monitor symptoms', 'Completed'),
(134989, 1, 'Recurrent fever', 'Chest X-ray', 'Patchy consolidations', 'Bronchopneumonia', 'Needs antibiotics', 'Hospital admission suggested', 'Monitor closely', 'Scheduled'),
(134990, 1, 'Chronic bronchitis', 'Chest X-ray', 'Peribronchial thickening', 'Consistent with chronic bronchitis', 'Quit smoking advised', 'Cough management plan', 'Regular check-ups', 'Scheduled'),
(134991, 1, 'Fatigue', 'Chest X-ray', 'Mild cardiomegaly', 'Potential heart strain', 'Further cardiac testing', 'ECG and echocardiogram recommended', 'Pending specialist review', 'Scheduled'),
(134992, 1, 'Persistent dyspnea', 'Chest X-ray', 'Increased interstitial markings', 'Fibrosis suspected', 'High-resolution CT advised', 'Pulmonary consultation', 'Requires long-term follow-up', 'Scheduled'),
(134993, 1, 'Lung nodule', 'Chest X-ray', 'Solitary lung nodule', 'Benign features', 'Monitor every 6 months', 'No immediate intervention', 'Patient reassured', 'Completed'),
(134994, 1, 'Pleuritic chest pain', 'Chest X-ray', 'Pleural thickening', 'Possibly old infection', 'No urgent intervention', 'Symptom-based management', 'Advise return if worsens', 'Scheduled'),
(134995, 1, 'Smoking history', 'Chest X-ray', 'Subpleural scarring', 'Likely previous inflammation', 'Smoking cessation recommended', 'Monitor lung health', 'Scheduled follow-up', 'Scheduled'),
(134996, 1, 'Cough with blood', 'Chest X-ray', 'Upper lobe opacity', 'Possible tuberculosis', 'Requires sputum test', 'Refer to infectious disease specialist', 'Referral letter prepared', 'Scheduled'),
(134997, 1, 'Chest discomfort', 'Chest X-ray', 'Calcified granulomas', 'Old healed infection', 'No active disease', 'Routine check recommended', 'Patient reassured', 'Completed'),
(134998, 2, 'Difficulty breathing', 'Chest X-ray', 'Pleural effusion', 'Fluid accumulation', 'Needs drainage', 'Thoracentesis planned', 'Pre-op evaluation', 'Scheduled'),
(134999, 2, 'Unexplained weight loss', 'Chest X-ray', 'Hilar lymphadenopathy', 'Possible lymphoma', 'CT scan and biopsy needed', 'Oncology referral', 'Discussed with patient', 'Scheduled'),
(135000, 2, 'Chronic wheezing', 'Chest X-ray', 'Flattened diaphragm', 'Emphysema features', 'Pulmonary function tests advised', 'Smoking cessation required', 'Scheduled appointment', 'Scheduled'),
(135001, 2, 'Recurrent lung infections', 'Chest X-ray', 'Bronchiectasis signs', 'Chronic lung damage', 'Requires long-term antibiotics', 'Pulmonary rehab recommended', 'Prescription provided', 'Scheduled'),
(135002, 2, 'Night sweats', 'Chest X-ray', 'Patchy lung opacities', 'Active infection suspected', 'Blood cultures needed', 'Hospitalization suggested', 'Awaiting results', 'Scheduled'),
(135003, 2, 'Respiratory distress', 'Chest X-ray', 'Bilateral lung infiltrates', 'ARDS suspected', 'Critical care required', 'Mechanical ventilation prepared', 'Admitted to ICU', 'Completed'),
(135004, 3, 'Chest congestion', 'Chest X-ray', 'Mild peribronchial cuffing', 'Suggestive of viral infection', 'Symptomatic treatment advised', 'Monitor symptoms', 'Follow-up instructions given', 'Completed'),
(135005, 3, 'History of smoking', 'Chest X-ray', 'Emphysematous changes', 'Early-stage COPD', 'Pulmonary function test required', 'Smoking cessation essential', 'Scheduled PFT', 'Scheduled'),
(135006, 3, 'Chronic fatigue', 'Chest X-ray', 'Normal lung fields', 'No acute pathology', 'Reassure patient', 'Lifestyle modifications', 'Discussed healthy habits', 'Completed'),
(135007, 3, 'Asthma check-up', 'Chest X-ray', 'No acute findings', 'Asthma well-controlled', 'Continue current inhalers', 'Annual follow-up advised', 'Next appointment scheduled', 'Scheduled'),
(135008, 3, 'Wheezing', 'Chest X-ray', 'Bronchial wall thickening', 'Airway inflammation', 'Increase inhaler dosage', 'Avoid known triggers', 'Inhaler instructions reviewed', 'Scheduled'),
(135009, 3, 'Occupational exposure', 'Chest X-ray', 'Diffuse lung opacities', 'Possible pneumoconiosis', 'Further occupational health review', 'High-resolution CT required', 'Referral sent', 'Scheduled'),
(135010, 3, 'Lung pain', 'Chest X-ray', 'Pleural effusion', 'Moderate fluid accumulation', 'Evaluate for infection/malignancy', 'Thoracentesis planned', 'Consent obtained', 'Scheduled'),
(135011, 3, 'Tuberculosis screening', 'Chest X-ray', 'Apical scarring', 'Old TB infection', 'Latent TB testing recommended', 'Monitor for reactivation', 'TB test ordered', 'Completed');

-- Insert Images
INSERT INTO Images (XN, record_id, file_path, uploaded_at, processed_at, result) VALUES
(782316, 1, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/778592c49dc5b2bd4f4d4f415e174b5c.png', NOW(), NOW(), 'Normal'),
(782317, 1, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/c6c19cc8f966c6353e663a4e299d9a39.png', NOW(), NOW(), 'Abnormal'),
(782318, 1, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/8de1d1a853009572844969d046f99f6b.png', NOW(), NOW(), 'Abnormal'),
(782319, 1, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/77f4f19048695b17ba4194ae3b9bea8a.png', NOW(), NOW(), 'Normal'),
(782320, 1, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/ab11a974837f5313912804939bfae79e.png', NOW(), NOW(), 'Abnormal'),
(782321, 2, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/ff924bcbd38f123aec723aa7040d7e43.png', NOW(), NOW(), 'Normal'),
(782322, 2, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/71a5a3f60976a7b46875a26dfd7a669e.png', NOW(), NOW(), 'Abnormal'),
(782323, 2, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/15b164c54f0bf0baac308b47a45a1468.png', NOW(), NOW(), 'Abnormal'),
(782324, 2, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/e652b2cebae0a6c74e292b3112d29e6e.png', NOW(), NOW(), 'Abnormal'),
(782325, 3, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/77f4f19048695b17ba4194ae3b9bea8a.png', NOW(), NOW(), 'Normal'),
(782326, 3, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/ab11a974837f5313912804939bfae79e.png', NOW(), NOW(), 'Abnormal'),
(782327, 3, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/ff924bcbd38f123aec723aa7040d7e43.png', NOW(), NOW(), 'Normal'),
(782328, 3, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/71a5a3f60976a7b46875a26dfd7a669e.png', NOW(), NOW(), 'Abnormal'),
(782329, 4, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/77f4f19048695b17ba4194ae3b9bea8a.png', NOW(), NOW(), 'Normal'),
(782330, 4, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/ab11a974837f5313912804939bfae79e.png', NOW(), NOW(), 'Abnormal'),
(782331, 4, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/ff924bcbd38f123aec723aa7040d7e43.png', NOW(), NOW(), 'Normal'),
(782332, 4, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/15b164c54f0bf0baac308b47a45a1468.png', NOW(), NOW(), 'Abnormal'),
(782333, 5, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/e652b2cebae0a6c74e292b3112d29e6e.png', NOW(), NOW(), 'Abnormal');


-- Insert Annotations
INSERT INTO Annotations (image_id, user_id, file_path, created_at) VALUES
(1, 1, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/778592c49dc5b2bd4f4d4f415e174b5c.png', NOW()),
(2, 1, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/778592c49dc5b2bd4f4d4f415e174b5c.png', NOW()),
(3, 1, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/778592c49dc5b2bd4f4d4f415e174b5c.png', NOW()),
(4, 1, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/778592c49dc5b2bd4f4d4f415e174b5c.png', NOW());
