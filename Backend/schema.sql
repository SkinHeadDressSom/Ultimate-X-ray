-- Create Enum Type
CREATE TYPE status_type AS ENUM ('Scheduled', 'Completed');
CREATE TYPE role_type AS ENUM ('Rediologist Technician', 'General Practitioner', 'Radiologist');
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
    recommendations TEXT,                       -- recommendation for patient behavior ??
    action_comments TEXT,                       -- action comment for doctors to proceed on ??,
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
    CONSTRAINT unique_image_user UNIQUE (image_id, user_id)
);


-- Insert Users
INSERT INTO Users ( name, username, password_hash, role) VALUES
('Thomas Shelby', 'test', '$2a$10$JJsQTNUQyWnp89rdvkAXgOTSdfTKN9pq1L277KW/.wMqwiW234jvm', 'General Practitioner'),
('Test User 1', 'usability_test_01', '$2a$10$ycZ1rQkZ8eBohTXAGj2P4eP4aBrZXaRCWZBNKU25jwFTnmCrWOhvS', 'General Practitioner'),
('Test User 2', 'usability_test_02', '$2a$10$m7D2OwKCyHhK96ROy8L1zeCZC8MrEZZ7Q38kaA4b/YvHeqLNyM5VO', 'General Practitioner'),
('Test User 3', 'usability_test_03', '$2a$10$Z9V2R8N3ntGLRoQAw1gXzOaRqtHqHdSxT6.3C3ozZoHTyG9FAHyra', 'General Practitioner'),
('Test User 4', 'usability_test_04', '$2a$10$twZTffGzFxW/9H9hWrV/Oetm8jKPSFi7YTeoeE10pn82FNVIFDZDa', 'General Practitioner'),
('Test User 5', 'usability_test_05', '$2a$10$dc4AuwRPTZ9n9U3cSGfMTurcD5PuBguqlx1jwCrPp1StvzhMP/Afq', 'General Practitioner');


-- Insert Patients
INSERT INTO Patients (HN, first_name, last_name, date_of_birth, sex, height, weight, phone, address) VALUES
(93800044, 'Alice', 'Brown', '1982-03-11', 'Female', 170, 65, '3216549870', '789 Pine St'),
(93800045, 'Charlie', 'Davis', '1995-12-02', 'Male', 175, 80, '6549873210', '123 Oak St'),
(93800046, 'Emily', 'Evans', '1988-09-14', 'Female', 160, 55, '7890123456', '456 Maple St'),
(93800047, 'Frank', 'Alice', '1975-11-30', 'Male', 185, 90, '8901234567', '789 Cedar St'),
(93800048, 'Davis', 'Hall', '1993-01-19', 'Female', 155, 50, '9012345678', '123 Walnut St');

