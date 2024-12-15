CREATE TABLE IF NOT EXISTS orders (
  id Serial PRIMARY KEY,              -- Auto-incrementing ID
  item VARCHAR(255) NOT NULL,         -- Item name
  name VARCHAR(100) NOT NULL,         -- Recipient's name
  address VARCHAR(255) NOT NULL,      -- Delivery address
  status VARCHAR(15) NOT NULL,
  price INTEGER NOT NULL,
  order_date VARCHAR(13) NOT NULL
);

CREATE TABLE IF NOT EXISTS items (
  id INTEGER PRIMARY KEY,
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

INSERT INTO orders (item, name, address, status, price, order_date) VALUES
('Wireless Mouse', 'John Doe', '123 Elm Street, Springfield, IL', 'Active', 25, '2024-11-10');

INSERT INTO orders (item, name, address, status, price, order_date) VALUES
('Laptop Stand', 'Jane Smith', '456 Maple Avenue, Denver, CO', 'Active', 45, '2024-11-08');

INSERT INTO orders (item, name, address, status, price, order_date) VALUES
('Bluetooth Speaker', 'Alice Johnson', '789 Oak Blvd, Austin, TX', 'Shipped', 60, '2024-11-05');

INSERT INTO devices (name, photo) VALUES
('3d printer', '/printer_test.jpg');