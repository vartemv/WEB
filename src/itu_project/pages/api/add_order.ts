import prisma from 'db';
import type { NextApiRequest, NextApiResponse } from 'next';
 
type Data = {
	success: boolean;
	info?: any;
};
 
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	let { item, name, address, price, order_date, status } = req.body;

	if (!name || !item || !address || !price || !order_date || !status) {
		res.status(200).json({ success: false });
		return;
	}

	await prisma.order.create({
		data: {
			price,
			item,
			name,
			address,
			status
		}
	});
 
	res.status(200).json({ success: true });
}