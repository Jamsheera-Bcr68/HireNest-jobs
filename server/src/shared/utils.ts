export const getMonthAndYear = (stringDate: string): string => {
  const date = new Date(stringDate);

  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();
  return `${month} ${year}`;
};

export const getDateAndTime = (d: Date) => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');

  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');

  return {
    date: `${year}-${month}-${day}`,
    time: `${hours}:${minutes}`,
  };
};

export const getTime = (data: Date): string => {
  const date: Date = new Date(data);

  const formatted = date.toLocaleString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
  return formatted;
};

export function percentageCalculator(
  current: number,
  prev: number
): { percentage: number; isPositive: boolean } {
  if (prev == 0) {
    return {
      percentage: current > 0 ? 100 : 0,
      isPositive: current >= prev,
    };
  } else {
    return {
      percentage: Number((((current - prev) / prev) * 100).toFixed(1)),
      isPositive: current >= prev,
    };
  }
}

export function getPercentsgeOfTotal(total: number, value: number): number {
  return Number(((value / total) * 100).toFixed(2))
}

export const getDayAndDate = (date:Date): string => {
  const today = new Date(date);
  const formatted = today.toLocaleDateString('en-Us', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
  return formatted;
};
