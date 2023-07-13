export interface HttpResponse<T> {
    success: boolean;
    data: T;
    errorMessage?: string;
}