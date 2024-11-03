import ContentLayout from '@/components/layouts/content'
import AppHeader from '@/components/AppHeader'
import { Card } from '@/components/ui/card'

export default function HomepageLayout({ children }: LayoutProps) {
  return (
    <>
      <AppHeader />
      <div className="min-h-[calc(100dvh-52px)] flex flex-col">
        <ContentLayout>
          <div className="flex justify-center">
            <Card className="max-w-2xl w-full px-16 py-7">{children}</Card>
          </div>
        </ContentLayout>
      </div>
    </>
  )
}
