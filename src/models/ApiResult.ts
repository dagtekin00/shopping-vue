export class Result {
    constructor() {
        this.isSuccess = false
        this.message = ""
    }

    isSuccess: boolean
    message: string
}

export class ApiResult<T> extends Result {
    constructor() {
        super()
        this.data = null
    }

    data: T | null
}

// export class PaginatedList<T> {
//   constructor() {
//     this.items = null;
//     this.pageNumber = 0;
//     this.totalPages = 0;
//     this.totalCount = 0;
//     this.hasPreviousPage = false;
//     this.hasNextPage = false;
//   }

//   items: Array<T> | null;
//   pageNumber: number;
//   totalPages: number;
//   totalCount: number;
//   hasPreviousPage: boolean;
//   hasNextPage: boolean;
// }
