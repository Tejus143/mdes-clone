import { render, screen, waitFor } from '@testing-library/react';
import Dashboard from '../../pages/Dashboard/Dashboard';
import { institutionService } from '../../services/institutionService';

vi.mock('../../services/institutionService', () => ({
  institutionService: {
    getInstitutions: vi.fn(),
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

    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText('Total Institutions')).toBeInTheDocument();
      expect(screen.getAllByText('1').length).toBeGreaterThan(0);
    });
  });
});
