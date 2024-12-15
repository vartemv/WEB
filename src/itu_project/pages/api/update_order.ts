import prisma from 'db';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    success : boolean;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    let { id, item, name, address, price, order_date, status } = req.body;

	if (!name || !item || !address || !price || !order_date || !status || !id) {
		res.status(200).json({ success: false });
		return;
	}

    price = parseFloat(price);

    await prisma.orders.update({
        where: {
          id: id,
        },
        data: {
          item: item,
          name: name,
          address: address,
          price: price,
          order_date: order_date,
          status: status
        },
      })

    res.status(200).json({ success: false });
}