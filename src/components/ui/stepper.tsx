import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export type Step = {
  title: string;
  description?: string;
};

type StepperProps = {
  steps: Step[];
  currentStep: number;
  onStepClick?: (step: number) => void;
};

export function Stepper({ steps, currentStep, onStepClick }: StepperProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = currentStep === stepNumber;
          const isCompleted = currentStep > stepNumber;
          const isClickable = onStepClick && (isCompleted || isActive);

          return (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center flex-1">
                <button
                  onClick={() => isClickable && onStepClick?.(stepNumber)}
                  disabled={!isClickable}
                  className={cn(
                    'flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors',
                    isCompleted && 'bg-primary border-primary text-primary-foreground',
                    isActive && 'border-primary text-primary bg-primary/10',
                    !isActive && !isCompleted && 'border-gray-300 text-gray-400',
                    isClickable && 'cursor-pointer hover:border-primary/60'
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-semibold">{stepNumber}</span>
                  )}
                </button>
                <div className="mt-2 text-center">
                  <p className={cn(
                    'text-sm font-medium',
                    isActive ? 'text-foreground' : 'text-muted-foreground'
                  )}>
                    {step.title}
                  </p>
                  {step.description && (
                    <p className="text-xs text-muted-foreground mt-1 min-w-[100px]">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>

              {index < steps.length - 1 && (
                <div className="flex-1 h-[2px] bg-gray-200 mx-2 mb-8">
                  <div
                    className={cn(
                      'h-full transition-all duration-300',
                      currentStep > stepNumber ? 'bg-primary' : 'bg-transparent'
                    )}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
