// 🤡 逆天设计，工作区和/quick-start都要用到快速开始：
// 1. quick-start页面使用
// 2. 工作区当没有任何项目时，显示快速开始
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { TabSidebar } from '@/app/(dashboard)/_components/quick-start-code/TabSidebar'
import { TabKeys } from '@/app/(dashboard)/_components/quick-start-code/utils'
import { Card } from '@/components/ui/card'
import { getIcon } from '@/app/(dashboard)/_components/quick-start-code/icons'
// 任务相关
import IntroductionPlayer from '@/app/(dashboard)/_components/quick-start-code/cases/Introduction'
import ImageClassificationPlayer from '@/app/(dashboard)/_components/quick-start-code/cases/ImageClassification'
import ObjectDetectionPlayer from '@/app/(dashboard)/_components/quick-start-code/cases/ObjectDetection'
import FineTuningPlayer from '@/app/(dashboard)/_components/quick-start-code/cases/FineTuning'
import TextClassificationPlayer from '@/app/(dashboard)/_components/quick-start-code/cases/TextClassification'
import QuantitativeTradingPlayer from '@/app/(dashboard)/_components/quick-start-code/cases/QuantitativeTrading'
// 框架相关
import PyTorchPlayer from '@/app/(dashboard)/_components/quick-start-code/frameworks/PyTorch'
import PyTorchLightningPlayer from '@/app/(dashboard)/_components/quick-start-code/frameworks/PyTorchLightning'
import HuggingFacePlayer from '@/app/(dashboard)/_components/quick-start-code/frameworks/HuggingFace'
import UltralyticsPlayer from '@/app/(dashboard)/_components/quick-start-code/frameworks/Ultralytics'

export default function QuickStartCode({ tab }: { tab: TabKeys }) {
  const t = useTranslations('Dashboard._components.QuickStartCode')
  const tt = useTranslations('Dashboard._components.QuickStartCode.titles')
  const player = getContent(tab)
  return (
    <div className="w-full flex flex-col items-center gap-2">
      <h1 className="w-full text-center max-w-2xl text-2xl font-semibold">{t('title')}</h1>
      <p className="text-center max-w-2xl text-muted-foreground text-sm">
        {t('description')}
        <Link href="" className="text-blue-500">
          {t('migrate')}
        </Link>
        。
      </p>
      <div className="w-full flex justify-between pt-4 xl:gap-8 gap-4">
        <TabSidebar />
        <div className="w-full flex justify-between xl:gap-8 gap-4">
          <Card className="w-full border p-6 bg-card flex flex-col gap-4">
            <div className="flex items-center gap-2">
              {getIcon(tab, 5)}
              <span className="text-lg">{tt(tab)}</span>
            </div>
            {player.content}
          </Card>
          <div className="xl:w-52 w-44 border flex flex-col gap-6 shrink-0">{player.sider}</div>
        </div>
      </div>
    </div>
  )
}

function getContent(tab: string) {
  switch (tab) {
    case 'introduction':
      return IntroductionPlayer
    case 'image':
      return ImageClassificationPlayer
    case 'object':
      return ObjectDetectionPlayer
    case 'tuning':
      return FineTuningPlayer
    case 'text':
      return TextClassificationPlayer
    case 'trading':
      return QuantitativeTradingPlayer
    case 'pytorch':
      return PyTorchPlayer
    case 'lightning':
      return PyTorchLightningPlayer
    case 'huggingface':
      return HuggingFacePlayer
    case 'ultralytics':
      return UltralyticsPlayer
    default:
      return IntroductionPlayer
  }
}
