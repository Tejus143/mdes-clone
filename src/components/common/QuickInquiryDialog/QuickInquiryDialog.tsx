import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, TextField, Typography } from '@mui/material';
import { useMemo, useState, type ChangeEvent, type FormEvent } from 'react';

type QuickInquiryDialogProps = {
  open: boolean;
  onClose: () => void;
};

const initialFormState = {
  name: '',
  email: '',
  phone: '',
  message: '',
};

const QuickInquiryDialog = ({ open, onClose }: QuickInquiryDialogProps) => {
  const [formState, setFormState] = useState(initialFormState);
  const [submitted, setSubmitted] = useState(false);

  const hasFilledAnyField = useMemo(
    () => Object.values(formState).some((value) => value.trim().length > 0),
    [formState],
  );

  const handleChange = (field: keyof typeof initialFormState) => (event: ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    setFormState(initialFormState);
  };

  const handleClose = () => {
    setSubmitted(false);
    setFormState(initialFormState);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth aria-labelledby="quick-inquiry-title">
      <DialogTitle id="quick-inquiry-title" sx={{ px: 3, py: 2.5 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
          <Typography variant="h6">Quick Inquiry</Typography>
          <IconButton onClick={handleClose} aria-label="Close inquiry dialog">
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent dividers sx={{ px: 3, py: 2 }}>
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          Reach out to our admissions team for fast support, course guidance, and application help.
        </Typography>
        {submitted ? (
          <Box sx={{ py: 4, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Inquiry received
            </Typography>
            <Typography color="text.secondary">Thank you! Our team will contact you shortly.</Typography>
          </Box>
        ) : (
          <Box component="form" id="quick-inquiry-form" noValidate onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                label="Full Name"
                value={formState.name}
                onChange={handleChange('name')}
                required
                fullWidth
                size="small"
                autoComplete="name"
              />
              <TextField
                label="Email Address"
                type="email"
                value={formState.email}
                onChange={handleChange('email')}
                required
                fullWidth
                size="small"
                autoComplete="email"
              />
              <TextField
                label="Phone Number"
                type="tel"
                value={formState.phone}
                onChange={handleChange('phone')}
                required
                fullWidth
                size="small"
                autoComplete="tel"
              />
              <TextField
                label="Message / Program of Interest"
                value={formState.message}
                onChange={handleChange('message')}
                fullWidth
                multiline
                minRows={3}
                size="small"
              />
            </Stack>
          </Box>
        )}
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={handleClose} color="inherit">
          Close
        </Button>
        {!submitted && (
          <Button type="submit" form="quick-inquiry-form" onClick={handleSubmit} disabled={!hasFilledAnyField} variant="contained">
            Send Inquiry
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default QuickInquiryDialog;
