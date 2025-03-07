import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'
import classnames from 'classnames'

const CommonButtonContainer = styled.button`
  padding: 6px 18px;
  font-size: 16px;
  line-height: 20px;
  border: #000 solid 1px;
  border-radius: 4px;
  background-color: transparent;
  color: #000;
  cursor: pointer;
  transition: all ease 0.3s;

  &.size-large {
    font-size: 18px;
    line-height: 22px;
    padding: 11px 36px;
    border-radius: 8px;
  }

  &.size-small {
    font-size: 14px;
    line-height: 16px;
    padding: 6px 12px;
    border-radius: 6px;
  }

  &:hover {
    background-color: #000;
    color: #fff;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  &.dark {
    border-color: #fff;
    color: #fff;

    &:hover {
      background-color: #fff;
      color: #000;
    }
  }
  &.round {
    border-radius: 52px;
  }

  &.solid {
    background-color: #000;
    color: #fff;

    &.dark {
      background-color: #fff;
      color: #000;
    }
  }

  @media screen and (max-width: 600px) {
    &.size-large {
      font-size: 16px;
      line-height: 20px;
      padding: 8px 24px;
    }
  }
`

export interface ButtonProps {
  isLoading?: boolean
  type?: 'default' | 'primary' | 'black'
  size?: 'small' | 'normal' | 'large'
  round?: boolean
  dark?: boolean
  solid?: boolean
}

export type CommonButtonProps = ButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>

const CommonButton: React.FC<CommonButtonProps> = ({
  children,
  className,
  size = 'normal',
  disabled,
  dark,
  round = true,
  solid = true,
  ...rest
}) => {
  return (
    <CommonButtonContainer
      className={classnames(className, `size-${size}`, {
        disabled,
        dark,
        round,
        solid,
      })}
      disabled={disabled}
      {...rest}
    >
      {children}
    </CommonButtonContainer>
  )
}

export default CommonButton
