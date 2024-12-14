import prisma from '../../lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { chartId } = req.query;

  if (!chartId) {
    return res.status(400).json({ success: false, data: 'Chart ID is required' });
  }

  try {
    const notes = await prisma.chartNote.findMany({
      where: {
        chart_id: Number(chartId)
      },
      orderBy: {
        created_at: 'desc'
      }
    });

    res.status(200).json({ success: true, data: notes });
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ success: false, data: 'Failed to fetch notes' });
  }
}