-- Insert MedicalRecords
INSERT INTO MedicalRecords (AN, patient_id, clinical_history, examination_details, description, findings, impression, recommendations, action_comments, status, created_at, updated_at) 
VALUES 
(134994,1,
'Female, 43 y/o, generally healthy.
Complains of vague upper back discomfort persisting for the past few weeks, especially when sitting for prolonged periods.
No chest pain, dyspnea, syncope, or palpitations.
No family history of cardiovascular disease.
Never smoked. No known history of hypertension or connective tissue disorders.
Physical exam unremarkable, further evaluation with imaging requested due to persistent symptoms.', 
'- Vital Signs: BP 128/82 mmHg, HR 70 bpm, RR 16, Temp 36.7°C, SpO₂ 99% RA
- CVS: S1S2 normal, no murmurs, no displaced apex beat
- Resp: Lungs clear bilaterally
- Abdomen: Normal, no tenderness or organomegaly
- Initial imaging (CXR) suggests prominence of mediastinum; CT chest ordered for further evaluation', 
'Aortic enlargement',
'Chest X-ray shows subtle mediastinal widening. No pulmonary infiltrates or effusion. Heart size within normal limits.
Initial l   abs within normal limits.',
'Unexplained upper back discomfort. Suspicion of vascular cause due to mediastinal contour on imaging.
Aortic pa   thology (e.g., dilatation) cannot be ruled out at this stage.', 
'- Proceed with CT Chest with contrast for detailed evaluation of the thoracic aorta
- Monitor blood pressure regularly
- Advise patient to report any chest pain, shortness of breath, or syncope immediately
',
'CT Chest ordered to further evaluate possible aortic pathology. Patient advised on red-flag symptoms and scheduled for follow-up. BP log initiated.',
'Completed',
'2015-04-07 08:30:00',
'2015-04-05 08:30:00'),
(134995, 1,
'Female, 43 y/o, no significant medical history.
No chest pain but occasional mild discomfort in the back.
No shortness of breath (SOB), syncope, or palpitation.
Non-smoker, no known connective tissue disease.
Aortic enlargement found incidentally on imaging during routine check-up.', 
'- Vital Signs: BP 130/85 mmHg, HR 72 bpm, RR 16, Temp 36.6°C, SpO₂ 98% RA
- CVS: S1S2 normal, no murmur, peripheral pulses equal
- Resp: Clear breath sounds B/L
- Abdomen: Soft, non-tender, no palpable mass
- Imaging: CT Chest shows aortic dilatation ~4.2 cm at ascending aorta, no dissection seen.', 
'Aortic enlargement', NULL, NULL, NULL, NULL, 'Scheduled','2025-04-07 08:30:00', NULL),
(134996, 2, 'Cough with blood', 'Chest X-ray', 'Upper lobe opacity', 'Possible tuberculosis', 'Requires sputum test', 'Refer to infectious disease specialist', 'Referral letter prepared', 'Scheduled','2015-02-01 08:30:00', '2015-02-03 10:15:00'),
(134997, 2, 'Chest discomfort', 'Chest X-ray', 'Calcified granulomas', 'Old healed infection', 'No active disease', 'Routine check recommended', 'Patient reassured', 'Completed','2020-02-01 08:30:00', '2020-02-03 10:15:00'),
(134998, 2, 'Difficulty breathing', 'Chest X-ray', 'Pleural effusion', 'Fluid accumulation', 'Needs drainage', 'Thoracentesis planned', 'Pre-op evaluation', 'Scheduled','2020-05-01 08:30:00', '2020-05-03 10:15:00'),
(134999, 2, 'Unexplained weight loss', 'Chest X-ray', 'Hilar lymphadenopathy', 'Possible lymphoma', 'CT scan and biopsy needed', 'Oncology referral', 'Discussed with patient', 'Scheduled','2020-05-01 10:30:00', '2020-05-03 12:15:00'),
(135000, 2, 'Chronic wheezing', 'Chest X-ray', 'Flattened diaphragm', 'Emphysema features', 'Pulmonary function tests advised', 'Smoking cessation required', 'Scheduled appointment', 'Scheduled','2022-02-01 08:30:00', '2022-02-03 10:15:00'),
(135001, 2, 'Recurrent lung infections', 'Chest X-ray', 'Bronchiectasis signs', 'Chronic lung damage', 'Requires long-term antibiotics', 'Pulmonary rehab recommended', 'Prescription provided', 'Scheduled','2023-02-01 08:30:00', '2023-02-03 10:15:00'),
(135002, 2, 'Night sweats', 'Chest X-ray', 'Patchy lung opacities', 'Active infection suspected', 'Blood cultures needed', 'Hospitalization suggested', 'Awaiting results', 'Scheduled','2024-02-01 08:30:00', '2024-02-03 10:15:00'),
(135003, 2, 'Respiratory distress', 'Chest X-ray', 'Bilateral lung infiltrates', 'ARDS suspected', 'Critical care required', 'Mechanical ventilation prepared', 'Admitted to ICU', 'Completed','2024-02-01 08:31:00', '2024-02-03 10:16:00'),
(135004, 2, 'Night sweats', 'Chest X-ray', 'Patchy lung opacities', 'Active infection suspected', 'Blood cultures needed', 'Hospitalization suggested', 'Awaiting results', 'Scheduled','2024-02-02 08:30:00', '2024-02-03 10:15:00'),
(135005, 2, 'Respiratory distress', 'Chest X-ray', 'Bilateral lung infiltrates', 'ARDS suspected', 'Critical care required', 'Mechanical ventilation prepared', 'Admitted to ICU','Scheduled','2024-02-03 08:30:00', '2024-02-04 10:15:00'),
(135006, 2, 'Chronic wheezing', 'Chest X-ray', 'Flattened diaphragm', 'Emphysema features', 'Pulmonary function tests advised', 'Smoking cessation required', 'Scheduled appointment', 'Scheduled','2025-02-01 08:30:00', '2024-02-03 10:15:00'),
(135007, 2, 'Recurrent lung infections', 'Chest X-ray', 'Bronchiectasis signs', 'Chronic lung damage', 'Requires long-term antibiotics', 'Pulmonary rehab recommended', 'Prescription provided','Completed','2025-02-01 08:30:01', '2025-02-03 10:15:01' ),
(136004, 3, 'Chest congestion', 'Chest X-ray', 'Mild peribronchial cuffing', 'Suggestive of viral infection', 'Symptomatic treatment advised', 'Monitor symptoms', 'Follow-up instructions given', 'Completed','2015-02-01 08:30:00', '2015-02-03 10:15:00'),
(136005, 3, 'History of smoking', 'Chest X-ray', 'Emphysematous changes', 'Early-stage COPD', 'Pulmonary function test required', 'Smoking cessation essential', 'Scheduled PFT', 'Scheduled','2020-02-01 08:30:00', '2020-02-03 10:15:00'),
(136006, 3, 'Chronic fatigue', 'Chest X-ray', 'Normal lung fields', 'No acute pathology', 'Reassure patient', 'Lifestyle modifications', 'Discussed healthy habits', 'Completed','2020-05-01 08:30:00', '2020-05-03 10:15:00'),
(136007, 3, 'Asthma check-up', 'Chest X-ray', 'No acute findings', 'Asthma well-controlled', 'Continue current inhalers', 'Annual follow-up advised', 'Next appointment scheduled', 'Scheduled','2020-05-01 10:30:00', '2020-05-03 12:15:00'),
(136008, 3, 'Wheezing', 'Chest X-ray', 'Bronchial wall thickening', 'Airway inflammation', 'Increase inhaler dosage', 'Avoid known triggers', 'Inhaler instructions reviewed', 'Scheduled','2022-02-01 08:30:00', '2022-02-03 10:15:00'),
(136009, 3, 'Occupational exposure', 'Chest X-ray', 'Diffuse lung opacities', 'Possible pneumoconiosis', 'Further occupational health review', 'High-resolution CT required', 'Referral sent', 'Scheduled','2023-02-01 08:30:00', '2023-02-03 10:15:00'),
(136010, 3, 'Lung pain', 'Chest X-ray', 'Pleural effusion', 'Moderate fluid accumulation', 'Evaluate for infection/malignancy', 'Thoracentesis planned', 'Consent obtained', 'Scheduled','2024-02-01 08:30:00', '2024-02-03 10:15:00'),
(136011, 3, 'Occupational exposure', 'Chest X-ray', 'Diffuse lung opacities', 'Possible pneumoconiosis', 'Further occupational health review', 'High-resolution CT required', 'Referral sent', 'Scheduled','2024-02-01 08:31:00', '2024-02-03 10:16:00'),
(136012, 3, 'Lung pain', 'Chest X-ray', 'Pleural effusion', 'Moderate fluid accumulation', 'Evaluate for infection/malignancy', 'Thoracentesis planned', 'Consent obtained', 'Scheduled','2024-02-02 08:30:00', '2024-02-03 10:15:00'),
(136013, 3, 'Chronic fatigue', 'Chest X-ray', 'Normal lung fields', 'No acute pathology', 'Reassure patient', 'Lifestyle modifications', 'Discussed healthy habits', 'Completed','2024-02-03 08:30:00', '2024-02-04 10:15:00'),
(136014, 3, 'Asthma check-up', 'Chest X-ray', 'No acute findings', 'Asthma well-controlled', 'Continue current inhalers', 'Annual follow-up advised', 'Next appointment scheduled', 'Scheduled','2025-02-01 08:30:00', '2024-02-03 10:15:00'),
(136015, 3, 'Tuberculosis screening', 'Chest X-ray', 'Apical scarring', 'Old TB infection', 'Latent TB testing recommended', 'Monitor for reactivation', 'TB test ordered', 'Completed','2025-02-01 08:30:01', '2025-02-03 10:15:01');

