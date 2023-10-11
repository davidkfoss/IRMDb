export default function mockPagination<T>(data: T[], page: number): T[] { // Something wrong when searching
  const pageSize = 10;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  if (start > data.length) {
      console.log(page, start)
    return data;
  } else if (end > data.length) {
      console.log(page, end)
    return data;
  }
  console.log(page, start, end)
  return data.slice(start, end);
}
