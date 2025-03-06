import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
} from 'react'
import councillors from './councillors.json'
import { useAnimate } from 'motion/react'
import { StickyAnchor, StickyCommonButton } from '../../components/StickyCursor'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { cdnFile, sleep } from '../../utils'
import System from '../../store/system'
import CommonGrid from '../../components/CommonGrid'

interface CouncillorData {
  type: string
  name: string
  image: string
}

interface CouncillorIndexData extends CouncillorData {
  index: number
}

const PAGE_CONTENT_WIDTH = 1400
const MAIN_PAD_WIDTH = 600
const SUB_PAD_WIDTH = 300
const RIGHT_CONTENT_PADDING = 40

// left | content(1400)                                | right
//      | ... MAIN_PAD_WIDTH ... RIGHT_CONTENT_PADDING |

const COUNT = councillors.length

interface Layout {
  leftPadding: number
  rightPadding: number
  leftCount: number
  rightCount: number
  leftAnchor: number
  rightAnchor: number
}

function getLayout(): Layout {
  const ww = window.innerWidth
  const halfOutwidth = (ww - PAGE_CONTENT_WIDTH) / 2
  const leftPadding =
    halfOutwidth + PAGE_CONTENT_WIDTH - RIGHT_CONTENT_PADDING - MAIN_PAD_WIDTH
  const rightPadding = halfOutwidth + RIGHT_CONTENT_PADDING
  const leftCount = Math.ceil(leftPadding / SUB_PAD_WIDTH) + 2
  const rightCount = Math.ceil(rightPadding / SUB_PAD_WIDTH) + 2

  const leftAnchor = PAGE_CONTENT_WIDTH - MAIN_PAD_WIDTH - RIGHT_CONTENT_PADDING
  const rightAnchor = PAGE_CONTENT_WIDTH - RIGHT_CONTENT_PADDING

  return {
    leftPadding,
    rightPadding,
    leftCount,
    rightCount,
    leftAnchor,
    rightAnchor,
  }
}

function getNode(index: number): CouncillorIndexData {
  // 处理负数索引和超出范围的索引
  const adjustedIndex =
    ((index % councillors.length) + councillors.length) % councillors.length

  return {
    ...councillors[adjustedIndex],
    index,
  }
}

const cssurl = (file: string) => `url(${cdnFile(file)})`

