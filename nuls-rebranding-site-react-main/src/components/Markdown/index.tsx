import React from 'react'
import classnames from 'classnames'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import './style.scss'
import rehypeExternalLinks from 'rehype-external-links'
import { uuid } from '../../utils'

interface MarkdownProps {
  text: string
  className?: string
  onHeadersChange?: (headers: MarkdownHeaderInfo[]) => void
}

// const markdown = `A paragraph with *emphasis* and **strong importance**.

// > A block quote with ~strikethrough~ and a URL: https://reactjs.org.

// * Lists
// * [ ] todo
// * [x] done

// A table:

// | a | b |
// | - | - |
// `

// function map

export interface MarkdownHeaderInfo {
  label: React.ReactNode
  level: number
  id: string
}

interface MarkdownHeaderMap {
  [key: string]: MarkdownHeaderInfo[]
}

class Markdown extends React.Component<MarkdownProps> {
  private headersMap: MarkdownHeaderMap = {}
  private version: string = uuid()

  constructor(props: MarkdownProps) {
    super(props)
    this.handleHeader = this.handleHeader.bind(this)
    this.updateVersion = this.updateVersion.bind(this)
    this.updateVersion()
  }

  private updateVersion(): void {
    const id = uuid()
    this.version = id
    this.headersMap[id] = []
  }

  shouldComponentUpdate(
    nextProps: Readonly<MarkdownProps>,
    nextState: Readonly<any>,
    nextContext: any
  ): boolean {
    if (
      this.props.text !== nextProps.text ||
      this.props.className !== nextProps.className ||
      this.props.onHeadersChange !== nextProps.onHeadersChange
    ) {
      this.updateVersion()
      return true
    }
    return false
  }

  private handleHeader(headingProps: any): React.ReactNode {
    const { node, ...props } = headingProps
    const arr = this.headersMap[this.version]
    const id = uuid()
    const level = parseInt(node.tagName.slice(1))
    arr.push({
      label: props.children,
      level: level,
      id,
    })
    if (this.props.onHeadersChange) {
      this.props.onHeadersChange(arr)
    }
    if (level === 1) {
      return <h1 {...props} id={id} />
    } else if (level === 2) {
      return <h2 {...props} id={id} />
    } else if (level === 3) {
      return <h3 {...props} id={id} />
    } else if (level === 4) {
      return <h4 {...props} id={id} />
    } else if (level === 5) {
      return <h5 {...props} id={id} />
    }
    return <h6 {...props} id={id} />
  }

  render(): React.ReactNode {
    const { className, text } = this.props

    // console.log(text)

    return (
      <ReactMarkdown
        // linkTarget="_blank"
        className={classnames('markdown-render-area', className)}
        remarkPlugins={[remarkGfm, [rehypeExternalLinks, { target: '_blank' }]]}
        components={{
          h1: this.handleHeader as any,
          h2: this.handleHeader as any,
          h3: this.handleHeader as any,
          h4: this.handleHeader as any,
          h5: this.handleHeader as any,
          h6: this.handleHeader as any,
        }}
      >
        {text}
      </ReactMarkdown>
    )
  }
}

// const Markdown: React.FC<MarkdownProps> = ({ text, className }) => {
//   const headersMap = useRef<MarkdownHeaderMap>({})
//   const version = useMemo(() => {
//     return new Date().getTime()
//   }, [text])

//   const handleHeader: any = (headingProps: HeadingProps): React.ReactNode => {
//     const { level, node, ...props } = headingProps
//     if (!headersMap.current[version]) {
//       headersMap.current[version] = []
//     }
//     const arr = headersMap.current[version]
//     const id = uuid()
//     arr.push({
//       label: props.children,
//       level: level,
//       id,
//     })
//     console.log(node)
//     if (level === 1) {
//       return <h1 {...props} id={id} />
//     } else if (level === 2) {
//       return <h2 {...props} id={id} />
//     } else if (level === 3) {
//       return <h3 {...props} id={id} />
//     } else if (level === 4) {
//       return <h4 {...props} id={id} />
//     } else if (level === 5) {
//       return <h5 {...props} id={id} />
//     }
//     return <h6 {...props} id={id} />
//   }

//   return (
//     <ReactMarkdown
//       className={classnames('markdown-render-area', className)}
//       remarkPlugins={[remarkGfm]}
//       components={{
//         h1: handleHeader,
//         h2: handleHeader,
//         h3: handleHeader,
//         h4: handleHeader,
//         h5: handleHeader,
//         h6: handleHeader,
//       }}
//     >
//       {text}
//     </ReactMarkdown>
//   )
// }

export default Markdown
