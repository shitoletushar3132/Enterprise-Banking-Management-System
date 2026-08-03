import { buildPaginationMeta, getSkipTake, getSort } from './pagination.util';
import { SortOrder } from '../enums/sort-order.enum';

describe('pagination.util', () => {
  it('builds pagination meta correctly', () => {
    const meta = buildPaginationMeta(2, 10, 25);

    expect(meta.totalPages).toBe(3);
    expect(meta.hasNextPage).toBe(true);
    expect(meta.hasPreviousPage).toBe(true);
  });

  it('computes skip and take from query', () => {
    expect(getSkipTake({ page: 3, limit: 15 })).toEqual({ skip: 30, take: 15 });
  });

  it('maps sort order to mongoose sort object', () => {
    expect(getSort({ sortBy: 'name', sortOrder: SortOrder.ASC })).toEqual({ name: 1 });
    expect(getSort({})).toEqual({ createdAt: -1 });
  });
});
