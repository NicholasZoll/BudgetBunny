--  CREATE TABLE users (
--    id SERIAL PRIMARY KEY,
--    email VARCHAR(255) UNIQUE NOT NULL,
--    password VARCHAR(255) NOT NULL,
--    firstname VARCHAR(100) NOT NULL,
--    lastname VARCHAR(100) NOT NULL
--);



-- CREATE TABLE account (
--     id SERIAL PRIMARY KEY,
--     user_id INT REFERENCES users(id) ON DELETE CASCADE, -- Links account to user
--     name VARCHAR(100) NOT NULL,                          -- e.g., "Checking", "Savings"
--     balance DECIMAL(10, 2) DEFAULT 0.00,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );


-- [This table will store categories for transactions, allowing users to allocate budgets for each envelope. For example, they could allocate $500 monthly for "Groceries."]
-- CREATE TABLE envelope (
--     id SERIAL PRIMARY KEY,
--     user_id INT REFERENCES users(id) ON DELETE CASCADE, -- Links envelope to the user
--     name VARCHAR(100) NOT NULL,                         -- e.g., "Groceries", "Rent"
--     budget DECIMAL(10, 2) DEFAULT 0.00,                 -- Budget allocation for this envelope
--     spent DECIMAL(10, 2) DEFAULT 0.00                   -- Amount already spent within this envelope
-- );


-- [This table will store categories for transactions, allowing users to allocate budgets for each envelope. For example, they could allocate $500 monthly for "Groceries."]
-- CREATE TABLE transaction (
--     id SERIAL PRIMARY KEY,
--     account_id INT REFERENCES account(id) ON DELETE SET NULL,   -- Links to account table
--     envelope_id INT REFERENCES envelope(id) ON DELETE SET NULL, -- Links to envelope table
--     amount DECIMAL(10, 2) NOT NULL,
--     date DATE NOT NULL,
--     title VARCHAR(255) NOT NULL,                                -- Brief description of transaction
--     notes TEXT
-- );

-- CHANGES MADE TO THE SCHEMA

-- add this helps make emails unique and password constraints
-- ALTER TABLE users
-- ADD CONSTRAINT check_password_strength
-- CHECK (LENGTH(password) >= 8 AND password ~ '[0-9\W]');
-- ALTER TABLE users
-- ADD CONSTRAINT unique_email UNIQUE (email);


-- if your current passwords are not meeting the requirements use these commands to change them
-- SELECT * FROM users
-- WHERE LENGTH(password) < 8 OR password !~ '[0-9\W]';

-- UPDATE users
-- SET password = 'TempPass123!' -- Example of a compliant password; consider a secure update process in practice
-- WHERE LENGTH(password) < 8 OR password !~ '[0-9\W]';
