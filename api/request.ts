import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
const baseUrl = import.meta.env.VITE_API_BASE_URL || "";
console.log(baseUrl);

class ApiService {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: baseUrl,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  /**
   * 配置拦截器
   */
  private setupInterceptors() {
    // 请求拦截
    this.instance.interceptors.request.use(
      (config) => {
        // 可以在这里统一添加 Token 等认证信息
        // const token = localStorage.getItem('token');
        // if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // 响应拦截
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        // 统一处理响应格式，直接返回 data 内容
        return response.data;
      },
      (error) => {
        // 统一错误提示
        const message =
          error.response?.data?.message || error.message || "Network Error";
        console.error("[API Error]:", message);
        return Promise.reject(error);
      }
    );
  }

  /**
   * GET 请求
   */
  public async get<T>(
    url: string,
    params?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.instance.get(url, { params, ...config });
  }

  /**
   * POST 请求
   */
  public async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.instance.post(url, data, config);
  }

  /**
   * PUT 请求
   */
  public async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.instance.put(url, data, config);
  }

  /**
   * DELETE 请求
   */
  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.delete(url, config);
  }
}

export const apiService = new ApiService();
