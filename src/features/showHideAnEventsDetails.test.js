import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Event from '../components/Event';
import App from '../App';
import { getEvents } from '../api';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature'); //requires full path

defineFeature(feature, (test) => {
  test('An event element is collapsed by default.', ({ given, and, then }) => {
    let EventComponent;
    given('a list of events is displayed', async () => {
      let AppComponent = render(<App />);
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector('#event-list');

      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBe(32);
      });
    });
    and('the details button is present on an event', () => {});
    then('the event element is collapsed by default', () => {});
  });
  test('User can expand an event to see details.', ({ given, when, then }) => {
    given('a list of events is displayed', () => {});

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
