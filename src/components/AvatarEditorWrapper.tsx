import 'client-only'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useEffect, useRef, useState } from 'react'
import AvatarEditor from 'react-avatar-editor'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { assert } from '@/lib/client'
import { Slider } from '@/components/ui/slider'

interface AvatarEditorWrapperProps extends LayoutProps {
  onAvatarCropped: (canvas: HTMLCanvasElement) => Promise<void>
}

// 头像裁减弹窗
export default function AvatarEditorWrapper({ children, onAvatarCropped }: AvatarEditorWrapperProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [scale, setScale] = useState(1)
  const t = useTranslations('components.AvatarEditorWrapper')
  const inputRef = useRef<HTMLInputElement>(null)
  const editorRef = useRef<AvatarEditor>(null)
  const nowImageSrc = useRef<string>('')
  // 宽度，如果小于400设置为240px，大于400设置为280px
  const canvasLength = window.innerWidth < 400 ? 220 : 280
  const onClickTrigger = () => {
    inputRef.current?.click()
  }
  useEffect(() => {
    inputRef.current?.addEventListener('change', (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result
        if (typeof result === 'string') {
          nowImageSrc.current = result
          setOpen(true)
        }
      }
      reader.readAsDataURL(file)
    })
  }, [])
  useEffect(() => {
    if (inputRef.current && !open) {
      inputRef.current.value = ''
    }
  }, [open])

  const onSubmitted = async () => {
    setLoading(true)
    assert(editorRef.current, 'editorRef.current is null')
    // 缩放
    const canvas = editorRef.current.getImage()
    const newCanvas = document.createElement('canvas')
    newCanvas.width = 500
    newCanvas.height = 500
    const ctx = newCanvas.getContext('2d')
    assert(ctx, 'ctx is null')
    ctx.drawImage(canvas, 0, 0, 500, 500)
    await onAvatarCropped(newCanvas)
      .then(() => {
        setOpen(false)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      <div className="cursor-pointer" onClick={onClickTrigger}>
        {children}
      </div>
      <input className="hidden" type="file" accept="image/*" ref={inputRef} />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent aria-describedby={undefined} className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="w-full">{t('title')}</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center">
            <AvatarEditor
              image={nowImageSrc.current}
              ref={editorRef}
              width={canvasLength}
              height={canvasLength}
              scale={scale}
              className="rounded-lg border"
            />
          </div>
          <div>
            <Slider
              min={1}
              max={2}
              step={0.01}
              defaultValue={[scale]}
              onValueChange={(values) => setScale(values[0])}
            />
          </div>
          <Button className="flex p-0" disabled={loading} onClick={onSubmitted}>
            {loading && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
            {loading ? t('btn.loading') : t('btn.save')}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  )
}
