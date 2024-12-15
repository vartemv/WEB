// Václav Zapletal xzaple40
import prisma from 'db';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  success: boolean;
  data?: any;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    const settings = await prisma.ChartSetting.findMany({
      orderBy: {
        createdat: 'desc',
      },
    });

    res.status(200).json({ success: true, data: settings });
  } catch (error) {
    console.error('Error fetching chart settings:', error);
    res.status(500).json({ success: false, data: 'Failed to fetch chart settings' });
  }
}