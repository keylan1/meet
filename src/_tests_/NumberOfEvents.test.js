import { render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';
import App from '../App';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsComponent;
  beforeEach(() => {
    NumberOfEventsComponent = render(
      <NumberOfEvents setCurrentNOE={() => {}} setErrorAlert={() => {}} />
    );
  });

  test('renders textbox', () => {
    const numberTextBox = NumberOfEventsComponent.queryByRole('textbox');
    expect(numberTextBox).toBeInTheDocument();
    expect(numberTextBox).toHaveClass('number');
  });

  test('default value of input field is 32', () => {
    const numberTextBox = NumberOfEventsComponent.queryByRole('textbox');
    expect(numberTextBox).toBeInTheDocument();
    expect(Number(numberTextBox.value)).toBe(32);
  });

  test('value of textbox changes when user types', async () => {
    const user = userEvent.setup();
    const numberTextBox = NumberOfEventsComponent.queryByRole('textbox');
    await user.type(numberTextBox, '{backspace}{backspace}10');

    expect(numberTextBox.value).toBe('10');
  });
});

describe('<NumberOfEvents integration', () => {
  test('user can change # of evenst displayed', async () => {
    const user = userEvent.setup();
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    const NumberOfEventsDOM = AppDOM.querySelector('#number-of-events');
    const numberTextBox = within(NumberOfEventsDOM).queryByRole('textbox');

    await user.type(numberTextBox, '{backspace}{backspace}10');

    const EventListDOM = AppDOM.querySelector('#event-list');
    const eventListItems = within(EventListDOM).queryAllByRole('listitem');

    expect(eventListItems.length).toBe(10);
  });
});
