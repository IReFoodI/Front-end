import { forwardRef } from 'react';
import { PatternFormat } from 'react-number-format';

export const PhonePatternFormat = forwardRef((props, ref) => (
  <PatternFormat 
    {...props} 
    format="(##) #####-####" 
    allowEmptyFormatting 
    mask="_" 
    getInputRef={ref}
    className="input !mt-1 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 sm:max-w-[50%]"
  />
));

// Definir o displayName para melhorar a depuração
PhonePatternFormat.displayName = 'PhonePatternFormat';


