import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { getEvents } from '../api';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature'); //requires full path

defineFeature(feature, (test) => {
  test('An event element is collapsed by default.', ({ given, when, then }) => {
    let AppComponent;
    given('user has opened the app', async () => {
      AppComponent = render(<App />);
    });
    let AppDOM;
    let EventListDOM;
    when('the event list is present', async () => {
      AppDOM = AppComponent.container.firstChild;
      EventListDOM = AppDOM.querySelector('#event-list');

      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBe(32);
      });
    });
    then('the event details are collapsed by default', async () => {
      await waitFor(() => {
        const EventComponent = render(<Event event={event} />);
        const eventDetails = EventComponent.queryByText(event.description);

        expect(eventDetails).not.toBeInTheDocument();
      });
    });
  });
  test('User can expand an event to see details.', ({ given, when, then }) => {
    let AppComponent;
    let AppDOM;
    let EventListDOM;
    given('user has opened the app', async () => {
      AppComponent = render(<App />);
      AppDOM = AppComponent.container.firstChild;
      EventListDOM = AppDOM.querySelector('#event-list');

      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBe(32);
      });
    });

    when('the user clicks on the "Show details" button of an event', () => {});

    then('the event details are visible', () => {});
  });
  test('User can collapse an event to hide details.', ({
    given,
    when,
    then,
  }) => {
    given('an event is expanded with visible details', () => {});

    when('the user clicks on the "Hide details" button of the event', () => {});

    then('the event details are hidden', () => {});
  });
});