const Councillors: React.FC = () => {
  const [layout, setLayout] = React.useState(getLayout())
  const [current, setCurrent] = React.useState(0)
  const [scope, animate] = useAnimate()
  const [animating, setAnimating] = React.useState(false)

  // const currentNode = useMemo(() => {
  //   return councillors[current]
  // }, [current])

  const leftNodes = useMemo(() => {
    const startIndex = current - layout.leftCount - 2
    const endIndex = current
    const length = endIndex - startIndex + 1
    // console.log(startIndex, endIndex)
    const nodes: CouncillorIndexData[] = []
    for (let i = 0; i < length; i++) {
      const index = startIndex + i
      nodes.push(getNode(index))
    }
    return nodes.reverse()
  }, [current, layout.leftCount])

  const rightNodes = useMemo(() => {
    const startIndex = current
    const endIndex = current + layout.rightCount + 2
    const length = endIndex - startIndex + 1
    const nodes: CouncillorIndexData[] = []
    for (let i = 0; i < length; i++) {
      const index = startIndex + i
      nodes.push(getNode(index))
    }
    return nodes
  }, [current, layout.rightCount])

  const centerNodes = useMemo(() => {
    const startIndex = current - 1
    const endIndex = current + 1
    const length = endIndex - startIndex + 1
    const nodes: CouncillorIndexData[] = []
    for (let i = 0; i < length; i++) {
      const index = startIndex + i
      nodes.push(getNode(index))
    }
    return nodes.reverse()
  }, [current])

  const resetPads = useCallback(() => {
    const dom = scope.current as HTMLDivElement
    ;(
      dom.querySelector('.left') as HTMLDivElement
    ).style.left = `${layout.leftAnchor}px`
    ;(
      dom.querySelector('.right') as HTMLDivElement
    ).style.left = `${layout.rightAnchor}px`
  }, [])

  const resetCenter = useCallback(() => {
    const dom = scope.current as HTMLDivElement
    ;(
      dom.querySelector('.center .i0') as HTMLDivElement
    ).style.width = `${100}%`
    ;(
      dom.querySelector('.center .i1') as HTMLDivElement
    ).style.width = `${100}%`
    ;(dom.querySelector('.center .i2') as HTMLDivElement).style.width = `${0}%`
  }, [])

  useEffect(() => {
    resetPads()
    resetCenter()
  }, [])

  const handleMove = useCallback(
    (direction: 1 | -1) => {
      if (animating) return
      setAnimating(true)
      const newCurrent = current + direction
      animate([
        [
          '.left',
          {
            left: [
              layout.leftAnchor - SUB_PAD_WIDTH * current,
              layout.leftAnchor - SUB_PAD_WIDTH * newCurrent,
            ],
          },
        ],
        [
          '.right',
          {
            left: [
              layout.rightAnchor - SUB_PAD_WIDTH * current,
              layout.rightAnchor - SUB_PAD_WIDTH * newCurrent,
            ],
          },
          { at: 0 },
        ],
        direction === 1
          ? ['.center .i1', { width: ['100%', '0%'] }, { at: 0 }]
          : ['.center .i2', { width: ['0%', '100%'] }, { at: 0 }],
      ])
        .then(async () => {
          // resetPads()
          await sleep(50)
          setCurrent(current + direction)
          resetCenter()
        })
        .finally(() => {
          setAnimating(false)
        })
    },
    [animate, current, animating]
  )

  return (
    <div className="councillors" ref={scope}>
      <div className="left">
        {leftNodes.map((node, index) => (
          <div
            className="pad"
            key={index}
            style={{ left: SUB_PAD_WIDTH * node.index, width: SUB_PAD_WIDTH }}
          >
            <div
              className="content"
              style={{ backgroundImage: cssurl(node.image) }}
            >
              {/* <div className="type">{node.type}</div> */}
              <div className="name">{node.name}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="center" style={{ left: layout.leftAnchor }}>
        <StickyAnchor className="left-arrow" onClick={() => handleMove(1)}>
          <ArrowLeftOutlined />
        </StickyAnchor>
        <div className="pads" style={{ width: MAIN_PAD_WIDTH }}>
          {centerNodes.map((node, index) => (
            <div className={`pad i${index}`} key={index}>
              <div
                className="content"
                style={{
                  backgroundImage: cssurl(node.image),
                  width: MAIN_PAD_WIDTH,
                }}
              >
                <div className="name">{node.name}</div>
                <div className="type">{node.type}</div>
              </div>
            </div>
          ))}
        </div>
        <StickyAnchor className="right-arrow" onClick={() => handleMove(-1)}>
          <ArrowRightOutlined />
        </StickyAnchor>
      </div>

      <div className="right">
        {rightNodes.map((node, index) => (
          <div
            className="pad"
            key={index}
            style={{
              left: SUB_PAD_WIDTH * (node.index - 1),
              width: SUB_PAD_WIDTH,
            }}
          >
            <div
              className="content"
              style={{
                backgroundImage: cssurl(node.image),
              }}
            >
              {/* <div className="type">{node.type}</div> */}
              <div className="name">{node.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const MobileCouncillors: React.FC = () => {
  return (
    <CommonGrid
      className="councillors-grid"
      data={councillors}
      renderItemContent={(item: CouncillorData) => (
        <div className="content">
          <div className="logo">
            <img src={cdnFile(item.image)} alt="" />
          </div>
          <div className="name">{item.name}</div>
          <div className="type">{item.type}</div>
        </div>
      )}
      columes={2}
    />
  )
}

const WrappedCouncillors: React.FC = () => {
  const { isMobile } = System.useContainer()

  if (isMobile) return <MobileCouncillors />

  return <Councillors />
}

export default WrappedCouncillors
