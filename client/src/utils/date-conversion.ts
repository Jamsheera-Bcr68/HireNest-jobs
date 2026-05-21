export const FormatDate = (data: string): string => {
  const date = new Date(data);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatTimeForInput = (time: string) => {
  const [timePart, modifier] = time.split(' '); // "10:30", "AM"
  let [hours, minutes] = timePart.split(':');

  if (modifier === 'PM' && hours !== '12') {
    hours = String(parseInt(hours) + 12);
  }

  if (modifier === 'AM' && hours === '12') {
    hours = '00';
  }

  return `${hours.padStart(2, '0')}:${minutes}`;
};

export const formatDateForInput = (date: string | Date) => {
  console.log('date  ,,', date);

  const d = new Date(date);
  return d.toISOString().split('T')[0];
};

export function convertDateStringToInputDate(dateStr: string): string {
  const [day, monthName, year] = dateStr.split(' ');

  const months: Record<string, string> = {
    January: '01',
    February: '02',
    March: '03',
    April: '04',
    May: '05',
    June: '06',
    July: '07',
    August: '08',
    September: '09',
    October: '10',
    November: '11',
    December: '12',
  };

  return `${year}-${months[monthName]}-${day.padStart(2, '0')}`;
}

export function to12Hour(time: string): string {
  let [hours, minutes] = time.split(':').map(Number);

  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours === 0 ? 12 : hours;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${ampm}`;
}
