import { ApiResult } from "@/models/ApiResult"
import { BaseService } from "./Common/BaseService"
import type { AxiosResponse } from "axios"
import { ExampleReqModel, ExampleResModel } from "../models/entities/ExampleModels"

export class GroupService extends BaseService {
    constructor() {
        super("Group")
    }
    Get(id: string): Promise<AxiosResponse<ApiResult<ExampleResModel>>> {
        return this.client.Get<ApiResult<ExampleResModel>>(`${this.baseUrl}/Get?id=${id}`)
    }
    Post(payload: ExampleReqModel): Promise<AxiosResponse<ApiResult<ExampleResModel>>> {
        return this.client.Post<ApiResult<ExampleResModel>>(`${this.baseUrl}/EditGroup`, payload)
    }
    Delete(id: number): Promise<AxiosResponse<ApiResult<ExampleResModel>>> {
        return this.client.Delete<ApiResult<ExampleResModel>>(`${this.baseUrl}/${id}`, null)
    }
    Update(id: number, payload: ExampleReqModel): Promise<AxiosResponse<ApiResult<ExampleResModel>>> {
        return this.client.Put<ApiResult<ExampleResModel>>(`${this.baseUrl}/${id}`, payload)
    }
}
