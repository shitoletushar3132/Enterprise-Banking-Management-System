export interface PaginatedMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ApiSuccessResponse<T> {
  success: true;
  message: string;
  data: T;
  meta?: PaginatedMeta;
  timestamp: string;
  path?: string;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errorCode?: string;
  errors?: unknown;
  timestamp: string;
  path?: string;
}
