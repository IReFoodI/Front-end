import { forwardRef } from 'react';
import { PatternFormat } from 'react-number-format';

export const CepPatternFormat = forwardRef((props, ref) => (
    <PatternFormat
    format="#####-###"
    allowEmptyFormatting
    mask="_"
    getInputRef={ref}
    className={`h-12 w-full rounded-md border-2 border-input p-4 
      [&::-webkit-inner-spin-button]:appearance-none 
      [&::-webkit-outer-spin-button]:appearance-none`}
    {...props}
  />
));

CepPatternFormat.displayName = 'CepPatternFormat';