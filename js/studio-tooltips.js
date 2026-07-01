// Studio PleniCare Tooltip Functionality
// Simple tooltip functionality
function showTooltip(iconElement, content) {
  // Remove any existing tooltip immediately without delay
  const existing = document.getElementById('activeTooltip');
  if (existing) {
    existing.remove();
  }

  // Create tooltip element
  const tooltip = document.createElement('div');
  tooltip.id = 'activeTooltip';
  tooltip.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 15px;">
      <div style="flex: 1; padding-right: 10px;">
        ${content}
      </div>
      <button onclick="hideTooltip()" style="
        background: #7B4B94;
        color: white;
        border: none;
        font-size: 14px;
        cursor: pointer;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        flex-shrink: 0;
        margin-top: -5px;
      ">×</button>
    </div>
  `;

  // Style the tooltip
  tooltip.style.cssText = `
    position: fixed;
    background: white;
    border: 2px solid #7B4B94;
    border-radius: 10px;
    padding: 15px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    max-width: 280px;
    font-size: 14px;
    line-height: 1.5;
    color: #333;
    z-index: 10000;
    word-wrap: break-word;
  `;

  // Add to body
  document.body.appendChild(tooltip);

  // Position tooltip
  const rect = iconElement.getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();

  let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
  let top = rect.bottom + 10;

  // Keep tooltip on screen
  if (left < 10) left = 10;
  if (left + tooltipRect.width > window.innerWidth - 10) {
    left = window.innerWidth - tooltipRect.width - 10;
  }

  // If tooltip goes below viewport, show above
  if (top + tooltipRect.height > window.innerHeight) {
    top = rect.top - tooltipRect.height - 10;
  }

  tooltip.style.left = left + 'px';
  tooltip.style.top = top + 'px';

  console.log('Tooltip created and positioned');

  // Remove any existing click listeners first
  document.removeEventListener('click', window.tooltipClickHandler);

  // Close on click outside - assign to window for easy removal
  window.tooltipClickHandler = function(e) {
    if (!tooltip.contains(e.target) && !iconElement.contains(e.target)) {
      // Check if clicked on another service icon
      const clickedIcon = e.target.closest('.service-icon');
      if (!clickedIcon) {
        hideTooltip();
      }
    }
  };

  // Add listener with a small delay to avoid immediate triggering
  setTimeout(() => {
    document.addEventListener('click', window.tooltipClickHandler);
  }, 50);
}

function hideTooltip() {
  const existing = document.getElementById('activeTooltip');
  if (existing) {
    existing.remove();
    console.log('Tooltip removed');
  }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
  console.log('Page loaded, initializing tooltips');

  // Add hover effects to service icons
  const serviceIcons = document.querySelectorAll('.service-icon');
  console.log('Found', serviceIcons.length, 'service icons');

  serviceIcons.forEach((icon, index) => {
    console.log('Setting up icon', index);

    // Hover effects
    icon.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05)';
      this.style.boxShadow = '0 0 15px rgba(123, 75, 148, 0.5)';
      this.style.borderWidth = '4px';
    });

    icon.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
      this.style.boxShadow = 'none';
      this.style.borderWidth = '3px';
    });
  });

  // Close tooltip on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      hideTooltip();
    }
  });
});

// Test function
function testTooltip() {
  console.log('Test function called');
  const testDiv = document.createElement('div');
  testDiv.style.cssText = 'position: fixed; top: 100px; left: 100px; background: red; color: white; padding: 10px; z-index: 9999;';
  testDiv.textContent = 'Teste funcionando!';
  document.body.appendChild(testDiv);
  setTimeout(() => testDiv.remove(), 3000);
}