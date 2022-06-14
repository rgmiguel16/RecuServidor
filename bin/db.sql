DROP DATABASE IF EXISTS database_coches;
CREATE DATABASE database_coches;

USE database_coches;

CREATE TABLE users(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL
);

CREATE TABLE coches(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    modelo VARCHAR(150) NOT NULL,
    description TEXT,
    user_id INT UNSIGNED,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)
); 