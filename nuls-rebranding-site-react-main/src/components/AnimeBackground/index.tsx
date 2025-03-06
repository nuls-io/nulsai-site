import React, { PropsWithChildren } from 'react'
import './style.scss'
import loadscene from './load'

class AnimeBackground extends React.Component {
  private ref: HTMLCanvasElement | null = null
  private destory: (() => void) | null = null

  componentDidMount(): void {
    if (!this.ref) return
    this.destory = loadscene(this.ref)
  }

  shouldComponentUpdate(): boolean {
    return false
  }

  componentWillUnmount(): void {
    if (this.destory) this.destory()
  }

  render(): React.ReactNode {
    return (
      <div id="animebg">
        <canvas ref={(dom) => (this.ref = dom)}></canvas>
      </div>
    )
  }
}

export default AnimeBackground
