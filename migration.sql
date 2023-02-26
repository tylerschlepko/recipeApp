DROP TABLE IF EXISTS recipes;
DROP TABLE IF EXISTS users;


CREATE TABLE users (
    id SERIAL PRIMARY KEY NOT NULL, 
    username VARCHAR(200) UNIQUE NOT NULL,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(200) UNIQUE NOT NULL,
    password VARCHAR NOT NULL
);

CREATE TABLE recipes (
    id SERIAL PRIMARY KEY NOT NULL,
    img_path TEXT NOT NULL,
    title VARCHAR NOT NULL,
    instructions VARCHAR NOT NULL,
    description VARCHAR NOT NULL,
    ingredients VARCHAR NOT NULL,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);