import { ApiResult } from "@/models/ApiResult"
import { BaseService } from "./Common/BaseService"
import type { AxiosResponse } from "axios"
import { ExampleModel } from "../models/entities/ExampleModels"

export class GroupService extends BaseService {
    constructor() {
        super("Group")
    }
    Get(id: string): Promise<AxiosResponse<ApiResult<ExampleModel>>> {
        return this.client.Get<ApiResult<ExampleModel>>(`${this.baseUrl}/Get?id=${id}`)
    }
    Post(payload: ExampleModel): Promise<AxiosResponse<ApiResult<ExampleModel>>> {
        return this.client.Post<ApiResult<ExampleModel>>(`${this.baseUrl}/EditGroup`, payload)
    }
    Delete(id: number): Promise<AxiosResponse<ApiResult<ExampleModel>>> {
        return this.client.Delete<ApiResult<ExampleModel>>(`${this.baseUrl}/${id}`, null)
    }
    Update(id: number, payload: ExampleModel): Promise<AxiosResponse<ApiResult<ExampleModel>>> {
        return this.client.Put<ApiResult<ExampleModel>>(`${this.baseUrl}/${id}`, payload)
    }
}
