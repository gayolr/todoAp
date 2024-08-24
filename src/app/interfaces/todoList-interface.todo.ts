export interface Todo {
    id: number;
    todo: string;
    completed: boolean;
    userId: number;
    isEditable?: boolean;
}

export interface TodoListResponse {
    todos: Todo[];
    total: number;
    skip: number;
    limit: number;
}
