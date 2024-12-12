import prisma from 'db';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  success: boolean;
  data?: any;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { chartType, year, month, itemType } = req.body;

  if (!chartType || !year || !month || !itemType) {
    res.status(400).json({ success: false, data: 'Missing required fields' });
    return;
  }

  try {
    const newSetting = await prisma.ChartSetting.create({
      data: {
        charttype: chartType,
        year,
        month,
        itemtype: itemType,
      },
    });

    res.status(200).json({ success: true, data: newSetting });
  } catch (error) {
    console.error('Error saving chart settings:', error);
    res.status(500).json({ success: false, data: 'Failed to save chart settings' });
  }
}