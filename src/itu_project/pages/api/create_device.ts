import prisma from 'db';
import type { NextApiRequest, NextApiResponse } from 'next';
 
type Data = {
	success: boolean;
	info?: any;
};
 
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	let { name, photo } = req.body;

	if (!name || !photo) {
		res.status(200).json({ success: false });
		return;
	}

	await prisma.devices.create({
		data: {
			name,
            photo,
            occupied: false,
		}
	});
 
	res.status(200).json({ success: true });
}