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
  let AppComponent;
  let skeleton;
  beforeEach(() => {
    AppComponent = render(<App />);
    //skeleton = AppComponent.queryAllByText('skeleton');

    //AppDOM = render(<App />).container.firstChild;
    /*render(<App />);
    await screen.findByTestId('content-loaded');*/
    //render(<App />);
    //await screen.getByTestId('content-loaded');
    /*waitForElementToBeRemoved(document.querySelector('.MuiSkeleton-root'));
    await waitFor(() => {
      loadedElement = screen.getByTestId('content-loaded');
    });*/
  });
  test('renders list of events', async () => {
    //const eventList = skeleton.querySelector('event-list');
    //expect(eventList).toBeInTheDocument();
    //const eventList = await AppComponent.find('#event-list');
    // expect(eventList).toBeInTheDocument();
    //expect(loadedElement).toBeInTheDocument();
    //expect(screen.getByTestId('event-list')).toBeInTheDocument();
    await waitFor(
      () => {
        const eventList = screen.queryByTestId('event-list');
        if (eventList) {
          expect(eventList).toBeInTheDocument();
        }
      },
      { timeout: 5000 }
    );
  });
  test('render CitySearch', async () => {
    await waitFor(
      () => {
        const citySearch = screen.queryByTestId('city-search');
        if (citySearch) {
          expect(citySearch).toBeInTheDocument();
        }
      },
      { timeout: 5000 }
    );
    //expect(AppDOM.querySelector('#city-search')).toBeInTheDocument();
  });

  test('render number of events', async () => {
    await waitFor(
      () => {
        const numberOfEvents = screen.queryByTestId('number-of-events');
        if (numberOfEvents) {
          expect(numberOfEvents).toBeInTheDocument();
        }
      },
      { timeout: 5000 }
    );
    //expect(AppDOM.querySelector('#number-of-events')).toBeInTheDocument();
  });
});

describe('<App /> integration', () => {
  test('renders a list of events matching the city the user selected', async () => {
    const user = userEvent.setup();
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    await waitFor(
      () => {
        const loaded = screen.queryAllByTestId('content-loaded');
        loaded.forEach((element) => {
          expect(element).toBeInTheDocument();
        });
        //expect(screen.getByTestId('content-loaded')).toBeInTheDocument();
      },
      { timeout: 5000 } // Adjust the timeout value as needed
    );
    //await screen.findAllByTestId('content-loaded', {}, { timeout: 5000 });
    await waitForElementToBeRemoved(() => screen.queryAllByTestId('skeleton'));

    const heroSectionDOM = AppDOM.querySelector('.hero-section');
    const CitySearchDOM = heroSectionDOM.getByTestId('city-search');

    const CitySearchInput = screen.getByLabelText('Search events by city');
    await user.type(CitySearchInput, 'Berlin');

    //const CitySearchDOM = screen.getByTestId('city-search');
    /*const berlinSuggestionItem =
      within(CitySearchDOM).getByText('Berlin, Germany');*/

    /*const suggestionList = within(CitySearchDOM).get('.suggestions'); // Use a descendant selector here
    const berlinSuggestionItem =
      within(suggestionList).getByText('Berlin, Germany');*/
    const suggestionList = screen.getByTestID('city-suggestions');
    const berlinSuggestionItem =
      within(suggestionList).getByText('Berlin, Germany');

    await user.click(berlinSuggestionItem);

    /*const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    const CitySearchDOM = AppDOM.querySelector('#city-search');
    const CitySearchInput = within(CitySearchDOM).queryByRole('textbox');*/

    /*await user.type(CitySearchInput, 'Berlin');
    const berlinSuggestionItem =
      within(CitySearchDOM).queryByText('Berlin, Germany');
    await user.click(berlinSuggestionItem);*/

    /*await waitFor(() => {
      const EventListDOM = screen.getByTestId('event-list');
      const allRenderedEventItems =
        within(EventListDOM).queryAllByRole('listitem');
      const allEvents = getEvents(); // Assuming getEvents returns a Promise

      // Continue with your assertions...
      const berlinEvents = allEvents.filter(
        (event) => event.location === 'Berlin, Germany'
      );

      expect(allRenderedEventItems.length).toBe(berlinEvents.length);
      allRenderedEventItems.forEach(
        (event) => {
          //extra insurance that the relevant events are in the list
          expect(event.textContent).toContain('Berlin, Germany');
        } // Adjust the timeout value as needed
      );
      });*/

    const EventListDOM = screen.getByTestId('event-list'); //needs to be done after suggestion list is clicked because EL is expected to be affected after that happens
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
