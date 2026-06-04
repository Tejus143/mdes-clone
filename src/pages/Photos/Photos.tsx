import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { Card, CardContent, CardMedia, Chip, Grid, Stack, Typography } from '@mui/material';

const galleryStories = [
  { url: 'https://mdes.in/wp-content/uploads/2022/12/photo5.jpg', title: 'Learning beyond the classroom', category: 'Student Life', date: 'December 2022', description: 'Students build confidence, curiosity, and community through shared learning experiences.' },
  { url: 'https://mdes.in/wp-content/uploads/2022/12/gall4.jpg', title: 'Celebrating our community', category: 'Events', date: 'December 2022', description: 'An occasion that brought students, educators, families, and well-wishers together.' },
  { url: 'https://mdes.in/wp-content/uploads/2022/12/gall1.jpg', title: 'A culture of participation', category: 'Campus Life', date: 'December 2022', description: 'Every learner is encouraged to contribute, collaborate, and discover new strengths.' },
  { url: 'https://mdes.in/wp-content/uploads/2022/12/gall3.jpg', title: 'Growing through service', category: 'Outreach', date: 'December 2022', description: 'Value-based education comes alive through meaningful service to the wider community.' },
  { url: 'https://mdes.in/wp-content/uploads/2022/12/gall5.jpg', title: 'Moments of achievement', category: 'Achievements', date: 'December 2022', description: 'Recognising the effort, discipline, and talent of our students and educators.' },
  { url: 'https://mdes.in/wp-content/uploads/2022/12/photo6.jpg', title: 'Together at MDES', category: 'Community', date: 'December 2022', description: 'Shared experiences create lasting relationships across the MDES family.' },
];

const Photos = () => (
  <Stack spacing={3}>
    <Stack spacing={1} sx={{ maxWidth: 760 }}>
      <Typography color="secondary.main" fontWeight={800}>OUR STORIES</Typography>
      <Typography variant="h3">Life across the MDES community</Typography>
      <Typography color="text.secondary">More than a photo collection: these are moments of learning, service, celebration, and achievement.</Typography>
    </Stack>
    <Grid container spacing={2.5}>
      {galleryStories.map((story) => (
        <Grid key={story.url} size={{ xs: 12, sm: 6, md: 4 }}>
          <Card sx={{ height: '100%' }}>
            <CardMedia component="img" image={story.url} alt={story.title} height="230" />
            <CardContent>
              <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Chip size="small" label={story.category} color="secondary" variant="outlined" />
                <Stack direction="row" spacing={.5} alignItems="center" color="text.secondary">
                  <CalendarMonthOutlinedIcon sx={{ fontSize: 16 }} />
                  <Typography variant="caption">{story.date}</Typography>
                </Stack>
              </Stack>
              <Typography variant="h6">{story.title}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: .75 }}>{story.description}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Stack>
);

export default Photos;
