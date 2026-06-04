import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import VolunteerActivismOutlinedIcon from '@mui/icons-material/VolunteerActivismOutlined';
import { Box, Card, CardContent, Stack, Typography } from '@mui/material';

const milestones = [
  ['Our foundation', 'A shared commitment to make quality, value-based education accessible to every learner.'],
  ['Growing our reach', 'Schools and colleges expanded across districts while remaining rooted in their communities.'],
  ['Education with purpose', 'Academic excellence grew alongside character, compassion, leadership, and service.'],
  ['The journey ahead', 'MDES continues to equip young people for a changing world without losing sight of enduring values.'],
];

const principles = [
  ['Excellence', 'Enable every learner to discover their ability and pursue meaningful achievement.', <SchoolOutlinedIcon />],
  ['Dignity', 'Respect, care for, and support every student as a person and future leader.', <GroupsOutlinedIcon />],
  ['Service', 'Serve all communities, with special attention to rural and underprivileged learners.', <VolunteerActivismOutlinedIcon />],
  ['Values', 'Build education on commitment, transparency, accountability, and compassion.', <AutoStoriesOutlinedIcon />],
];

const About = () => (
  <Stack spacing={5}>
    <Box sx={{ textAlign: 'center', maxWidth: 850, mx: 'auto' }}>
      <Typography color="secondary.main" fontWeight={800}>WHO WE ARE</Typography>
      <Typography variant="h3">Inspiring excellence through value-based quality education</Typography>
      <Typography color="text.secondary" sx={{ mt: 1.5, fontSize: '1.08rem' }}>
        MDES empowers learners to become capable, compassionate, and responsible people who contribute to a sustainable and healthy nation.
      </Typography>
    </Box>

    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 2.5 }}>
      <Card sx={{ bgcolor: '#071f3d', color: 'common.white' }}>
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          <Typography color="secondary.light" fontWeight={800}>OUR VISION</Typography>
          <Typography variant="h5" sx={{ mt: 1 }}>An enlightened, sustainable, and healthy nation shaped through education and empowerment.</Typography>
        </CardContent>
      </Card>
      <Card>
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          <Typography color="secondary.main" fontWeight={800}>OUR MISSION</Typography>
          <Typography variant="h5" sx={{ mt: 1 }}>To provide inclusive quality education that inspires excellence, nurtures values, and serves society.</Typography>
        </CardContent>
      </Card>
    </Box>

    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>What guides us</Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }, gap: 2 }}>
        {principles.map(([title, description, icon]) => (
          <Card key={title as string}>
            <CardContent>
              <Box sx={{ color: 'secondary.main', mb: 1 }}>{icon}</Box>
              <Typography variant="h6">{title}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: .75 }}>{description}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>

    <Box>
      <Typography color="secondary.main" fontWeight={800}>OUR JOURNEY</Typography>
      <Typography variant="h4" sx={{ mb: 2 }}>A legacy that keeps moving forward</Typography>
      <Stack spacing={0}>
        {milestones.map(([title, description], index) => (
          <Box key={title} sx={{ display: 'grid', gridTemplateColumns: '48px 1fr', gap: 2 }}>
            <Stack alignItems="center">
              <Box sx={{ width: 20, height: 20, borderRadius: '50%', bgcolor: 'secondary.main', border: '4px solid', borderColor: 'background.paper' }} />
              {index < milestones.length - 1 ? <Box sx={{ width: 2, flex: 1, minHeight: 70, bgcolor: 'divider' }} /> : null}
            </Stack>
            <Box sx={{ pb: 3 }}>
              <Typography variant="h6">{title}</Typography>
              <Typography color="text.secondary">{description}</Typography>
            </Box>
          </Box>
        ))}
      </Stack>
    </Box>
  </Stack>
);

export default About;
