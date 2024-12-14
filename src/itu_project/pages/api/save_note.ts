import prisma from '../../lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, data: 'Method not allowed' });
  }

  const { chartId, note } = req.body;

  if (!chartId || !note) {
    return res.status(400).json({ success: false, data: 'Missing required fields' });
  }

  try {
    const savedNote = await prisma.chartNote.create({
      data: {
        chart_id: chartId,
        note: note,
      }
    });
    res.status(200).json({ success: true, data: savedNote });
  } catch (error) {
    console.error('Error saving note:', error);
    res.status(500).json({ success: false, data: 'Failed to save note' });
  }
}