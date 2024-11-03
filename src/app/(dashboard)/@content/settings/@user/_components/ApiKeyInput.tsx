'use client'

import { useTranslations } from 'next-intl'
import { useToast } from '@/hooks/use-toast'
import { useUserContext } from '@/hooks/use-user'
import { useState } from 'react'
import { Copy, Eye, EyeOff } from 'lucide-react'
import { copyTextToClipboard } from '@/lib/client'

export default function ApiKeyInput() {
  const t = useTranslations('Dashboard._content.Settings._user.development.apiKey')
  const apiKey = useUserContext().user.apiKey
  const [hidden, setHidden] = useState(true)
  const { toast } = useToast()
  const onCopy = async () => {
    copyTextToClipboard(apiKey.key)
      .then(() => {
        toast({ description: t('copy.success') })
      })
      .catch(() => {
        toast({ description: t('copy.failure') })
      })
  }

  return (
    <div className="h-10 border flex px-3 items-center rounded-md gap-4 w-[235px] shrink-0 text-xs">
      <p className="w-[150px] flex shrink-0 items-center">
        {hidden ? <span className="pt-1.5">{'* '.repeat(apiKey.key.length - 2)}</span> : <span>{apiKey.key}</span>}
      </p>
      <div className="flex items-center gap-2 *:w-4 *:h-4">
        <EyeSwitcher hidden={hidden} onHiddenChange={setHidden} />
        <button onClick={onCopy}>
          <Copy className="w-full h-full" />
        </button>
      </div>
    </div>
  )
}

function EyeSwitcher({ hidden, onHiddenChange }: { hidden: boolean; onHiddenChange: (hidden: boolean) => void }) {
  return (
    <button
      className="cursor-pointer"
      onClick={() => {
        onHiddenChange(!hidden)
      }}
    >
      {hidden ? <Eye className="w-full h-full" /> : <EyeOff className="w-full h-full" />}
    </button>
  )
}
