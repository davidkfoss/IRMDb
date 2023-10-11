export default function mockPagination<T>(data: T[], start: number, pageSize: number): T[] {
  // Something wrong when searching
  const end = start + pageSize;

  if (start > data.length) {
    return [];
  } else if (end > data.length) {
    return data.slice(start);
  }
  return data.slice(start, end);
}
