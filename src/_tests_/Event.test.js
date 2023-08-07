import { render } from '@testing-library/react';
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
    const eventTime = EventComponent.queryByText(event.created);
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

  /*test('event data is hidden by default', () => {
    const eventDetails = EventComponent.queryByText(event.description);
    expect(eventDetails).not.toBeInTheDocument();
  });*/

  test('description is shown when user clicks on show details button', async () => {
    const user = userEvent.setup();
    const detailsButton = EventComponent.getByText('Show details');
    const eventDetails = EventComponent.getByText(event.description);
    expect(eventDetails).not.toBeInTheDocument();
    await user.click(detailsButton);

    const eventDetails = EventComponent.getByText(event.description);
    expect(eventDetails).toBeInTheDocument();
  });

  /*test('description is shown when user clicks on show details button', async () => {
    const user = userEvent.setup();
    const detailsButton = EventComponent.queryByText('Hide details');
    const eventDetails = EventComponent.queryByText(event.description);

    await user.click(detailsButton);
    expect(eventDetails).not.toBeInTheDocument();
  });*/
});
