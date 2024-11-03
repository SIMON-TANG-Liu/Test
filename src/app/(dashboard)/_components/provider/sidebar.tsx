'use client'
import React, { createContext, useEffect } from 'react'

interface SidebarContextType {
  // 侧边栏是否关闭
  isClosed: Readonly<boolean>
  // 侧边栏自定义属性值，确定data-closed属性是否存在
  dataClosed: Readonly<'' | undefined>
  // 当前侧边栏宽度
  width: Readonly<number>
  // 关闭侧边栏
  onClose: () => void
  // 打开侧边栏
  onOpen: () => void
}

// 侧边栏上下文
const SidebarContext = createContext<SidebarContextType | null>(null)

export const useSidebarContext = () => {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebarContext must be used within SidebarContext')
  }
  return context
}

const PC_OPEN_WIDTH = 255
const PC_CLOSE_WIDTH = 80

export default function SidebarProvider({
  children,
  sidebar
}: {
  children: React.ReactNode
  sidebar: React.ReactNode
}) {
  const [width, setWidth] = React.useState(PC_OPEN_WIDTH)
  const [isClosed, setIsClosed] = React.useState(false)
  const [dataClosed, setDataClosed] = React.useState<'' | undefined>(undefined)
  const onClose = () => setIsClosed(true)
  const onOpen = () => setIsClosed(false)

  useEffect(() => {
    setWidth(isClosed ? PC_CLOSE_WIDTH : PC_OPEN_WIDTH)
    setDataClosed(isClosed ? '' : undefined)
  }, [isClosed])
  return (
    <SidebarContext.Provider value={{ isClosed, onClose, onOpen, dataClosed, width }}>
      <main className="flex w-full relative h-auto min-h-[100dvh]">
        <div
          className="isolate hidden md:block w-72 transition-[width] duration-300 shrink-0"
          style={{ width: width + 'px' }}
        >
          <section
            className="fixed top-0 bg-card h-full border-r box-content transition-[width] duration-300"
            style={{ width: width + 'px' }}
          >
            {sidebar}
          </section>
        </div>
        {children}
      </main>
    </SidebarContext.Provider>
  )
}
