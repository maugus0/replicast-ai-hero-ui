'use client'

import { Select } from '@/components/ui'
import { cn } from '@/lib/utils'

interface VoiceSelectorProps {
  value: 'lessac' | 'amy'
  onChange: (value: 'lessac' | 'amy') => void
  disabled?: boolean
  className?: string
}

export function VoiceSelector({ value, onChange, disabled, className }: VoiceSelectorProps) {
  const options = [
    { value: 'lessac', label: 'Lessac (Male, Clear)' },
    { value: 'amy', label: 'Amy (Female, Natural)' },
  ]

  return (
    <Select
      label="Voice"
      value={value}
      onChange={(e) => onChange(e.target.value as 'lessac' | 'amy')}
      disabled={disabled}
      options={options}
      placeholder="Select voice"
      className={cn('w-full max-w-xs', className)}
    />
  )
}
