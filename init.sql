CREATE DATABASE kimbledb;

USE kimbledb;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email varchar(100) UNIQUE,
    firstName varchar(50),
    lastName varchar(50),
    password varchar(100),
    role varchar(50),
    otp varchar(6),
    isEmailVerified int(1) default 0,
    createdAt TIMESTAMP default CURRENT_TIMESTAMP
);

CREATE TABLE posts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title varchar(100),
    content text,
    user_id INT,
    createdAt TIMESTAMP default CURRENT_TIMESTAMP
);