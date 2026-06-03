import { Alert, Stack, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import ContactDirectory from '../../components/contacts/ContactDirectory/ContactDirectory';
import DataTable from '../../components/common/DataTable/DataTable';
import EmptyState from '../../components/common/EmptyState/EmptyState';
import Loader from '../../components/common/Loader/Loader';
import SearchBar from '../../components/common/SearchBar/SearchBar';
import { contactService } from '../../services/contactService';
import { institutionService } from '../../services/institutionService';
import type { Contact } from '../../types/Contact';
import type { Institution } from '../../types/Institution';

const ContactUs = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [contactsData, institutionsData] = await Promise.all([
          contactService.getContacts(),
          institutionService.getInstitutions(),
        ]);
        setContacts(contactsData);
        setInstitutions(institutionsData);
      } catch {
        setError('Unable to load contact directory.');
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  const filtered = useMemo(() => {
    const query = search.toLowerCase();
    if (!query) return contacts;
    return contacts.filter((contact) =>
      `${contact.department} ${contact.person} ${contact.phone} ${contact.email}`
        .toLowerCase()
        .includes(query),
    );
  }, [contacts, search]);

  const rows = filtered.slice(0, 8).map((contact) => ({
    department: contact.department,
    person: contact.person,
    phone: contact.phone,
    email: contact.email,
  }));

  if (loading) return <Loader label="Loading contact directory..." />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Stack spacing={2.5}>
      <Typography variant="h4">Contact Directory</Typography>
      <SearchBar
        value={search}
        onChange={setSearch}
        label="Search contacts"
        placeholder="Search by department, person, phone, email"
      />

      {filtered.length ? (
        <>
          <ContactDirectory contacts={filtered} institutions={institutions} />
          <Typography variant="h6" sx={{ mt: 1 }}>
            Administrative Quick Table
          </Typography>
          <DataTable
            columns={[
              { key: 'department', label: 'Department' },
              { key: 'person', label: 'Person' },
              { key: 'phone', label: 'Phone' },
              { key: 'email', label: 'Email' },
            ]}
            rows={rows}
          />
        </>
      ) : (
        <EmptyState title="No contacts found" />
      )}
    </Stack>
  );
};

export default ContactUs;
