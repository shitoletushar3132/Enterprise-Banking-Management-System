import { Types } from 'mongoose';
import { PaginationQueryDto } from '../dto/pagination-query.dto';
import { SortOrder } from '../enums/sort-order.enum';
import { PaginatedResult, PaginationMeta } from '../interfaces/api-response.interface';

export function buildPaginationMeta(page: number, limit: number, total: number): PaginationMeta {
  const totalPages = Math.ceil(total / limit) || 0;

  return {
    page,
    limit,
    total,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
}

export function toPaginatedResult<T>(
  items: T[],
  page: number,
  limit: number,
  total: number,
): PaginatedResult<T> {
  return {
    items,
    meta: buildPaginationMeta(page, limit, total),
  };
}

export function getSkipTake(query: PaginationQueryDto): { skip: number; take: number } {
  const page = query.page ?? 1;
  const limit = query.limit ?? 20;
  return {
    skip: (page - 1) * limit,
    take: limit,
  };
}

export function getSort(query: PaginationQueryDto): Record<string, 1 | -1> {
  const sortBy = query.sortBy ?? 'createdAt';
  const sortOrder = query.sortOrder === SortOrder.ASC ? 1 : -1;
  return { [sortBy]: sortOrder };
}

export function toObjectId(id: string): Types.ObjectId {
  return new Types.ObjectId(id);
}
