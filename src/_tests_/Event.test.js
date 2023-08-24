import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Event from '../components/Event';
import mockData from '../mock-data';

describe('<Event /> component', () => {
  let EventComponent;
  const event = mockData[0];

  beforeEach(() => {
    EventComponent = render(<Event event={event} />);
  });

  test('event name is visible', async () => {
    const eventName = EventComponent.queryByText(event.summary);
    expect(eventName).toBeInTheDocument();
  });

  test('event time is visible', async () => {
    const formattedTime = new Date(event.created).toLocaleString('en-GB', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    const eventTime = await screen.findByText(formattedTime);
    expect(eventTime).toBeInTheDocument();
  });

  test('event location is visible', async () => {
    const eventLocation = EventComponent.queryByText(event.location);
    expect(eventLocation).toBeInTheDocument();
  });

  test('show/hide details button is present', () => {
    const detailsButton = EventComponent.queryByRole('button');
    expect(detailsButton).toBeInTheDocument();
  });

  test('description is toggled when user clicks on button', async () => {
    const user = userEvent.setup();
    const detailsButton = EventComponent.getByText('Show details');
    const eventDetails = EventComponent.queryByText(event.description);

    expect(eventDetails).not.toBeInTheDocument();
    await user.click(detailsButton);
    const hideDetails = EventComponent.queryByText('Hide details');

    expect(hideDetails).toBeInTheDocument();
  });
});
