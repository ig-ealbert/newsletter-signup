import type { NextApiRequest, NextApiResponse } from 'next'
import { contactsSingleton } from '../../lib/contacts';
import { contact } from '@/types/contact';
import { contactInfo } from '@/types/contactInfo';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<contact>
) {
  const info: contactInfo = JSON.parse(req.body);
  const result = contactsSingleton.createOrUpdate(info);
  res.status(200).send(result);
}
