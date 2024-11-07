CREATE TABLE IF NOT EXISTS orders (
  id Serial PRIMARY KEY,              -- Auto-incrementing ID
  item VARCHAR(255) NOT NULL,         -- Item name
  name VARCHAR(100) NOT NULL,         -- Recipient's name
  address VARCHAR(255) NOT NULL,        -- Delivery address
  status VARCHAR(15) NOT NULL,
  price INTEGER NOT NULL,
  order_date VARCHAR(13) NOT NULL
 );