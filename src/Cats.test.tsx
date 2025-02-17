import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Cats from './Cats';

const fetchMock = vi.spyOn(globalThis, 'fetch');
const consoleMock = vi.spyOn(console, 'log').mockImplementation(() => undefined);
const mockData = [{ id: 'A', url: "http://Whiskers" }, { id: 'B', url: "http://Mittens" }];

describe('Cats component', () => {

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('renders in loading state', () => {
    render(<Cats />);
    const loadingNode = screen.getByText(/loading/i);
    expect(loadingNode).toBeInTheDocument();
  });

  it('fetches and displays cats on success', async () => {
    fetchMock.mockResolvedValue({ json: async () => mockData } as Response);
    render(<Cats />);
    await waitFor(() => expect(screen.getByTestId('cat-box').children.length).toBe(mockData.length));
  });

  it('removes a cat when delete button is clicked', async () => {
    fetchMock.mockResolvedValue({ json: async () => mockData } as Response);
    render(<Cats />);
    await waitFor(() => expect(screen.getByAltText(/Cat A/i)).toBeInTheDocument());

    const delButton = screen.getByTestId(/delete_A/i);
    fireEvent.click(delButton);
    await waitFor(() => expect(screen.queryByAltText(/Cat A/i)).not.toBeInTheDocument());
  });

  it('handles fetch failure', async () => {
    fetchMock.mockRejectedValueOnce(new Error('API fetch failed'));
    render(<Cats />);
    await waitFor(() => expect(consoleMock).toHaveBeenCalledOnce());
  });
});
