import React, { ChangeEventHandler, useCallback } from 'react'
import { Input, InputProps } from 'antd'
import Decimal from 'decimal.js-light'

interface NumbericInputProps extends Omit<InputProps, 'value' | 'onChange'> {
  max?: string
  min?: string
  value?: string
  onChange?: (v: string) => void
  onBlur?: (
    event: React.FocusEvent<HTMLInputElement, Element>,
    v?: string
  ) => void
}

const numberReg = /^[0-9]+?\.?([0-9]+)?$/i

const NumbericInput: React.FC<NumbericInputProps> = ({
  max,
  min,
  onChange,
  onBlur,
  ...props
}) => {
  const { value } = props
  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      if (!onChange) return
      const v = e.target.value
      if (!v) {
        onChange(v)
        return
      }
      if (numberReg.test(v)) {
        onChange(v)
      }
    },
    [onChange]
  )

  const handleBlur = useCallback<React.FocusEventHandler<HTMLInputElement>>(
    (e) => {
      let nv = ''
      if (value && onChange) {
        nv = new Decimal(value).toString()
        if (isNaN(parseFloat(value))) {
          nv = ''
        }
        const d = new Decimal(value)
        if (max && d.gt(max)) {
          nv = new Decimal(max).toString()
        } else if (min && d.lt(min)) {
          nv = new Decimal(min).toString()
        }
        onChange(nv)
      }
      if (onBlur) onBlur(e, nv)
    },
    [onBlur, value, onChange, min, max]
  )

  return <Input {...props} onChange={handleChange} onBlur={handleBlur} />
}

export default NumbericInput
