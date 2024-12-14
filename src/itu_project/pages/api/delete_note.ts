import prisma from '../../lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ success: false, data: 'Method not allowed' });
  }

  const { noteId } = req.body;

  if (!noteId) {
    return res.status(400).json({ success: false, data: 'Missing note ID' });
  }

  try {
    await prisma.chartNote.delete({
      where: { id: noteId }
    });
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({ success: false, data: 'Failed to delete note' });
  }
}