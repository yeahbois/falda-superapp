import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { Button } from '../Button';

describe('Universal Button Component', () => {
  it('renders correctly with given title', async () => {
    const { getByText } = await render(<Button title="Click Me" />);
    expect(getByText('Click Me')).toBeTruthy();
  });

  it('triggers onPress callback when clicked', async () => {
    const onPressMock = jest.fn();
    const { getByText } = await render(<Button title="Submit" onPress={onPressMock} />);

    fireEvent.press(getByText('Submit'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('does not trigger onPress when disabled', async () => {
    const onPressMock = jest.fn();
    const { getByText } = await render(
      <Button title="Disabled" onPress={onPressMock} disabled />
    );

    fireEvent.press(getByText('Disabled'));
    expect(onPressMock).not.toHaveBeenCalled();
  });
});
