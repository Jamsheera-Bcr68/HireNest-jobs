export const parseApiError = (error: any): string => {
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }

  if (error?.response?.data?.errors?.length) {
    return error.response.data.errors[0];
  }

  if (!error?.response) {
    return 'Network error. Please check your connection.';
  }

  return error.message || 'Something went wrong';
};
