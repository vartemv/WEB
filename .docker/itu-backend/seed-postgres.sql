CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,              -- Auto-incrementing ID
  item VARCHAR(255) NOT NULL,         -- Item name
  name VARCHAR(100) NOT NULL,         -- Recipient's name
  address VARCHAR(255) NOT NULL,        -- Delivery address
  item_id VARCHAR(16) NOT NULL
 );