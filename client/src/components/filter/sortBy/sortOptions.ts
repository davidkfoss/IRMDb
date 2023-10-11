export const sortOptions = ['Name', 'Release Date', 'Popularity', 'Rating'] as const;

export type SortOption = (typeof sortOptions)[number];
