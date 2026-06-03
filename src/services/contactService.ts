import { contactsMock } from '../data/mockData';
import type { Contact } from '../types/Contact';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const contactService = {
  async getContacts(): Promise<Contact[]> {
    await wait(220);
    return contactsMock;
  },
};
