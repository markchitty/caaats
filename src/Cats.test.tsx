import { render, screen, waitFor } from '@testing-library/react';
import Cats from './Cats';

const fetchMock = vi.spyOn(globalThis, 'fetch');
const consoleMock = vi.spyOn(globalThis.console, 'log').mockImplementation(() => undefined);

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
    const mockData = [{ id: 1, url: "Whiskers" }, { id: 2, url: "Mittens" }];
    fetchMock.mockResolvedValue({ json: async () => mockData } as Response);

    render(<Cats />);
    await screen.findByTestId('cat-box');
    expect(screen.getByTestId('cat-box').children.length).toBe(mockData.length);
  });

  it("handles fetch failure", async () => {
    fetchMock.mockRejectedValueOnce(new Error("API fetch failed"));

    render(<Cats />);
    await waitFor(() => expect(consoleMock).toHaveBeenCalledOnce());
  });
});
