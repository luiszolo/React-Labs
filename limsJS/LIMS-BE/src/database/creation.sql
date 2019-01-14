CREATE DATABASE IF NOT EXISTS LIMS;

USE LIMS;

CREATE TABLE IF NOT EXISTS `Operator` (
	id INT NOT NULL PRIMARY KEY,
	name VARCHAR(99) NOT NULL
);

CREATE TABLE IF NOT EXISTS `Status` (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(99) NOT NULL
);

CREATE TABLE IF NOT EXISTS `Test` (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(199) NOT NULL,
	samplesLength INT NOT NULL,
	status BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS `Attribute` (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(99) NOT NULL,
	unit VARCHAR(99) NOT NULL
);

CREATE TABLE IF NOT EXISTS `Sample` (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(99) NOT NULL
);

CREATE TABLE IF NOT EXISTS `SampleValue` (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	sample_Id INT NOT NULL,
	test_Id INT NOT NULL,
	attribute_Id INT NOT NULL,
	value VARCHAR(99) NOT NULL,
	CONSTRAINT `fk_SampleValue_sample_id` FOREIGN KEY (sample_Id) REFERENCES `Sample`(id),
	CONSTRAINT `fk_SampleValue_test_id` FOREIGN KEY (test_Id) REFERENCES `Test`(id),
	CONSTRAINT `fk_SampleValue_attribute_id` FOREIGN KEY (attribute_Id) REFERENCES `Attribute`(id)
);

CREATE TABLE IF NOT EXISTS `Log` (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	operator_Id INT NOT NULL,
	sample_Id INT NOT NULL,
	test_Id INT NOT NULL,
	status_Id INT NOT NULL,
	onCreated DATETIME NOT NULL,
	CONSTRAINT `fk_Log_test_id` FOREIGN KEY (test_Id) REFERENCES `Test`(id),
	CONSTRAINT `fk_Log_operator_id` FOREIGN KEY (operator_Id) REFERENCES `Operator`(id),
	CONSTRAINT `fk_Log_sample_id` FOREIGN KEY (sample_Id) REFERENCES `Sample`(id),
	CONSTRAINT `fk_Log_status_id` FOREIGN KEY (status_Id) REFERENCES `Status`(id)
);

CREATE TABLE IF NOT EXISTS `TestAttributes` (
	test_Id INT NOT NULL,
	attribute_Id INT NOT NULL,
	CONSTRAINT `fk_TestAttributes_test_id` FOREIGN KEY (test_Id) REFERENCES `Test`(id),
	CONSTRAINT `fk_TestAttributes_attribute_id` FOREIGN KEY (attribute_Id) REFERENCES `Attribute`(id)
);

CREATE TABLE IF NOT EXISTS `TestStatus` (
	test_Id INT NOT NULL,
	prev_State INT NULL,
	post_State INT NOT NULL,
	CONSTRAINT `fk_TestStatus_test_id` FOREIGN KEY (test_Id) REFERENCES `Test`(id),
	CONSTRAINT `fk_TestStatus_prev_state` FOREIGN KEY (prev_State) REFERENCES `Status`(id),
	CONSTRAINT `fk_TestStatus_post_state` FOREIGN KEY (prev_State) REFERENCES `Status`(id)
);
