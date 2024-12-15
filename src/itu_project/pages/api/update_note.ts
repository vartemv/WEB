// Václav Zapletal xzaple40
import prisma from '../../lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, data: 'Method not allowed' });
  }

  const { noteId, note } = req.body;

  if (!noteId || !note) {
    return res.status(400).json({ success: false, data: 'Missing required fields' });
  }

  try {
    const updatedNote = await prisma.chartNote.update({
      where: { id: noteId },
      data: { note }
    });
    res.status(200).json({ success: true, data: updatedNote });
  } catch (error) {
    console.error('Error updating note:', error);
    res.status(500).json({ success: false, data: 'Failed to update note' });
  }
}