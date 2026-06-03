import { Card, CardContent, Stack, Typography } from '@mui/material';
import type { Contact } from '../../../types/Contact';

type ContactCardProps = {
  institutionName: string;
  contact: Contact;
};

const ContactCard = ({ institutionName, contact }: ContactCardProps) => (
  <Card>
    <CardContent>
      <Typography variant="h6">{institutionName}</Typography>
      <Typography color="secondary.main">{contact.department}</Typography>
      <Stack spacing={0.4} sx={{ mt: 1 }}>
        <Typography variant="body2">Person: {contact.person}</Typography>
        <Typography variant="body2">Phone: {contact.phone}</Typography>
        <Typography variant="body2">Email: {contact.email}</Typography>
      </Stack>
    </CardContent>
  </Card>
);

export default ContactCard;
