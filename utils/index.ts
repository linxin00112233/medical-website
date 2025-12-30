import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
/**
 * 拼接并合并 Tailwind CSS 类名
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 日期格式化函数
 */
export function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
}

/**
 * 异步等待指定毫秒数
 */
export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

