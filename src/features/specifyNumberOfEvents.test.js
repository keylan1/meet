import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { getEvents } from '../api';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature'); //requires full path

defineFeature(feature, (test) => {
  test('An event element is collapsed by default.', ({ given, then }) => {
    given('the user opens the event page', () => {});

    then('the event element is collapsed by default', () => {});
  });
  test('User can expand an event to see details.', ({ given, when, then }) => {
    given('the user opens the event page', () => {});

    when(/^the user clicks on the "(.*)" button of an event$/, (arg0) => {});

    then('the event details are visible', () => {});
  });
  test('User can collapse an event to hide details.', ({
    given,
    and,
    when,
    then,
  }) => {
    given('the user opens the event page', () => {});

    and('an event is expanded with visible details', () => {});

    when(/^the user clicks on the "(.*)" button of the event$/, (arg0) => {});

    then('the event details are hidden', () => {});
  });
});
