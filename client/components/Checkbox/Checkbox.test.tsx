import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-react'
import Checkbox from './Checkbox';

describe('Checkbox', () => {
  it('should render with label', async() => {
    const screen = await render(<Checkbox id="test" name="test" labelPosition="right">Test Label</Checkbox>);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('should render label on left when labelPosition is left', async () => {
    const { container, debug } = await render(
      <Checkbox id="test" name="test" labelPosition="left">Test</Checkbox>
    );
    
    const label = container.querySelector('[data-slot="label"]');
    expect(label?.classList.contains('order-first')).toBe(true);
  });
});