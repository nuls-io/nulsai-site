import { Generics, Property } from '@tsed/schema'

@Generics('T')
class APIResponse<T> {
  @Property()
  public status: number = 200
  @Property()
  public message: string = 'success'
  @Property('T')
  public data: T

  constructor(data: T = null as T) {
    this.data = data
  }
  public static Ok(data: unknown): APIResponse<unknown> {
    const apiResponse = new APIResponse()
    apiResponse.data = data
    return apiResponse
  }

  public static Forbidden(message: string, data: unknown = null): APIResponse<unknown> {
    const apiResponse = new APIResponse()
    apiResponse.status = 403
    apiResponse.message = message
    apiResponse.data = data
    return apiResponse
  }
}

export default APIResponse
