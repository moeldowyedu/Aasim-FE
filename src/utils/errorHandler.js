/**
 * Handle API errors and return user-friendly messages
 * @param {Error} error - The error object from axios
 * @param {string} fallbackMessage - Default message if no specific error found
 * @returns {string} User-friendly error message
 */
export const handleApiError = (error, fallbackMessage = 'An error occurred') => {
  if (error.response) {
    // Server responded with an error status code
    const data = error.response.data;

    // Check for validation errors
    if (data?.errors && typeof data.errors === 'object') {
      // Format validation errors (Laravel format)
      const errorMessages = Object.entries(data.errors)
        .map(([field, messages]) => {
          if (Array.isArray(messages)) {
            return messages.join(', ');
          }
          return messages;
        })
        .join('\n');
      return errorMessages;
    }

    // Return specific error message
    if (data?.message) {
      return data.message;
    }

    // Handle specific status codes
    switch (error.response.status) {
      case 401:
        return 'Unauthorized. Please login again.';
      case 403:
        return 'You do not have permission to perform this action.';
      case 404:
        return 'The requested resource was not found.';
      case 422:
        return data?.message || 'Validation failed. Please check your input.';
      case 429:
        return 'Too many requests. Please try again later.';
      case 500:
        return 'Server error. Please try again later.';
      case 503:
        return 'Service temporarily unavailable. Please try again later.';
      default:
        return fallbackMessage;
    }
  } else if (error.request) {
    // Request was made but no response received
    return 'Cannot connect to server. Please check your internet connection.';
  } else {
    // Error in request configuration
    return error.message || fallbackMessage;
  }
};

/**
 * Format validation errors for display
 * @param {Object} errors - Validation errors object
 * @returns {string} Formatted error string
 */
export const formatValidationErrors = (errors) => {
  if (!errors || typeof errors !== 'object') {
    return '';
  }

  return Object.entries(errors)
    .map(([field, messages]) => {
      const fieldName = field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      const errorMessage = Array.isArray(messages) ? messages[0] : messages;
      return `${fieldName}: ${errorMessage}`;
    })
    .join('\n');
};

/**
 * Check if error is a network error
 * @param {Error} error - The error object
 * @returns {boolean}
 */
export const isNetworkError = (error) => {
  return error.request && !error.response;
};

/**
 * Check if error is an authentication error
 * @param {Error} error - The error object
 * @returns {boolean}
 */
export const isAuthError = (error) => {
  return error.response && error.response.status === 401;
};

/**
 * Check if error is a validation error
 * @param {Error} error - The error object
 * @returns {boolean}
 */
export const isValidationError = (error) => {
  return error.response && error.response.status === 422;
};
