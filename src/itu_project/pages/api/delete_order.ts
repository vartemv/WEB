import prisma from 'db';
import type { NextApiRequest, NextApiResponse } from 'next';
 
type Data = {
	success: boolean;
	info?: any;
};
 
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	let { id } = req.body;
	if (!id) {
		res.status(200).json({ success: false });
		return;
	}

	await prisma.order.delete({
		where: {
			id: id,
		}
	});
 
	res.status(200).json({ success: true });
}