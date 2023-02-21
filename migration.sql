DROP TABLE IF EXISTS recipes;

CREATE TABLE recipes (
    id SERIAL PRIMARY KEY,
    img_path TEXT,
    title VARCHAR,
    instructions VARCHAR,
    description VARCHAR,
    ingredients VARCHAR
);