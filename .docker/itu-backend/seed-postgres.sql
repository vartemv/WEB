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
  ('Espresso Beans', 'Coffee', 500, 100, 10),
  ('Cappuccino Powder', 'Coffee', 300, 50, 5),
  ('Latte Mix', 'Coffee', 250, 0, 8), -- Out of stock
  ('French Press', 'Equipment', 1500, 0, 2), -- Out of stock
  ('Coffee Filter Papers', 'Equipment', 100, 0, 20), -- Out of stock
  ('Mugs', 'Tableware', 350, 3, 5), -- Low stock
  ('Sugar Packets', 'Supplies', 50, 1000, 100),
  ('Milk Frother', 'Equipment', 1200, 0, 3), -- Out of stock
  ('Caramel Syrup', 'Supplies', 250, 30, 3),
  ('Pastries', 'Food', 150, 60, 10),
  ('Croissants', 'Food', 200, 0, 5), -- Out of stock
  ('Cold Brew', 'Coffee', 400, 0, 3), -- Out of stock
  ('Almond Milk', 'Beverage', 150, 40, 4),
  ('Green Tea', 'Tea', 200, 100, 10),
  ('Chai Latte', 'Coffee', 350, 50, 5),
  ('Peanut Cookies', 'Snacks', 120, 0, 8), -- Out of stock
  ('Chocolate Chip', 'Snacks', 130, 90, 9),
  ('Granola Bars', 'Snacks', 150, 60, 6),
  ('Bagels', 'Snacks', 100, 0, 5), -- Out of stock
  ('Chips', 'Snacks', 90, 100, 10),
  ('Muffins', 'Snacks', 110, 70, 7),
  ('Notebooks', 'Office Supplies', 200, 200, 20),
  ('Pens', 'Office Supplies', 50, 500, 50),
  ('Highlighter Markers', 'Office Supplies', 70, 0, 30), -- Out of stock
  ('Printer Paper', 'Office Supplies', 300, 0, 15), -- Out of stock
  ('Sticky Notes', 'Office Supplies', 80, 200, 20),
  ('Staplers', 'Office Supplies', 250, 30, 3),
  ('Desk Organizers', 'Office Supplies', 400, 15, 2),
  ('Coffee Cups', 'Supplies', 150, 1000, 100),
  ('Plastic Straws', 'Supplies', 30, 500, 50),
  ('Chai Tea Bags', 'Tea', 100, 0, 150), -- Out of stock
  ('Instant Noodles', 'Snacks', 50, 0, 50), -- Out of stock
  ('Reusable Water', 'Supplies', 350, 120, 100);
