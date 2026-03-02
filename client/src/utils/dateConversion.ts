export const FormatDate = (data: string): string => {
  const date = new Date(data);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};
