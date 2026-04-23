export const getMonthAndYear=(stringDate:string):string=>{
    const date = new Date(stringDate);

const month = date.toLocaleString('default', { month: 'long' });
const year = date.getFullYear();
return `${month} ${year}`
}