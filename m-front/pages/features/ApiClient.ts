import { auth, storage, provider } from "../../src/firebase/firebase";
import { fetchClient } from './fetchClient'
import axios from 'axios';

type Method = "get" | "post" | "patch" | "put" | "delete";

export interface CommonResult<T> {
  success: boolean
  status: number
  body?: T
}
const BASE_URL = process.env.API_BASE

const postRequest = <T>(
  endpoint: string,
  method: Method,
  params: object,
  headerInfo?: object
): Promise<CommonResult<T>> => {
  const headers = {
    'Content-Type': 'application/json',
    ...headerInfo
  }

  let options: any = {
    method,
    headers,
    credentials: 'same-origin'
  }

  if (method !== 'get') {
    options = {
      ...options,
      body: JSON.stringify(params)
    }
  }
  return fetchClient(BASE_URL + endpoint, options)
}

// post
export const postSignin=(params: {
  email: string
  password: string
}): Promise<CommonResult<{
  access_token: string
  client: string
  uid: string
}>>  => postRequest("/api/v1/auth/users", "post" , params)

export const postSignup = (params: {
  email: string
  password: string
}): Promise<CommonResult<{
  access_token: string
  client: string
  uid: string
}>> => postRequest('auth', 'post', params)

class ApiClient {
  async authenticate() {
    const token = await auth.currentUser.getIdToken(true)
    const config = { headers: { authorization: `Bearer ${token}` } };
    axios.get('/api/v1/auth/users', config,);
  }
}