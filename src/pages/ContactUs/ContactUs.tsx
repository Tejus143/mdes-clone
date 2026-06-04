import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import { Alert, Box, Button, Card, CardContent, Snackbar, Stack, TextField, Typography } from '@mui/material';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import ContactDirectory from '../../components/contacts/ContactDirectory/ContactDirectory';
import EmptyState from '../../components/common/EmptyState/EmptyState';
import Loader from '../../components/common/Loader/Loader';
import SearchBar from '../../components/common/SearchBar/SearchBar';
import { contactService } from '../../services/contactService';
import { institutionService } from '../../services/institutionService';
import type { Contact } from '../../types/Contact';
import type { Institution } from '../../types/Institution';
import { MDES_SITE_INFO } from '../../utils/constants';

const ContactUs = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const [contactsData, institutionsData] = await Promise.all([contactService.getContacts(), institutionService.getInstitutions()]);
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
    return query ? contacts.filter((contact) => `${contact.department} ${contact.person} ${contact.phone} ${contact.email}`.toLowerCase().includes(query)) : contacts;
  }, [contacts, search]);

  if (loading) return <Loader label="Loading contact directory..." />;
  if (error) return <Alert severity="error">{error}</Alert>;

  const quickContacts = [
    ['General enquiries', MDES_SITE_INFO.phone, <PhoneOutlinedIcon />],
    ['Write to MDES', MDES_SITE_INFO.email, <EmailOutlinedIcon />],
    ['Visit our office', MDES_SITE_INFO.location, <LocationOnOutlinedIcon />],
    ['Admissions support', 'Find the right institution', <SchoolOutlinedIcon />],
  ];

  return (
    <Stack spacing={4}>
      <Box sx={{ maxWidth: 760 }}>
        <Typography color="secondary.main" fontWeight={800}>CONTACT MDES</Typography>
        <Typography variant="h3">Let us connect you with the right team</Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>For admissions, institutional enquiries, partnerships, or general support, start here.</Typography>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }, gap: 2 }}>
        {quickContacts.map(([title, detail, icon]) => (
          <Card key={title as string}><CardContent><Box color="secondary.main">{icon}</Box><Typography variant="h6" sx={{ mt: 1 }}>{title}</Typography><Typography variant="body2" color="text.secondary">{detail}</Typography></CardContent></Card>
        ))}
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 3 }}>
        <Card sx={{ overflow: 'hidden', minHeight: 430 }}>
          <Box component="iframe" title="MDES office location map" src="https://www.google.com/maps?q=St.%20Joseph's%20Educational%20Complex%20Jayalakshmipuram%20Mysuru&output=embed" loading="lazy" sx={{ border: 0, width: '100%', height: 300, display: 'block' }} />
          <CardContent><Typography variant="h6">MDES Central Office</Typography><Typography color="text.secondary" sx={{ mt: .5 }}>{MDES_SITE_INFO.quickContactAddress}</Typography></CardContent>
        </Card>
        <Card>
          <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
            <Typography variant="h5">Send us a message</Typography>
            <Stack component="form" spacing={2} sx={{ mt: 2 }} onSubmit={(event: FormEvent<HTMLFormElement>) => { event.preventDefault(); event.currentTarget.reset(); setSubmitted(true); }}>
              <TextField required label="Your name" name="name" />
              <TextField required type="email" label="Email address" name="email" />
              <TextField required label="Phone number" name="phone" />
              <TextField required multiline minRows={4} label="How can we help?" name="message" />
              <Button type="submit" variant="contained" color="secondary">Send message</Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>

      <Box>
        <Typography variant="h4">Department directory</Typography>
        <Typography color="text.secondary" sx={{ mt: .5, mb: 2 }}>Search for a department, institution office, or admissions contact.</Typography>
        <SearchBar value={search} onChange={setSearch} label="Search contacts" placeholder="Search department, person, phone, or email" />
        <Box sx={{ mt: 2 }}>{filtered.length ? <ContactDirectory contacts={filtered} institutions={institutions} /> : <EmptyState title="No contacts found" />}</Box>
      </Box>
      <Snackbar open={submitted} autoHideDuration={5000} onClose={() => setSubmitted(false)} message="Thank you. Your message has been recorded." />
    </Stack>
  );
};

export default ContactUs;
