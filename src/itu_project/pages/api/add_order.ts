import prisma from 'db';
import type { NextApiRequest, NextApiResponse } from 'next';
 
type Data = {
	success: boolean;
	info?: any;
};
 
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	let { item, name, address, price, order_date, status, could_be_printed } = req.body;

	if (!name || !item || !address || !price || !order_date || !status) {
		res.status(400).json({ success: false });
		return;
	}

	price = parseFloat(price);


	await prisma.orders.create({
		data: {
			price,
			item,
			name,
			address,
			status,
			order_date,
			could_be_printed
		}
	});
 
	res.status(200).json({ success: true });
}