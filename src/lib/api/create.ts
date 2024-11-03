import http from '@/lib/ajax'

interface FormData {
  name: string
  username: string
  email: string
  institution?: string
  location?: string
}

/**
 * 创建组织
 * @param {FormData} formData 其中字段均不为 undefined、null，由于 useForm 的问题，可选项 institution、location 默认值为 ''
 */
export async function createTeam(formData: FormData) {
  const body = {
    name: formData.name,
    username: formData.username,
    profile: {
      email: formData.email,
      institution: formData.institution || undefined, // institution 默认为 '' 时不传递
      location: formData.location || undefined // location 默认为 '' 时不传递
    }
  }
  await http.post('/group', body)
}
