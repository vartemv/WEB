import prisma from 'db';
import type { NextApiRequest, NextApiResponse } from 'next';
 
type Data = {
	success: boolean;
	info?: any;
};
 
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	let { item_id } = req.body;
    
	if (!item_id) {
		res.status(200).json({ success: false });
		return;
	}

	await prisma.items.delete({
		where: {
			id: item_id,
		}
	});
 
	res.status(200).json({ success: true });
}