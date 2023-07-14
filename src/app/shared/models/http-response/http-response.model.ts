export interface HttpResponse<T> {
    success: boolean;
    data: T;
    errorMessage?: string;
    pagination: Pagination;
}

export interface Pagination {
    page: number;
    pageSize: number;
    total: number;
    size: number;
}