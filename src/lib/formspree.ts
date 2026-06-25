import { siteConfig } from '@/content/siteConfig'

export interface DemoFormData {
  name: string
  email: string
  company: string
  phone?: string
  industry: string
  voicePreference: 'lessac' | 'amy'
  message: string
}

export interface FormspreeResponse {
  ok: boolean
  message?: string
  errors?: Record<string, string[]>
}

export async function submitDemoForm(data: DemoFormData): Promise<FormspreeResponse> {
  const endpoint = siteConfig.formspreeEndpoint

  if (!endpoint || endpoint.includes('YOUR_FORM_ID')) {
    console.warn('Formspree endpoint not configured, simulating success')
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return {
      ok: true,
      message: 'Demo request submitted! (Demo mode - configure Formspree endpoint)',
    }
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    })

    const result = await response.json()

    if (!response.ok) {
      return {
        ok: false,
        message: result.error || 'Submission failed',
        errors: result.errors,
      }
    }

    return { ok: true, message: 'Demo request submitted successfully!' }
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : 'Network error',
    }
  }
}
