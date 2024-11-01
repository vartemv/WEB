CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,              -- Auto-incrementing ID
  item VARCHAR(255) NOT NULL,         -- Item name
  name VARCHAR(100) NOT NULL,         -- Recipient's name
  address VARCHAR(255) NOT NULL,        -- Delivery address
  item_id VARCHAR(16) NOT NULL
 );

INSERT INTO orders (item, name, address, item_id) VALUES
  ('Laptop', 'John Doe', '123 Maple St, Springfield, IL', '1234567890'),
  ('Headphones', 'Jane Smith', '456 Oak St, Lincoln, NE', '1234568654'),
  ('Smartphone', 'Emily Johnson', '789 Pine St, Madison, WI', '12345634567'),
  ('Tablet', 'Michael Brown', '321 Birch St, Denver, CO', '1234566426'),
  ('Camera', 'Linda Green', '654 Cedar St, Portland, OR', '123463510');