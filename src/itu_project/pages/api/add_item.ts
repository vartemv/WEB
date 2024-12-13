import prisma from 'db';
import type { NextApiRequest, NextApiResponse } from 'next';
 
type Data = {
	success: boolean;
	info?: any;
};
 
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	let { id, name, category, price, quantity, min_stock_level } = req.body;

	if (!id || !name || !category || !price || !quantity || !min_stock_level) {
		res.status(200).json({ success: false });
		return;
	}

    id = parseInt(id);
    price = parseFloat(price);
    quantity = parseInt(quantity);
    min_stock_level = parseInt(min_stock_level);

	await prisma.items.create({
		data: {
			id,
			name,
			category,
			price,
			quantity,
			min_stock_level
		}
	});
 
	res.status(200).json({ success: true });
}