import { forwardRef, useCallback, useState } from 'react'

import clsx from 'clsx'

import getDefaultId from '@/utils/get-default-id'

import styles from './input.module.css'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  hasError?: boolean
  supportText?: string
  prefixNode?: React.ReactNode
  suffixNode?: React.ReactNode
  containerStyle?: React.CSSProperties
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id = `input-${getDefaultId()}`,
      className,
      disabled,
      label,
      hasError,
      supportText,
      prefixNode,
      suffixNode,
      containerStyle,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const hasLabel = Boolean(label)
    const hasPrefix = Boolean(prefixNode)

    const [isFocused, setIsFocused] = useState(false)

    const handleFocus = useCallback(
      e => {
        setIsFocused(true)
        if (onFocus) onFocus(e)
      },
      [onFocus]
    )

    const handleBlur = useCallback(
      e => {
        setIsFocused(false)
        if (onBlur) onBlur(e)
      },
      [onBlur]
    )

    return (
      <div
        className={clsx(styles.input, {
          [styles.input_disabled]: disabled,
          [styles.input_focused]: isFocused,
          [styles['input_has-error']]: hasError,
          [styles['input_has-prefix']]: hasPrefix,
          [styles['input_has-label']]: hasLabel,
        })}
        style={containerStyle}
      >
        <div className={styles.input__container}>
          {prefixNode && (
            <span className={styles.input__prefix}>{prefixNode}</span>
          )}
          <input
            {...props}
            ref={ref}
            id={id}
            className={clsx(styles.input__input, className)}
            disabled={disabled}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {label && (
            <label
              id={`${id}-label`}
              htmlFor={id}
              className={styles.input__label}
            >
              {label}
            </label>
          )}
          {suffixNode && (
            <span className={styles.input__suffix}>{suffixNode}</span>
          )}
        </div>
        {supportText && (
          <p className={styles['input__support-text']}>{supportText}</p>
        )}
      </div>
    )
  }
)

export default Input
