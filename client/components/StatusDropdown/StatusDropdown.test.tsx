import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-react'
import { userEvent } from "@vitest/browser/context";
import StatusDropdown from './StatusDropdown';

describe('StatusDropdown', () => {
  it('should render with current status', async () => {
    const onStatusChange = vi.fn();
    const screen = await render(
      <StatusDropdown 
        currentStatus="APPROVED" 
        onStatusChange={onStatusChange} 
      />
    );
    
    expect(screen.getByText('Edit Status')).toBeInTheDocument();
  });

  it('should open dropdown on click', async () => {
    const onStatusChange = vi.fn();
    const screen = await render(
      <StatusDropdown 
        currentStatus="APPROVED" 
        onStatusChange={onStatusChange} 
      />
    );
    
    const button = screen.getByText('Edit Status');
    await userEvent.click(button);
    
    expect(screen.getByText('Final Approved')).toBeInTheDocument();
    expect(screen.getByText('Rejected')).toBeInTheDocument();
  });

  it('should call onStatusChange when selecting new status', async () => {
    const onStatusChange = vi.fn();
    const screen = await render(
      <StatusDropdown 
        currentStatus="APPROVED" 
        onStatusChange={onStatusChange} 
      />
    );
    
    await userEvent.click(screen.getByText('Edit Status'));
    await userEvent.click(screen.getByText('Rejected'));
    
    expect(onStatusChange).toHaveBeenCalledWith('REJECTED');
  });

  it('should disable button when disabled prop is true', async () => {
    const onStatusChange = vi.fn();
    const screen = await render(
      <StatusDropdown 
        currentStatus="APPROVED" 
        onStatusChange={onStatusChange}
        disabled={true}
      />
    );
    
    const button = screen.getByText('Updating...');
    expect(button).toBeDisabled();
  });
});