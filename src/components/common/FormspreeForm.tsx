'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button, Input, Select, useToast } from '@/components/ui'
import { submitDemoForm, type DemoFormData } from '@/lib/formspree'
import { cn } from '@/lib/utils'

const industryOptions = [
  { value: 'retail', label: 'Retail' },
  { value: 'hospitality', label: 'Hospitality' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'financial', label: 'Financial Services' },
  { value: 'airports', label: 'Airports & Transit' },
  { value: 'public-services', label: 'Public Services' },
  { value: 'other', label: 'Other' },
]

const demoFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().min(2, 'Company name required'),
  phone: z.string().optional(),
  industry: z.string().min(1, 'Please select an industry'),
  voicePreference: z.enum(['lessac', 'amy']),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

interface FormspreeFormProps {
  onSuccess?: () => void
  className?: string
}

export function FormspreeForm({ onSuccess, className }: FormspreeFormProps) {
  const { success, error } = useToast()
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DemoFormData>({
    resolver: zodResolver(demoFormSchema),
    defaultValues: {
      voicePreference: 'lessac',
    },
  })

  const onSubmit = async (data: DemoFormData) => {
    setSubmitting(true)
    try {
      const result = await submitDemoForm(data)
      if (result.ok) {
        success('Demo Request Submitted!', result.message)
        reset()
        onSuccess?.()
      } else {
        error('Submission Failed', result.message)
      }
    } catch {
      error('Error', 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn('space-y-6', className)} noValidate>
      <div className="grid gap-6 sm:grid-cols-2">
        <Input
          label="Full Name"
          placeholder="John Doe"
          error={errors.name?.message}
          {...register('name')}
        />
        <Input
          label="Email Address"
          type="email"
          placeholder="john@company.com"
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          label="Company"
          placeholder="Acme Corporation"
          error={errors.company?.message}
          {...register('company')}
        />
        <Input
          label="Phone (Optional)"
          type="tel"
          placeholder="+1 (555) 000-0000"
          {...register('phone')}
        />
      </div>

      <Select
        label="Industry"
        placeholder="Select your industry"
        error={errors.industry?.message}
        options={industryOptions}
        {...register('industry')}
      />

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-300">
          Preferred Voice for Demo
        </label>
        <div className="flex gap-4">
          {['lessac', 'amy'].map((voice) => (
            <label
              key={voice}
              className={cn(
                'flex cursor-pointer items-center gap-2 rounded-xl border-2 px-4 py-3 transition-all',
                voice === 'lessac'
                  ? 'border-holo-cyan bg-holo-cyan/10 text-holo-cyan'
                  : 'border-holo-purple bg-holo-purple/10 text-holo-purple'
              )}
            >
              <input
                type="radio"
                value={voice}
                {...register('voicePreference')}
                className="sr-only"
              />
              <span className="font-medium">
                {voice === 'lessac' ? 'Lessac (Male)' : 'Amy (Female)'}
              </span>
            </label>
          ))}
        </div>
        {errors.voicePreference && (
          <p className="mt-1.5 text-sm text-danger-500">{errors.voicePreference.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-300">
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          className={cn(
            'w-full rounded-xl border border-white/10 bg-bg-card px-4 py-3 placeholder-gray-500',
            'focus:border-holo-cyan focus:ring-holo-cyan/20 focus:outline-none focus:ring-2',
            'resize-none transition-all duration-200',
            errors.message && 'border-danger-500 focus:border-danger-500 focus:ring-danger-500/20'
          )}
          placeholder="Tell us about your use case, timeline, and any specific requirements..."
          {...register('message')}
        />
        {errors.message && (
          <p className="mt-1.5 text-sm text-danger-500">{errors.message.message}</p>
        )}
      </div>

      <Button type="submit" variant="holo" size="lg" className="w-full" loading={submitting}>
        Request Demo
      </Button>

      <p className="text-center text-sm text-gray-500">
        By submitting, you agree to our{' '}
        <a href="#" className="text-holo-cyan hover:underline">
          Privacy Policy
        </a>{' '}
        and{' '}
        <a href="#" className="text-holo-cyan hover:underline">
          Terms of Service
        </a>
      </p>
    </form>
  )
}
