import { render, within, screen, waitFor } from '@testing-library/react';
import EventList from '../components/EventList';
import { getEvents } from '../api';
import App from '../App';

describe('<EventList /> component', () => {
  let EventListComponent;
  beforeEach(() => {
    EventListComponent = render(<EventList />);
  });
  test('has an element with "list" role', () => {
    expect(EventListComponent.queryByRole('list')).toBeInTheDocument();
  });
  test('renders correct number of events', async () => {
    const allEvents = await getEvents();
    EventListComponent.rerender(<EventList events={allEvents} />);
    expect(EventListComponent.getAllByRole('listitem')).toHaveLength(
      allEvents.length
    );
  });
});

describe('<EventList /> integration', () => {
  test('renders a list of 32 events when the app is mounted', async () => {
    render(<App />);

    const EventListDOM = await screen.findByTestId('event-list');

    const EventListItems = within(EventListDOM).queryAllByRole('listitem');
    expect(EventListItems.length).toBe(32);
    /*const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild; //refers to the div with className App
    const EventListDOM = AppDOM.queryByTestId('event-list');

    await waitFor(() => {
      //queries elements that aren't rendered immediately
      const EventListItems = within(EventListDOM).queryAllByRole('listitem');
      expect(EventListItems.length).toBe(32);
    });*/
  });
});
