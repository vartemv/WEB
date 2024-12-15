CREATE TABLE IF NOT EXISTS orders (
  id Serial PRIMARY KEY,              -- Auto-incrementing ID
  item VARCHAR(255) NOT NULL,         -- Item name
  name VARCHAR(100) NOT NULL,         -- Recipient's name
  address VARCHAR(255) NOT NULL,      -- Delivery address
  status VARCHAR(15) NOT NULL,
  price INTEGER NOT NULL,
  order_date VARCHAR(13) NOT NULL,
  could_be_printed BOOLEAN
);

CREATE TABLE IF NOT EXISTS items (
  id Serial PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(100) NOT NULL,
  price INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  min_stock_level INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS devices (
  id Serial PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  occupied BOOLEAN DEFAULT FALSE,
  photo TEXT
);

INSERT INTO orders (item, name, address, status, price, order_date, could_be_printed) VALUES
('Wireless Mouse', 'John Doe', '123 Elm Street, Springfield, IL', 'Active', 25, '2024-11-10', FALSE);

INSERT INTO orders (item, name, address, status, price, order_date, could_be_printed) VALUES
('Laptop Stand', 'Jane Smith', '456 Maple Avenue, Denver, CO', 'Active', 45, '2024-11-08', FALSE);

INSERT INTO orders (item, name, address, status, price, order_date, could_be_printed) VALUES
('Bluetooth Speaker', 'Alice Johnson', '789 Oak Blvd, Austin, TX', 'Shipped', 60, '2024-11-05', TRUE);

INSERT INTO devices (name, photo) VALUES
('3d printer', '/printer_test.jpg');

INSERT INTO
    items (name, category, price, quantity, min_stock_level)
VALUES
    ('name_1', 'Materials', 25, 35, 20),
    ('name_2', 'Materials', 10, 22, 30),
    ('name_3', 'Food', 25, 7, 5),
    ('name_4', 'Wood Products', 50, 3, 2),
    ('name_5', 'Bathroom', 15, 40, 10),
    ('name_6', 'Bathroom', 12, 0, 5);