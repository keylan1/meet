import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature'); //requires full path

defineFeature(feature, (test) => {
  test('An event element is collapsed by default.', ({ given, when, then }) => {
    let AppComponent;
    given('user has opened the app', () => {
      AppComponent = render(<App />);
    });
    let AppDOM;
    let EventListDOM;
    let EventListItems;
    when('the event list is present', async () => {
      EventListDOM = await screen.findByTestId('event-list');

      await waitFor(() => {
        EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBe(32);
      });

      /*AppDOM = AppComponent.container.firstChild;
      EventListDOM = AppDOM.querySelector('#event-list');

      await waitFor(() => {
        EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBe(32);
      });*/
    });
    then('the event details are collapsed by default', () => {
      const eventDetails = within(EventListItems[0]).queryByText(
        '.description'
      );
      expect(eventDetails).not.toBeInTheDocument();
    });
  });
  test('User can expand an event to see details.', ({ given, when, then }) => {
    let AppComponent;
    let AppDOM;
    let EventListDOM;
    let EventListItems;
    given('user has opened the app', () => {
      AppComponent = render(<App />);
    });

    when(
      'the user clicks on the "Show details" button of an event',
      async () => {
        let user = userEvent.setup();
        let detailsBtn;
        AppDOM = AppComponent.container.firstChild;
        EventListDOM = await screen.findByTestId('event-list');

        await waitFor(() => {
          EventListItems = within(EventListDOM).queryAllByRole('listitem');
          detailsBtn = within(EventListItems[0]).queryByText('Show details');
        });
        await user.click(detailsBtn);
      }
    );

    then('the event details are visible', async () => {
      const EventDOM = AppComponent.container.firstChild;
      const eventDetails = EventDOM.querySelector('.description');
      expect(eventDetails).toBeInTheDocument();
    });
  });
  test('User can collapse an event to hide details.', ({
    given,
    when,
    then,
  }) => {
    let user;
    let EventDOM;
    let eventDetails;
    given('an event is expanded with visible details', async () => {
      user = userEvent.setup();
      const AppComponent = render(<App />);
      let detailsBtn;
      const AppDOM = AppComponent.container.firstChild;
      let EventListDOM = await screen.findByTestId('event-list');

      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        detailsBtn = within(EventListItems[0]).queryByText('Show details');
      });
      await user.click(detailsBtn);

      EventDOM = AppComponent.container.firstChild;
      eventDetails = EventDOM.querySelector('.description');
      expect(eventDetails).toBeInTheDocument();

      /*user = userEvent.setup();
      const AppComponent = render(<App />);
      let detailsBtn;
      const AppDOM = AppComponent.container.firstChild;
      let EventListDOM = AppDOM.querySelector('#event-list');

      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        detailsBtn = within(EventListItems[0]).queryByText('Show details');
      });
      await user.click(detailsBtn);

      EventDOM = AppComponent.container.firstChild;
      eventDetails = EventDOM.querySelector('.description');
      expect(eventDetails).toBeInTheDocument();*/
    });

    when(
      'the user clicks on the "Hide details" button of the event',
      async () => {
        userEvent.setup();
        const hideDetailsBtn = within(EventDOM).queryByText('Hide details');
        await user.click(hideDetailsBtn);
      }
    );

    then('the event details are hidden', () => {
      const AppComponent = render(<App />);
      EventDOM = AppComponent.container.firstChild;
      const eventDetails = EventDOM.querySelector('.description');
      expect(eventDetails).not.toBeInTheDocument();
    });
  });
});
