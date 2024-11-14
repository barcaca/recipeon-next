import { FormMessage } from '@/components/ui/form'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { AlertCircleIcon } from 'lucide-react'
import type { ControllerFieldState } from 'react-hook-form'

interface ErrorTooltipProps {
  fieldState: ControllerFieldState
  side?: 'top' | 'right' | 'bottom' | 'left'
}

export function ErrorTooltip({ fieldState, side = 'right' }: ErrorTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        {fieldState.error && (
          <TooltipTrigger
            className={`${side === 'left' ? 'left-2' : 'right-2'} -top-1 absolute z-20 text-destructive`}
          >
            <AlertCircleIcon size={16} />
          </TooltipTrigger>
        )}
        <TooltipContent className="border border-border bg-popover shadow-shape">
          <FormMessage />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
