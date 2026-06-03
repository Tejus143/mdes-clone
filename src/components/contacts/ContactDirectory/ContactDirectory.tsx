import { Box } from '@mui/material';
import type { Contact } from '../../../types/Contact';
import type { Institution } from '../../../types/Institution';
import ContactCard from '../ContactCard/ContactCard';

type ContactDirectoryProps = {
  contacts: Contact[];
  institutions: Institution[];
};

const ContactDirectory = ({ contacts, institutions }: ContactDirectoryProps) => {
  const names = new Map(institutions.map((institution) => [institution.id, institution.name]));

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 2 }}>
      {contacts.map((contact) => (
        <ContactCard
          key={contact.id}
          contact={contact}
          institutionName={names.get(contact.institutionId) ?? 'Institution'}
        />
      ))}
    </Box>
  );
};

export default ContactDirectory;
