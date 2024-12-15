import prisma from 'db';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    success : boolean;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    let { id, name, category, price, quantity, min_stock_level } = req.body;
    
	if ( !name || !category || (!price && price !== 0) || (!quantity && quantity !== 0) || (!min_stock_level && min_stock_level !== 0)) {
		res.status(200).json({ success: false });
		return;
	}

    price = parseFloat(price);
    quantity = parseInt(quantity);
    min_stock_level = parseInt(min_stock_level);

    await prisma.items.update({
        where: {
          id: id,
        },
        data: {
			name,
			category,
			price,
			quantity,
			min_stock_level
		},
      })

    res.status(200).json({ success: true });
}