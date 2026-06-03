import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from '../../components/common/SearchBar/SearchBar';

describe('SearchBar', () => {
  it('updates value on user typing', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <SearchBar
        value=""
        onChange={onChange}
        label="Search institutions"
        placeholder="Type institution"
      />,
    );

    await user.type(screen.getByLabelText('Search institutions'), 'Mysuru');

    expect(onChange).toHaveBeenCalled();
  });
});
