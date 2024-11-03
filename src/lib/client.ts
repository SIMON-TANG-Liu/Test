import 'client-only'
import { ReadonlyURLSearchParams } from 'next/navigation'

/**
 * 从searchParams中创建查询字符串，如果查询参数为空，则返回prefix
 * 参考：https://github.com/vercel/next.js/discussions/47583#discussioncomment-5449707
 * @param searchParams - URLSearchParams，查询参数，由useSearchParams()返回
 * @param pathname - 前缀，默认为空字符串，一般应为当前页面的pathname
 * @param update - 更新查询参数的方法，可选
 */
export function createQueryFromSearchParams({
  searchParams,
  prefix,
  update
}: {
  searchParams: ReadonlyURLSearchParams
  prefix?: string
  update?: (current: URLSearchParams) => URLSearchParams | void
}) {
  let current = new URLSearchParams(Array.from(searchParams.entries()))
  const r = update?.(current)
  if (r) current = r
  const search = current.toString()
  prefix = prefix || ''
  return search ? `${prefix}?${search}` : prefix
}

/**
 * 断言函数，如果条件不成立则抛出异常
 * @param condition 判断条件
 * @param message 异常信息
 */
export function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message)
  }
}

/**
 * 复制文本到剪贴板，异步函数，使用现代浏览器的API
 * @param  text 要复制的文本
 */
export const copyTextToClipboard = async (text: string) => {
  /**
   * 使用旧的API复制文本到剪贴板，兼容性更好
   */
  function fallbackCopyToClipboard() {
    const textArea = document.createElement('textarea')
    textArea.value = text
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
  }
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    fallbackCopyToClipboard()
  }
}
