import { revalidatePath } from 'next/cache';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const path = req.query.path as string;

  if (path) {
    revalidatePath(path);
    return res.json({ revalidated: true, now: Date.now() });
  }

  return res.json({
    revalidated: false,
    now: Date.now(),
    message: 'Missing path to revalidate',
  });
}
