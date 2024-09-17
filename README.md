CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    employeeID VARCHAR(50) NOT NULL UNIQUE,
    department ENUM('Store', 'HR', 'Production','Machine','Maintance','SOP|WI','Logistics','Quality','Calibration','FQC','IQC','IPQC','EHS') NOT NULL,
    designation ENUM('Admin', 'Supervisor', 'Worker') NOT NULL,
    password VARCHAR(255) NOT NULL,
    shift ENUM('A', 'B') NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE documents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
	fileNo VARCHAR(50) NOT NULL ,  
    fileVersion VARCHAR(50) NOT NULL,
    category ENUM('Policies', 'Form Format', 'Work Instructions','SOP') NOT NULL ,
	status ENUM('Approved', 'Rejected', 'Pending') DEFAULT 'Pending',
    fileUrl VARCHAR(255) NOT NULL,
    department VARCHAR(100) NOT NULL,
    designation VARCHAR(100) NOT NULL,
    shift VARCHAR(100) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
