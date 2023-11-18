import { fireEvent, render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders the button text', () => {
    render(<Button loading={false}>Click me</Button>);
    const buttonElement = screen.getByText('Click me');
    expect(buttonElement).toBeInTheDocument();
  });

  it('calls the onClick handler when clicked', () => {
    const onClickMock = vi.fn();
    render(
      <Button onClick={onClickMock} loading={false}>
        Click me
      </Button>
    );
    const buttonElement = screen.getByText('Click me');
    fireEvent.click(buttonElement);
    expect(onClickMock).toHaveBeenCalled();
  });

  it('disables the button when loading is true', () => {
    render(<Button loading={true}>Click me</Button>);
    const buttonElement = screen.queryByText('Click me');
    expect(buttonElement).toBeNull();
  });
});
