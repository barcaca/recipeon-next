import { ErrorTooltip } from '@/components/error-tooltip'
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useFormContext } from 'react-hook-form'

interface InputTextProps {
  label: string
  name: string
  placeholder?: string
  icon?: React.ComponentType<{ className?: string }>
  type?: string
}

export function InputText({
  name,
  label,
  type = 'text',
  placeholder,
  icon: IconComponent,
}: InputTextProps) {
  const { control } = useFormContext()

  return (
    <FormField
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormItem className="relative">
          <FormLabel className="flex items-center gap-2">
            {IconComponent && <IconComponent className="h-4 w-4 flex-none" />}
            {label}
          </FormLabel>
          <FormControl>
            {type === 'textarea' ? (
              <Textarea rows={5} className="resize-none" placeholder={placeholder} {...field} />
            ) : (
              <Input
                className={type === 'number' ? 'appearance-none' : ''}
                type={type}
                placeholder={placeholder}
                {...field}
              />
            )}
          </FormControl>
          <ErrorTooltip fieldState={fieldState} />
        </FormItem>
      )}
    />
  )
}
