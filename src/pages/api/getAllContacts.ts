import type { NextApiRequest, NextApiResponse } from 'next'
import { contactsSingleton } from '../../lib/contacts';
import { contactList } from '@/types/contactList';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<contactList>
) {
  const allContacts = contactsSingleton.getAll();
  res.status(200).send(allContacts);
}