// convertToSubcurrency.ts
export default function convertToSubcurrency(amount: number): number {
  return Math.round(amount * 100);
}
