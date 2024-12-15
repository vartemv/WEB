import prisma from 'db';
import type { NextApiRequest, NextApiResponse } from 'next';
 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	let { status, id } = req.body;

	if (!status || !id) {
		res.status(400).json({ success: false });
		return;
	}

	await prisma.orders.update({
        where: {
            id: id, // The group_name for the group you want to update
        },
        data: {
            status: status
        },
    });
 
	res.status(200).json({ success: true });
}