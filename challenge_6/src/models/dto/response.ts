export default interface DefaultResponse {
  status: {
    code: number
    response: string
    message: string
  }
  result?: any
}
