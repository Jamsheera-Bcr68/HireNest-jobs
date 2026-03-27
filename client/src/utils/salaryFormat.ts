export function formatSalary(min: number, max: number): string {
  return `${min / 1000}k-${max / 1000}k`;
}
