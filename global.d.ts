import en from './messages/en'
import React from 'react'

export type Messages = typeof en

declare global {
  // 使用 `next-intl` 的类型检查
  interface IntlMessages extends Messages {}
  // React 组件的 props 类型
  type LayoutProps<T = NonNullable<unknown>> = Readonly<T> & Readonly<{ children?: React.ReactNode }>
}
