import prisma from 'db';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    success : boolean;
    updatedQuantity?: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { item_id, change } = req.body;

    if (typeof item_id !== 'number' || typeof change !== 'boolean') {
        return res.status(400).json({ success: false });
    }

    const item = await prisma.items.findUnique({
        where: { id: item_id },
    });

    if (!item) {
        return res.status(404).json({ success: false });
    }

    let newQuantity = item.quantity + (change ? 1 : -1);
    if (newQuantity < 0) {
        newQuantity = 0;
    }

    await prisma.items.update({
        where: { id: item_id },
        data: { quantity: newQuantity },
    });

    res.status(200).json({ success: true, updatedQuantity: newQuantity });
}