import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { getEvents } from '../api';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature'); //requires full path

defineFeature(feature, (test) => {
  test('When user hasn’t specified a number, 32 events are shown by default.', ({
    given,
    then,
  }) => {
    given('the user opens the event page', () => {});

    then('32 events are displayed', (arg0) => {});
  });
  test('User can change the number of events displayed.', ({
    given,
    when,
    then,
  }) => {
    given('the user opens the event page', () => {});

    when('the user selects a different number of events to display', () => {});

    then('the page displays the specified number of events', () => {});
  });
});
