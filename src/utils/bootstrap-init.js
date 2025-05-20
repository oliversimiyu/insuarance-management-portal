// This file initializes Bootstrap JavaScript components

// Function to initialize all Bootstrap components
const initBootstrapComponents = () => {
  // Initialize dropdowns
  const dropdownElementList = document.querySelectorAll('.dropdown-toggle');
  if (dropdownElementList.length > 0) {
    const dropdownList = [...dropdownElementList].map(dropdownToggleEl => {
      return new window.bootstrap.Dropdown(dropdownToggleEl);
    });
  }

  // Initialize tooltips if needed
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  if (tooltipTriggerList.length > 0) {
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => {
      return new window.bootstrap.Tooltip(tooltipTriggerEl);
    });
  }

  // Initialize popovers if needed
  const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
  if (popoverTriggerList.length > 0) {
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => {
      return new window.bootstrap.Popover(popoverTriggerEl);
    });
  }
};

export default initBootstrapComponents;
