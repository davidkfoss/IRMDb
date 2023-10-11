export const directions = ['asc', 'desc'] as const;

export type Direction = (typeof directions)[number];
