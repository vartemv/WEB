import prisma from 'db';
import type { NextApiRequest, NextApiResponse } from 'next';
 
type Data = {
	success: boolean;
	data?: any;
};
 
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	try {
		const { category } = req.query;

		console.log("Category: " + category);

		let products;
		if (category && category !== 'All') {
			products = await prisma.items.findMany({
				where: { category: category as string },
				orderBy: { id: 'asc' },
			});
		} else {
			products = await prisma.items.findMany({
				orderBy: { id: 'asc' },
			});
		}
		res.status(200).json({ success: true, data: products });
	} catch (error) {
        console.log(error);
		res.status(200).json({ success: false });
	}
}