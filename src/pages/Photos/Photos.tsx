import { Card, CardMedia, Grid, Stack, Typography } from '@mui/material';

const photoUrls = [
  'https://mdes.in/wp-content/uploads/2022/12/photo5.jpg',
  'https://mdes.in/wp-content/uploads/2022/12/gall4.jpg',
  'https://mdes.in/wp-content/uploads/2022/12/gall1.jpg',
  'https://mdes.in/wp-content/uploads/2022/12/gall3.jpg',
  'https://mdes.in/wp-content/uploads/2022/12/gall5.jpg',
  'https://mdes.in/wp-content/uploads/2022/12/photo6.jpg',
];

const Photos = () => (
  <Stack spacing={2.5}>
    <Typography variant="h4">Photo Gallery</Typography>
    <Typography color="text.secondary">Our Moments</Typography>
    <Grid container spacing={2}>
      {photoUrls.map((url) => (
        <Grid key={url} size={{ xs: 12, sm: 6, md: 4 }}>
          <Card>
            <CardMedia component="img" image={url} alt="MDES gallery" height="220" />
          </Card>
        </Grid>
      ))}
    </Grid>
  </Stack>
);

export default Photos;
