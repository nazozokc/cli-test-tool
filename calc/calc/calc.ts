export function calc(expr: string): number {
  return Function(`return (${expr})`)();
}
