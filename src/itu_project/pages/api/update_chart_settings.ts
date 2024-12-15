// Václav Zapletal xzaple40
import prisma from 'db';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  success: boolean;
  data?: any;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ success: false, data: 'Method not allowed' });
  }

  const { id, chartType, year, month, itemType } = req.body;

  if (!id || !chartType || !year || !month || !itemType) {
    return res.status(400).json({ success: false, data: 'Missing required fields' });
  }

  try {
    const updatedSetting = await prisma.ChartSetting.update({
      where: { id },
      data: {
        charttype: chartType,
        year,
        month,
        itemtype: itemType,
      },
    });

    res.status(200).json({ success: true, data: updatedSetting });
  } catch (error) {
    console.error('Error updating chart settings:', error);
    res.status(500).json({ success: false, data: 'Failed to update chart settings' });
  }
}