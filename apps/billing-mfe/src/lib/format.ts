export const fmtAmount = (n: number) => `$${n.toLocaleString('en-US')}`;

export const fmtDate = (s: string) =>
  new Date(s).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
