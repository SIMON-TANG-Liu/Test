import { useTranslations } from 'next-intl'
import moment from 'moment/moment'

// 对moment的封装，函数逻辑复用
export function createMt(t: ReturnType<typeof useTranslations>) {
  return function mt(timeStr: string) {
    const currentTime = moment()
    const inputMoment = moment(timeStr)
    const diffInMilliseconds = Math.abs(currentTime.diff(inputMoment))
    const duration = moment.duration(diffInMilliseconds)
    if (duration.asMinutes() < 1) {
      return t('justNow')
    } else if (duration.asDays() >= 1) {
      return t('day', { value: Math.floor(duration.asDays()) })
    } else if (duration.asHours() >= 1) {
      return t('hour', { value: Math.floor(duration.asHours()) })
    } else {
      return t('minute', { value: Math.floor(duration.asMinutes()) })
    }
  }
}

export function useMoment() {
  const t = useTranslations('hooks.use-time.ago')
  return {
    mt: createMt(t)
  }
}
