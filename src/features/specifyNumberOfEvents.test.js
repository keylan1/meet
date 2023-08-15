import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature'); //requires full path

defineFeature(feature, (test) => {
  test('When user hasn’t specified a number, 32 events are shown by default.', ({
    given,
    then,
  }) => {
    let AppDOM;
    let AppComponent;
    given('the user opens the app', () => {
      AppComponent = render(<App />);
      AppDOM = AppComponent.container.firstChild;
    });

    then('32 events are displayed', async () => {
      AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector('#event-list');

      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBe(32);
      });
    });
  });
  test('User can change the number of events displayed.', ({
    given,
    when,
    then,
  }) => {
    let AppDOM;
    given('the user opens the app', () => {
      const AppComponent = render(<App />);
      AppDOM = AppComponent.container.firstChild;
    });

    when(
      'the user selects a different number of events to display',
      async () => {
        const user = userEvent.setup();

        const NumberOfEventsDOM = AppDOM.querySelector('#number-of-events');
        const numberTextBox = within(NumberOfEventsDOM).queryByRole('textbox');

        await user.type(numberTextBox, '{backspace}{backspace}10');
      }
    );

    then('the page displays the specified number of events', async () => {
      const EventListDOM = AppDOM.querySelector('#event-list');
      const eventListItems = within(EventListDOM).queryAllByRole('listitem');

      expect(eventListItems.length).toBe(10);
    });
  });
});
