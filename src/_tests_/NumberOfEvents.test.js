import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsComponent;
  beforeEach(() => {
    NumberOfEventsComponent = render(<NumberOfEvents />);
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
