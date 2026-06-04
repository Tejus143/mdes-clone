import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Dashboard from '../../pages/Dashboard/Dashboard';
import { institutionService } from '../../services/institutionService';
import { latestNewsService } from '../../services/latestNewsService';
import { officialMdesService } from '../../services/officialMdesService';

vi.mock('../../services/institutionService', () => ({
  institutionService: {
    getInstitutions: vi.fn(),
  },
}));

vi.mock('../../services/latestNewsService', () => ({
  latestNewsService: {
    getLatestNews: vi.fn(),
  },
}));

vi.mock('../../services/officialMdesService', () => ({
  officialMdesService: {
    getPrimaryBannerUrl: vi.fn(),
  },
}));

describe('Dashboard', () => {
  it('renders stats after loading institutions', async () => {
    vi.mocked(institutionService.getInstitutions).mockResolvedValue([
      {
        id: '1',
        name: 'A School',
        district: 'Mysuru',
        category: 'School',
        address: 'Address',
        phone: '123',
        email: 'a@b.com',
        website: 'a.com',
        principal: 'P',
        admissionContact: '123',
      },
    ]);
    vi.mocked(latestNewsService.getLatestNews).mockResolvedValue([]);
    vi.mocked(officialMdesService.getPrimaryBannerUrl).mockResolvedValue('banner.jpg');

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText('Institutions')).toBeInTheDocument();
      expect(screen.getAllByText('1').length).toBeGreaterThan(0);
    });
  });
});
