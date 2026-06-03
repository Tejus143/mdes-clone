import { Card, CardContent, Link, Stack, Typography } from '@mui/material';

const officialVideoLinks = [
  'https://mdes.in/videos',
  'https://www.youtube.com/@mdesmysore',
];

const Videos = () => (
  <Stack spacing={2.5}>
    <Typography variant="h4">Videos</Typography>
    <Typography color="text.secondary">Official MDES video sources</Typography>
    <Card>
      <CardContent>
        <Stack spacing={1}>
          {officialVideoLinks.map((url) => (
            <Link key={url} href={url} target="_blank" rel="noopener noreferrer">
              {url}
            </Link>
          ))}
        </Stack>
      </CardContent>
    </Card>
  </Stack>
);

export default Videos;
