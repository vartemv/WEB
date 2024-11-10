CREATE TABLE IF NOT EXISTS orders (
  id Serial PRIMARY KEY,              -- Auto-incrementing ID
  item VARCHAR(255) NOT NULL,         -- Item name
  name VARCHAR(100) NOT NULL,         -- Recipient's name
  address VARCHAR(255) NOT NULL,        -- Delivery address
  status VARCHAR(15) NOT NULL,
  price INTEGER NOT NULL,
  order_date VARCHAR(13) NOT NULL
 );

INSERT INTO orders (item, name, address, status, price, order_date) VALUES
('Wireless Mouse', 'John Doe', '123 Elm Street, Springfield, IL', 'Active', 25, '2024-11-10');


INSERT INTO orders (item, name, address, status, price, order_date) VALUES
('Laptop Stand', 'Jane Smith', '456 Maple Avenue, Denver, CO', 'Active', 45, '2024-11-08');


INSERT INTO orders (item, name, address, status, price, order_date) VALUES
('Bluetooth Speaker', 'Alice Johnson', '789 Oak Blvd, Austin, TX', 'Shipped', 60, '2024-11-05');