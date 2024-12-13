import prisma from 'db';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  success: boolean;
  data?: any;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ success: false, data: 'Method not allowed' });
  }

  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ success: false, data: 'Missing chart ID' });
  }

  try {
    await prisma.ChartSetting.delete({
      where: {
        id: id,
      },
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error deleting chart setting:', error);
    res.status(500).json({ success: false, data: 'Failed to delete chart setting' });
  }
}