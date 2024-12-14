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

CREATE TABLE IF NOT EXISTS chart_settings (
  id Serial PRIMARY KEY,              -- Auto-incrementing ID
  chartType VARCHAR(50) NOT NULL,     -- Chart type
  year VARCHAR(4) NOT NULL,           -- Year
  month VARCHAR(20) NOT NULL,         -- Month
  itemType VARCHAR(50) NOT NULL,      -- Item type
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Creation timestamp
);

CREATE TABLE IF NOT EXISTS chart_notes (
  id Serial PRIMARY KEY,              
  chart_id INTEGER NOT NULL,          
  note TEXT NOT NULL,                 
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (chart_id) REFERENCES chart_settings(id) ON DELETE CASCADE
);

INSERT INTO orders (item, name, address, status, price, order_date) VALUES
('Wireless Mouse', 'John Doe', '123 Elm Street, Springfield, IL', 'Active', 25, '2024-11-10');

INSERT INTO orders (item, name, address, status, price, order_date) VALUES
('Laptop Stand', 'Jane Smith', '456 Maple Avenue, Denver, CO', 'Active', 45, '2024-11-08');

INSERT INTO orders (item, name, address, status, price, order_date) VALUES
('Bluetooth Speaker', 'Alice Johnson', '789 Oak Blvd, Austin, TX', 'Shipped', 60, '2024-11-05');

INSERT INTO chart_settings (chartType, year, month, itemType) VALUES
('Pie', '2024', 'Current', 'Orders state');

INSERT INTO chart_settings (chartType, year, month, itemType) VALUES
('Bar', '2024', 'Current', 'Orders state');
