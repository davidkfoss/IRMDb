export const sortOptions = ['Rating', 'Name', 'Release Date', 'Popularity'] as const;

export type SortOption = (typeof sortOptions)[number];
