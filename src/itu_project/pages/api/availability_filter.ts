// pages/api/items/index.ts
import prisma from 'db';
import type { NextApiRequest, NextApiResponse } from 'next';


type Data = {
  success: boolean;
  data?: any;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    const { availability } = req.query;

    const items = await prisma.items.findMany(
			{
				orderBy: [
					{
						id: 'asc',
					}
				]
			}
		);

    let filteredItems;

    switch (availability) {
      case 'In stock':
        filteredItems = items.filter(item => item.quantity > 0 && item.quantity > item.min_stock_level);
        break;
      case 'Low stock':
        filteredItems = items.filter(
          item => item.quantity > 0 && item.quantity <= item.min_stock_level
        );
        break;
      case 'Out of stock':
        filteredItems = items.filter(item => item.quantity === 0);
        break;
      default:
        filteredItems = items;
        break;
    }

    res.status(200).json({ success: true, data: filteredItems });
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ success: false, data: 'Failed to fetch items' });
  }
}