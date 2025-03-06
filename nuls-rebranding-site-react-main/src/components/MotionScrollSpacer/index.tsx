import React, { forwardRef, PropsWithChildren, useEffect } from 'react'
import styled from 'styled-components'
import classnames from 'classnames'

const Spacer = styled.div`
  position: relative;
  height: 0;
  z-index: 9999;
  pointer-events: none;

  & > div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }

  &.debug {
    outline: red solid 1px;

    & > div {
      background-color: rgba(255, 0, 0, 0.2);
    }
  }
`

interface MotionScrollSpacerProps {
  debug?: boolean
  target?: React.RefObject<HTMLDivElement>
  spacerHeight?: number
  id?: string
}

const MotionScrollSpacer = forwardRef<HTMLDivElement, MotionScrollSpacerProps>(
  (props, ref) => {
    const { debug, target, spacerHeight, id } = props
    const [height, setHeight] = React.useState<number | undefined>(undefined)

    useEffect(() => {
      if (target?.current) {
        setHeight(target.current.offsetHeight)
      }
    }, [])

    return (
      <Spacer
        className={classnames('spacer', { debug })}
        style={{ height: spacerHeight }}
      >
        <div style={{ height }} ref={ref} id={id} />
      </Spacer>
    )
  }
)

export default MotionScrollSpacer
