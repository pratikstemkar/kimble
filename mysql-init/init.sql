USE kimbledb;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email varchar(100) UNIQUE NOT NULL,
    firstName varchar(50),
    lastName varchar(50),
    password varchar(100) NOT NULL,
    role varchar(50) DEFAULT "user",
    pfp varchar(255) DEFAULT "https://github.com/shadcn.png",
    otp varchar(6),
    isEmailVerified int(1) DEFAULT 0,
    isDeleted int(1) DEFAULT 0,
    isActive int(1) DEFAULT 1,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    title varchar(100),
    content text,
    img varchar(255),
    isPrivate int(1) DEFAULT 0,
    isUpdated int(1) DEFAULT 0,
    isDeleted int(1) DEFAULT 0,
    updatedAt TIMESTAMP,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (email, firstName, lastName, password, role)
VALUES ('admin@kimble.com', 'Spike', 'Speigel', 'f30aa7a662c728b7407c54ae6bfd27d1', 'admin');
