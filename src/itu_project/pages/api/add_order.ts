import prisma from 'db';
import type { NextApiRequest, NextApiResponse } from 'next';
 
type Data = {
	success: boolean;
	info?: any;
};
 
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	let { item, name, address, item_id } = req.body;
 
    console.log(req.body);

	if (!name || !item || !address || !item_id) {
		res.status(200).json({ success: false });
	}
 
	await prisma.order.create({
		data: {
			item,
			name,
			address,
            item_id
		}
	});
 
	res.status(200).json({ success: true });
}