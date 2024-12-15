import prisma from 'db';
import type { NextApiRequest, NextApiResponse } from 'next';
 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	let { deviceID } = req.body;

	if (!deviceID) {
		res.status(400).json({ success: false });
		return;
	}

	await prisma.devices.update({
        where: {
            id: deviceID, // The group_name for the group you want to update
        },
        data: {
            occupied: true
        },
    });
 
	res.status(200).json({ success: true });
}