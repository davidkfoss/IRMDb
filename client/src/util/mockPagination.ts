export default function mockPagination<T>(data: T[], page: number): T[] {
  const pageSize = 10;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  if (start > data.length) {
    return [];
  } else if (end > data.length) {
    return data.slice(start);
  }

  return data.slice(start, end);
}
