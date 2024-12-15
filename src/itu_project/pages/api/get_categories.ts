import prisma from 'db';
import type { NextApiRequest, NextApiResponse } from 'next';
 
type Data = {
	success: boolean;
	data?: any;
};
 
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	try {
		const categories = await prisma.items.findMany(
			{
                select: {
                    category: true,
                },
                distinct: ['category'],
				orderBy: [
					{
						id: 'asc',
					}
				]
			}
		);

        const allCategories = categories.map((item) => item.category);
        const finalCategories = ['All', ...allCategories];
		res.status(200).json({ success: true, data: finalCategories });
	} catch (error) {
        console.log(error);
		res.status(200).json({ success: false });
	}
}