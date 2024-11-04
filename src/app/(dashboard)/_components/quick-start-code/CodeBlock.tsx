import React, { Fragment } from 'react'

const CodeBlock = ({ code }: { code: string }) => {
  // 创建 JSX 元素数组
  const createElements = (code: string) => {
    const parts = []
    let lastIndex = 0

    // 定义正则表达式来匹配不同类型的代码片段

    const regex = /(f"(.*?)"|".*?"|\b(import|for|in)\b|# .*|\b(\d+(\.\d+)?)\b|\s(\+|-|=|\*\*|\/)|\b(range)\b)/g
    let match: RegExpExecArray | null

    // 循环正则表达式的匹配结果
    while ((match = regex.exec(code)) !== null) {
      // 将匹配到的代码片段之前的内容作为普通文本添加到 parts 数组中
      if (match.index > lastIndex) {
        parts.push(<span key={lastIndex}>{code.substring(lastIndex, match.index)}</span>)
      }

      // 根据不同的匹配结果，将代码片段添加到 parts 数组中，并应用相应的样式类
      if (match[0].startsWith('f"')) {
        const fStringContent = match[0].substring(2, match[0].length - 1) // 去除f和双引号
        const fStringParts = fStringContent.split(/({.*?})/).filter((part) => part !== '') // 按大括号拆分内容并去除空串
        fStringParts.forEach((part, index) => {
          if (part.startsWith('{') && part.endsWith('}')) {
            part = part.substring(1, part.length - 1) // 去除大括号
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            match &&
              parts.push(
                <Fragment key={`${match.index}-${index}`}>
                  <span className="text-sky-600">{'{'}</span>
                  <span>{part}</span>
                  <span className="text-sky-600">{'}'}</span>
                </Fragment>
              )
          } else {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            match &&
              parts.push(
                <span key={`${match.index}-${index}`} className="string text-rose-800">
                  {part}
                </span>
              )
          }
        })
      } else if (match[0].startsWith('"')) {
        parts.push(
          <span key={match.index} className="string">
            {match[0]}
          </span>
        )
      } else if (match[0].startsWith('# ')) {
        parts.push(
          <span key={match.index} className="comment">
            {match[0]}
          </span>
        )
      } else if (/\b(import|for|in)\b/.test(match[0])) {
        parts.push(
          <span key={match.index} className="keyword">
            {match[0]}
          </span>
        )
      } else if (/\b(\d+(\.\d+)?)\b/.test(match[0])) {
        parts.push(
          <span key={match.index} className="number">
            {match[0]}
          </span>
        )
      } else if (/\s(\+|-|=|\*\*|\/)/.test(match[0])) {
        parts.push(
          <span key={match.index} className="operator">
            {match[0]}
          </span>
        )
      } else if (/\b(range)\b/.test(match[0])) {
        parts.push(
          <span key={match.index} className="built-in">
            {match[0]}
          </span>
        )
      }

      // 更新 lastIndex 以继续处理下一个匹配
      lastIndex = regex.lastIndex
    }

    // 将剩余的代码片段作为普通文本添加到 parts 数组中
    if (lastIndex < code.length) {
      parts.push(<span key={lastIndex}>{code.substring(lastIndex)}</span>)
    }

    // 返回包含所有代码片段的 JSX 元素数组
    return parts
  }

  return (
    <pre className="w-full python bg-muted rounded-lg px-4 py-3 text-sm flex flex-col">
      <code>{createElements(code)}</code>
    </pre>
  )
}

export default CodeBlock
