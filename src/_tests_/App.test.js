import {
  render,
  within,
  waitFor,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getEvents } from '../api';
import App from '../App';

describe('<App /> component', () => {
  let AppDOM;
  let loadedElement;
  beforeEach(async () => {
    //AppDOM = render(<App />).container.firstChild;
    /*render(<App />);
    await screen.findByTestId('content-loaded');*/
    render(<App />);
    //await screen.getByTestId('content-loaded');
    waitForElementToBeRemoved(document.querySelector('.skeleton'));
    await waitFor(() => {
      loadedElement = screen.getByTestId('content-loaded');
    });
  });
  test('renders list of events', () => {
    expect(loadedElement).toBeInTheDocument();
    //expect(screen.getByTestId('event-list')).toBeInTheDocument();
  });
  test('render CitySearch', () => {
    expect(AppDOM.querySelector('#city-search')).toBeInTheDocument();
  });

  test('render number of events', () => {
    expect(AppDOM.querySelector('#number-of-events')).toBeInTheDocument();
  });
});

describe('<App /> integration', () => {
  test('renders a list of events matching the city the user selected', async () => {
    const user = userEvent.setup();
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    const CitySearchDOM = AppDOM.querySelector('#city-search');
    const CitySearchInput = within(CitySearchDOM).queryByRole('textbox');

    await user.type(CitySearchInput, 'Berlin');
    const berlinSuggestionItem =
      within(CitySearchDOM).queryByText('Berlin, Germany');
    await user.click(berlinSuggestionItem);

    const EventListDOM = AppDOM.querySelector('#event-list'); //needs to be done after suggestion list is clicked because EL is expected to be affected after that happens
    const allRenderedEventItems =
      within(EventListDOM).queryAllByRole('listitem');

    const allEvents = await getEvents();
    const berlinEvents = allEvents.filter(
      (event) => event.location === 'Berlin, Germany'
    );

    expect(allRenderedEventItems.length).toBe(berlinEvents.length);
    allRenderedEventItems.forEach((event) => {
      //extra insurance that the relevant events are in the list
      expect(event.textContent).toContain('Berlin, Germany');
    });
  });
});
