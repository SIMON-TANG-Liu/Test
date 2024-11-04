import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import CodeBlock from '../src/app/(dashboard)/_components/quick-start-code/CodeBlock'

// 一个测试分支的标记
describe('CodeBlock Component', () => {
  test('单个f""模板语法字符串', () => {
    const code = 'print(f"I have {number} cars")'
    const { container } = render(<CodeBlock code={code} />)

    // 检查 <pre> 标签
    expect(container.querySelector('pre')).toBeInTheDocument()

    // 检查 <code> 标签
    expect(container.querySelector('code')).toBeInTheDocument()

    // 检查 .string 类
    expect(container.querySelectorAll('.string')).toHaveLength(2)

    // 检查 .keyword 类
    expect(container.querySelectorAll('.keyword')).toHaveLength(0)

    // 检查 .number 类
    expect(container.querySelectorAll('.number')).toHaveLength(0)

    // 检查 .operator 类
    expect(container.querySelectorAll('.operator')).toHaveLength(0)

    // 检查 .comment 类
    expect(container.querySelectorAll('.comment')).toHaveLength(0)

    // 检查 .built-in 类
    expect(container.querySelectorAll('.built-in')).toHaveLength(0)
  })

  test('单个string', () => {
    const code = 'print("hallo world!")'
    const { container } = render(<CodeBlock code={code} />)

    // 检查 <pre> 标签
    expect(container.querySelector('pre')).toBeInTheDocument()

    // 检查 <code> 标签
    expect(container.querySelector('code')).toBeInTheDocument()

    // 检查 .string 类
    expect(container.querySelectorAll('.string')).toHaveLength(1)

    // 检查 .keyword 类
    expect(container.querySelectorAll('.keyword')).toHaveLength(0)

    // 检查 .number 类
    expect(container.querySelectorAll('.number')).toHaveLength(0)

    // 检查 .operator 类
    expect(container.querySelectorAll('.operator')).toHaveLength(0)

    // 检查 .comment 类
    expect(container.querySelectorAll('.comment')).toHaveLength(0)

    // 检查 .built-in 类
    expect(container.querySelectorAll('.built-in')).toHaveLength(0)
  })

  test('单个keyword', () => {
    const code = 'import pytorch'
    const { container } = render(<CodeBlock code={code} />)

    // 检查 <pre> 标签
    expect(container.querySelector('pre')).toBeInTheDocument()

    // 检查 <code> 标签
    expect(container.querySelector('code')).toBeInTheDocument()

    // 检查 .string 类
    expect(container.querySelectorAll('.string')).toHaveLength(0)

    // 检查 .keyword 类
    expect(container.querySelectorAll('.keyword')).toHaveLength(1)

    // 检查 .number 类
    expect(container.querySelectorAll('.number')).toHaveLength(0)

    // 检查 .operator 类
    expect(container.querySelectorAll('.operator')).toHaveLength(0)

    // 检查 .comment 类
    expect(container.querySelectorAll('.comment')).toHaveLength(0)

    // 检查 .built-in 类
    expect(container.querySelectorAll('.built-in')).toHaveLength(0)
  })

  test('单个number', () => {
    const code = 'a = 5201314'
    const { container } = render(<CodeBlock code={code} />)

    // 检查 <pre> 标签
    expect(container.querySelector('pre')).toBeInTheDocument()

    // 检查 <code> 标签
    expect(container.querySelector('code')).toBeInTheDocument()

    // 检查 .string 类
    expect(container.querySelectorAll('.string')).toHaveLength(0)

    // 检查 .keyword 类
    expect(container.querySelectorAll('.keyword')).toHaveLength(0)

    // 检查 .number 类
    expect(container.querySelectorAll('.number')).toHaveLength(1)

    // 检查 .operator 类
    expect(container.querySelectorAll('.operator')).toHaveLength(1)

    // 检查 .comment 类
    expect(container.querySelectorAll('.comment')).toHaveLength(0)

    // 检查 .built-in 类
    expect(container.querySelectorAll('.built-in')).toHaveLength(0)
  })

  test('单个operator', () => {
    const code = 'a = b'
    const { container } = render(<CodeBlock code={code} />)

    // 检查 <pre> 标签
    expect(container.querySelector('pre')).toBeInTheDocument()

    // 检查 <code> 标签
    expect(container.querySelector('code')).toBeInTheDocument()

    // 检查 .string 类
    expect(container.querySelectorAll('.string')).toHaveLength(0)

    // 检查 .keyword 类
    expect(container.querySelectorAll('.keyword')).toHaveLength(0)

    // 检查 .number 类
    expect(container.querySelectorAll('.number')).toHaveLength(0)

    // 检查 .operator 类
    expect(container.querySelectorAll('.operator')).toHaveLength(1)

    // 检查 .comment 类
    expect(container.querySelectorAll('.comment')).toHaveLength(0)

    // 检查 .built-in 类
    expect(container.querySelectorAll('.built-in')).toHaveLength(0)
  })

  test('单个comment', () => {
    const code = '# I Love you~ '
    const { container } = render(<CodeBlock code={code} />)

    // 检查 <pre> 标签
    expect(container.querySelector('pre')).toBeInTheDocument()

    // 检查 <code> 标签
    expect(container.querySelector('code')).toBeInTheDocument()

    // 检查 .string 类
    expect(container.querySelectorAll('.string')).toHaveLength(0)

    // 检查 .keyword 类
    expect(container.querySelectorAll('.keyword')).toHaveLength(0)

    // 检查 .number 类
    expect(container.querySelectorAll('.number')).toHaveLength(0)

    // 检查 .operator 类
    expect(container.querySelectorAll('.operator')).toHaveLength(0)

    // 检查 .comment 类
    expect(container.querySelectorAll('.comment')).toHaveLength(1)

    // 检查 .built-in 类
    expect(container.querySelectorAll('.built-in')).toHaveLength(0)
  })

  test('单个built-in', () => {
    const code = `
    for i in range(10):
      print(i)
    `

    const { container } = render(<CodeBlock code={code} />)

    // 检查 <pre> 标签
    expect(container.querySelector('pre')).toBeInTheDocument()

    // 检查 <code> 标签
    expect(container.querySelector('code')).toBeInTheDocument()

    // 检查 .string 类
    expect(container.querySelectorAll('.string')).toHaveLength(0)

    // 检查 .keyword 类
    expect(container.querySelectorAll('.keyword')).toHaveLength(2)

    // 检查 .number 类
    expect(container.querySelectorAll('.number')).toHaveLength(1)

    // 检查 .operator 类
    expect(container.querySelectorAll('.operator')).toHaveLength(0)

    // 检查 .comment 类
    expect(container.querySelectorAll('.comment')).toHaveLength(0)

    // 检查 .built-in 类
    expect(container.querySelectorAll('.built-in')).toHaveLength(1)
  })

  test('综合场景', () => {
    const code = `
# 导入 math 模块
import math

# 创建一个字符串
message = "Hello, Python!"

# 打印字符串
print(message)

# 使用 range 函数和一些运算
for i in range(1, 11):
    square = i ** 2
    square_root = math.sqrt(i)
    print(f"数字: {i}, 平方: {square}, 平方根: {square_root:.2f}")
    `

    const { container } = render(<CodeBlock code={code} />)

    // 检查 <pre> 标签
    expect(container.querySelector('pre')).toBeInTheDocument()

    // 检查 <code> 标签
    expect(container.querySelector('code')).toBeInTheDocument()

    // 检查 .string 类
    expect(container.querySelectorAll('.string')).toHaveLength(4)

    // 检查 .keyword 类
    expect(container.querySelectorAll('.keyword')).toHaveLength(3)

    // 检查 .number 类
    expect(container.querySelectorAll('.number')).toHaveLength(3)

    // 检查 .operator 类
    expect(container.querySelectorAll('.operator')).toHaveLength(4)

    // 检查 .comment 类
    expect(container.querySelectorAll('.comment')).toHaveLength(4)

    // 检查 .built-in 类
    expect(container.querySelectorAll('.built-in')).toHaveLength(1)
  })
})