-- Insert Images
INSERT INTO Images (XN, record_id, file_path, uploaded_at, processed_at, result) VALUES
(782317, 1, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/original-images/1-1.png', '1982-07-22 14:23:45', '1982-07-22 13:55:12', 'Abnormal'),
(782318, 1, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/original-images/1-2.png', '2002-03-17 07:42:50', '2002-03-17 07:40:50', 'Abnormal'),
(782319, 2, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/original-images/2-1.png', '1689-09-16 21:45:10', '1689-09-16 21:11:38', 'Normal'),
(782320, 2, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/original-images/2-2.png', '2016-12-08 05:37:55', '2016-12-08 05:09:21', 'Normal'),
(782321, 3, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/original-images/71a5a3f60976a7b46875a26dfd7a669e.png', '2008-04-02 00:09:21', '2008-04-01 23:58:55', 'Abnormal'),
(782322, 3, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/original-images/15b164c54f0bf0baac308b47a45a1468.png', '2111-12-06 00:17:24', '2111-12-06 21:28:15', 'Abnormal'),
(782323, 3, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/original-images/ff924bcbd38f123aec723aa7040d7e43.png', '2001-08-25 08:51:31', '2001-08-24 12:01:11', 'Normal'),
(782324, 3, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/original-images/71a5a3f60976a7b46875a26dfd7a669e.png', '1999-10-19 00:17:21', '1999-10-20 00:00:01', 'Abnormal'),
(782325, 4, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/original-images/ff924bcbd38f123aec723aa7040d7e43.png', '2024-01-26 12:01:56', '2024-01-26 14:21:01', 'Normal'),
(782326, 4, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/original-images/15b164c54f0bf0baac308b47a45a1468.png', '2022-02-11 18:11:47', '2022-02-11 23:49:52', 'Abnormal'),
(782327, 5, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/original-images/ff924bcbd38f123aec723aa7040d7e43.png', '2001-08-25 08:51:31', '2001-08-24 12:01:11', 'Normal'),
(782328, 5, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/original-images/71a5a3f60976a7b46875a26dfd7a669e.png', '1999-10-19 00:17:21', '1999-10-20 00:00:01', 'Abnormal'),
(782329, 6, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/original-images/c6c19cc8f966c6353e663a4e299d9a39.png', '1982-07-22 14:23:45', '1982-07-22 13:55:12', 'Abnormal'),
(782330, 6, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/original-images/8de1d1a853009572844969d046f99f6b.png', '2002-03-17 07:42:50', '2002-03-17 07:40:50', 'Abnormal'),
(782331, 7, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/original-images/c6c19cc8f966c6353e663a4e299d9a39.png', '1689-09-16 21:45:10', '1689-09-16 21:11:38', 'Normal'),
(782332, 7, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/original-images/ff924bcbd38f123aec723aa7040d7e43.png', '2016-12-08 05:37:55', '2016-12-08 05:09:21', 'Normal'),
(782333, 8, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/original-images/71a5a3f60976a7b46875a26dfd7a669e.png', '2008-04-02 00:09:21', '2008-04-01 23:58:55', 'Abnormal'),
(782334, 8, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/original-images/15b164c54f0bf0baac308b47a45a1468.png', '2111-12-06 00:17:24', '2111-12-06 21:28:15', 'Abnormal'),
(782335, 9, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/original-images/ff924bcbd38f123aec723aa7040d7e43.png', '2001-08-25 08:51:31', '2001-08-24 12:01:11', 'Normal'),
(782336, 9, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/original-images/71a5a3f60976a7b46875a26dfd7a669e.png', '1999-10-19 00:17:21', '1999-10-20 00:00:01', 'Abnormal'),
(782337, 10, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/original-images/ff924bcbd38f123aec723aa7040d7e43.png', '2024-01-26 12:01:56', '2024-01-26 14:21:01', 'Normal'),
(782338, 10, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/original-images/15b164c54f0bf0baac308b47a45a1468.png', '2022-02-11 18:11:47', '2022-02-11 23:49:52', 'Abnormal'),
(782339, 11, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/original-images/c6c19cc8f966c6353e663a4e299d9a39.png', '1982-07-22 14:23:45', '1982-07-22 13:55:12', 'Abnormal'),
(782340, 11, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/original-images/8de1d1a853009572844969d046f99f6b.png', '2002-03-17 07:42:50', '2002-03-17 07:40:50', 'Abnormal'),
(782341, 12, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/original-images/c6c19cc8f966c6353e663a4e299d9a39.png', '1689-09-16 21:45:10', '1689-09-16 21:11:38', 'Normal'),
(782342, 12, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/original-images/ff924bcbd38f123aec723aa7040d7e43.png', '2016-12-08 05:37:55', '2016-12-08 05:09:21', 'Normal');

-- Insert Annotations
INSERT INTO Annotations (image_id, user_id, file_path, created_at) VALUES
(5, 1, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/annotation-images/778592c49dc5b2bd4f4d4f415e174b5c.png', '1982-07-22 14:35:45'),
(6, 1, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/annotation-images/77f4f19048695b17ba4194ae3b9bea8a.png', '2002-03-17 08:20:30'),
(7, 1, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/annotation-images/e652b2cebae0a6c74e292b3112d29e6e.png', '1689-09-16 22:02:10'),
(8, 1, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/annotation-images/ab11a974837f5313912804939bfae79e.png', '2016-12-08 00:15:21'),
(9, 1, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/annotation-images/778592c49dc5b2bd4f4d4f415e174b5c.png', '1982-07-22 14:35:45'),
(10, 1, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/annotation-images/77f4f19048695b17ba4194ae3b9bea8a.png', '2002-03-17 08:20:30'),
(11, 1, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/annotation-images/e652b2cebae0a6c74e292b3112d29e6e.png', '1689-09-16 22:02:10'),
(12, 1, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/annotation-images/ab11a974837f5313912804939bfae79e.png', '2016-12-08 00:15:21'),
(13, 1, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/annotation-images/778592c49dc5b2bd4f4d4f415e174b5c.png', '1982-07-22 14:35:45'),
(14, 1, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/annotation-images/77f4f19048695b17ba4194ae3b9bea8a.png', '2002-03-17 08:20:30'),
(15, 1, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/annotation-images/e652b2cebae0a6c74e292b3112d29e6e.png', '1689-09-16 22:02:10'),
(16, 1, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/annotation-images/ab11a974837f5313912804939bfae79e.png', '2016-12-08 00:15:21'),
(17, 1, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/annotation-images/778592c49dc5b2bd4f4d4f415e174b5c.png', '1982-07-22 14:35:45'),
(18, 1, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/annotation-images/77f4f19048695b17ba4194ae3b9bea8a.png', '2002-03-17 08:20:30'),
(19, 1, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/annotation-images/e652b2cebae0a6c74e292b3112d29e6e.png', '1689-09-16 22:02:10'),
(20, 1, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/annotation-images/ab11a974837f5313912804939bfae79e.png', '2016-12-08 00:15:21'),
(21, 1, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/annotation-images/778592c49dc5b2bd4f4d4f415e174b5c.png', '1982-07-22 14:35:45'),
(22, 1, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/annotation-images/77f4f19048695b17ba4194ae3b9bea8a.png', '2002-03-17 08:20:30'),
(23, 1, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/annotation-images/e652b2cebae0a6c74e292b3112d29e6e.png', '1689-09-16 22:02:10'),
(24, 1, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/annotation-images/ab11a974837f5313912804939bfae79e.png', '2016-12-08 00:15:21'),
(25, 1, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/annotation-images/778592c49dc5b2bd4f4d4f415e174b5c.png', '1982-07-22 14:35:45'),
(26, 1, 'https://iweidiuzppeplwhnvedr.supabase.co/storage/v1/object/public/pacs/annotation-images/77f4f19048695b17ba4194ae3b9bea8a.png', '2002-03-17 08:20:30');
