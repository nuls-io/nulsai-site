import React, { PropsWithChildren, useEffect, useMemo, useState } from 'react'
import System from '../../store/system'
import './style.scss'
import logoBg from '../../assets/videos/v2/logo-bg.mp4'
import logoBg2 from '../../assets/videos/v2/logo-bg-2.mp4'
import logoBg3 from '../../assets/videos/v2/logo-bg-3.mp4'
import logoBg4 from '../../assets/videos/v2/logo-bg-4.mp4'
import { useLocation } from 'react-router-dom'

interface LogoSVGProps {
  small?: boolean
  anime?: Anime
  noVideo?: boolean
}

interface Anime {
  className: string
  src: string
  translate: string
}

const animes: Anime[] = [
  {
    className: 'logo-anime-1',
    src: logoBg,
    translate: 'translate(0px, -230px)',
  },
  {
    className: 'logo-anime-2',
    src: logoBg2,
    translate: 'translate(0px, -150px)',
  },
  {
    className: 'logo-anime-3',
    src: logoBg3,
    translate: 'translate(0px, -150px)',
  },
  {
    className: 'logo-anime-4',
    src: logoBg4,
    translate: 'translate(0px, -150px)',
  },
]

const LogoPureSVG: React.FC<LogoSVGProps> = ({ small, noVideo = false }) => {
  const { darkTheme } = System.useContainer()
  const textColor = useMemo(() => {
    return darkTheme ? '#ddffdc' : '#000'
  }, [darkTheme])

  const logoColor = useMemo(() => {
    // A8D5FF
    return '#000'
    // return 'url(#svgp-static)'
  }, [])

  const logoIconColor = useMemo(() => {
    if (noVideo && !small) return '#000'
    return '#A8D5FF'
  }, [noVideo, small])

  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 2206.6 349"
      xmlSpace="preserve"
      className="body"
    >
      <g className="real" style={{ opacity: small || noVideo ? 1 : 0 }}>
        <rect x="255.5" width="92.9" height="92.9" fill={logoIconColor} />
        <path
          fill={logoIconColor}
          d="M263.5,212L100.8,0H0v349h92.9V147.4l109.2,140.3c51.4,65.7,146.3,61.3,146.3,61.3v-94.9c-47.4-0.5-85-42-85-42
        L263.5,212z"
        />
        <polygon
          fill={textColor}
          points="654.8,33.1 654.8,181.4 660.7,190 654.8,190 548,33.1 466.2,33.1 466.2,316.7 548.6,316.7 548.6,169.3 
        542.1,159.7 548,159.7 638.3,292.4 654.8,316.7 737.4,316.7 737.4,33.1 "
          className="n"
        />
        <g className="uls" fill={textColor}>
          <path
            d="M978.5,33.1h87.1v168.5c0,16.7-2.6,32.4-7.9,47.3c-5.2,14.8-13.3,27.9-24.5,38.9c-11.1,11.1-22.7,18.9-35,23.5
          c-17,6.4-37.4,9.4-61.2,9.4s-28.8-0.9-45-2.9c-16.2-2-29.8-5.8-40.8-11.5c-10.9-5.8-20.9-13.8-30-24.4s-15.3-21.4-18.6-32.6
          c-5.5-18-8-33.9-8-47.7V33.1h87.1v172.4c0,15.5,4.2,27.4,12.9,36.1c8.5,8.6,20.5,13,35.6,13s26.8-4.2,35.5-12.9
          c8.5-8.5,12.9-20.6,12.9-36.4V32.9V33.1z"
          />
          <path
            d="M1371.7,222.1l83.2-5.2c1.8,13.5,5.5,23.8,11.1,30.9c8.9,11.5,21.8,17.1,38.6,17.1s22.1-2.9,28.8-8.8
          c6.8-5.9,10.2-12.6,10.2-20.3s-3.2-13.9-9.7-19.7c-6.4-5.8-21.4-11.2-44.7-16.4c-38.3-8.6-65.6-20-82-34.4
          c-16.5-14.2-24.7-32.4-24.7-54.5s4.2-28.2,12.6-41.2c8.5-12.9,21.1-23,38-30.5s40.1-11.1,69.5-11.1c29.4,0,63.6,6.7,82.6,20.1
          c18.9,13.5,30.3,34.8,33.8,64.1l-82.4,4.8c-2.1-12.7-6.8-22-13.8-27.7s-16.7-8.6-29.1-8.6c-12.4,0-17.9,2.1-22.9,6.5
          c-5.2,4.2-7.7,9.5-7.7,15.8s2.1,8.5,6.4,12.1c4.1,3.8,13.9,7.3,29.2,10.5c38.2,8.2,65.6,16.5,82.1,25c16.5,8.5,28.5,18.9,36.1,31.4
          s11.2,26.4,11.2,41.8s-5,34.8-15,50.1s-24.1,27-42.1,34.8c-18,7.9-40.8,11.8-68,11.8c-48,0-81.4-9.2-99.8-27.7
          c-18.5-18.5-28.9-42.1-31.4-70.6L1371.7,222.1z"
          />
          <polygon points="1216.7,246.1 1216.7,256.7 1210.9,256.7 1210.9,246.1 1210.9,246.1 1210.9,33.1 1123.5,33.1 1123.5,315.8 1347.3,315.8 1347.3,246.1" />
        </g>
        <g className="ai" fill={textColor}>
          <rect x="2114.9" y="33.4" width="74.5" height="283.5" />
          <rect x="2195.4" y="33.4" width="7.4" height="283.5" />
          <polygon
            points="1977.1,33.4 1881.5,33.4 1774.8,316.8 1864.3,316.8 1878.1,270 1878.6,270 1897.2,208.7 1897.2,208.7 
          1928.1,106.9 1934,106.9 1931.2,116.4 1959.5,208.7 1903,208.7 1884.5,270 1977.7,270 1991.8,316.8 2083.6,316.8 "
          />
        </g>
      </g>
    </svg>
  )
}

const LogoSVG: React.FC<LogoSVGProps> = ({
  small = false,
  anime = animes[0],
}) => {
  return (
    <div className="logo-svg">
      <div className="video-container">
        <video
          autoPlay
          loop
          muted
          controlsList="nodownload"
          style={{
            // bg1
            // transform: 'translate(0px, -620px)',
            transform: anime.translate,
          }}
        >
          <source src={anime.src} type="video/mp4" />
        </video>
      </div>

      <svg
        width="0"
        height="0"
        viewBox="0 0 2206.6 349"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <clipPath id="svgTextPath" clipPathUnits="objectBoundingBox">
          <rect
            transform="scale(0.0004531858968548899, 0.0028653295128939827)"
            x="255.5"
            width="92.9"
            height="92.9"
          />
          <path
            transform="scale(0.0004531858968548899, 0.0028653295128939827)"
            d="M263.5,212L100.8,0H0v349h92.9V147.4l109.2,140.3c51.4,65.7,146.3,61.3,146.3,61.3v-94.9c-47.4-0.5-85-42-85-42
          L263.5,212z"
          />
          <polygon
            transform="scale(0.0004531858968548899, 0.0028653295128939827)"
            points="654.8,33.1 654.8,181.4 660.7,190 654.8,190 548,33.1 466.2,33.1 466.2,316.7 548.6,316.7 548.6,169.3 
          542.1,159.7 548,159.7 638.3,292.4 654.8,316.7 737.4,316.7 737.4,33.1 "
            className="n"
          />
          <path
            transform="scale(0.0004531858968548899, 0.0028653295128939827)"
            d="M978.5,33.1h87.1v168.5c0,16.7-2.6,32.4-7.9,47.3c-5.2,14.8-13.3,27.9-24.5,38.9c-11.1,11.1-22.7,18.9-35,23.5
          c-17,6.4-37.4,9.4-61.2,9.4s-28.8-0.9-45-2.9c-16.2-2-29.8-5.8-40.8-11.5c-10.9-5.8-20.9-13.8-30-24.4s-15.3-21.4-18.6-32.6
          c-5.5-18-8-33.9-8-47.7V33.1h87.1v172.4c0,15.5,4.2,27.4,12.9,36.1c8.5,8.6,20.5,13,35.6,13s26.8-4.2,35.5-12.9
          c8.5-8.5,12.9-20.6,12.9-36.4V32.9V33.1z"
          />
          <path
            transform="scale(0.0004531858968548899, 0.0028653295128939827)"
            d="M1371.7,222.1l83.2-5.2c1.8,13.5,5.5,23.8,11.1,30.9c8.9,11.5,21.8,17.1,38.6,17.1s22.1-2.9,28.8-8.8
          c6.8-5.9,10.2-12.6,10.2-20.3s-3.2-13.9-9.7-19.7c-6.4-5.8-21.4-11.2-44.7-16.4c-38.3-8.6-65.6-20-82-34.4
          c-16.5-14.2-24.7-32.4-24.7-54.5s4.2-28.2,12.6-41.2c8.5-12.9,21.1-23,38-30.5s40.1-11.1,69.5-11.1c29.4,0,63.6,6.7,82.6,20.1
          c18.9,13.5,30.3,34.8,33.8,64.1l-82.4,4.8c-2.1-12.7-6.8-22-13.8-27.7s-16.7-8.6-29.1-8.6c-12.4,0-17.9,2.1-22.9,6.5
          c-5.2,4.2-7.7,9.5-7.7,15.8s2.1,8.5,6.4,12.1c4.1,3.8,13.9,7.3,29.2,10.5c38.2,8.2,65.6,16.5,82.1,25c16.5,8.5,28.5,18.9,36.1,31.4
          s11.2,26.4,11.2,41.8s-5,34.8-15,50.1s-24.1,27-42.1,34.8c-18,7.9-40.8,11.8-68,11.8c-48,0-81.4-9.2-99.8-27.7
          c-18.5-18.5-28.9-42.1-31.4-70.6L1371.7,222.1z"
          />
          <polygon
            transform="scale(0.0004531858968548899, 0.0028653295128939827)"
            points="1216.7,246.1 1216.7,256.7 1210.9,256.7 1210.9,246.1 1210.9,246.1 1210.9,33.1 1123.5,33.1 1123.5,315.8 1347.3,315.8 1347.3,246.1"
          />
          <rect
            transform="scale(0.0004531858968548899, 0.0028653295128939827)"
            x="2114.9"
            y="33.4"
            width="74.5"
            height="283.5"
          />
          <rect
            transform="scale(0.0004531858968548899, 0.0028653295128939827)"
            x="2195.4"
            y="33.4"
            width="7.4"
            height="283.5"
          />
          <polygon
            transform="scale(0.0004531858968548899, 0.0028653295128939827)"
            points="1977.1,33.4 1881.5,33.4 1774.8,316.8 1864.3,316.8 1878.1,270 1878.6,270 1897.2,208.7 1897.2,208.7 
          1928.1,106.9 1934,106.9 1931.2,116.4 1959.5,208.7 1903,208.7 1884.5,270 1977.7,270 1991.8,316.8 2083.6,316.8 "
          />
        </clipPath>
      </svg>

      <LogoPureSVG small={small} />
    </div>
  )
}

const LogoSVG1: React.FC<LogoSVGProps> = ({ small }) => {
  return <LogoSVG small={small} anime={animes[0]} />
}

const LogoSVG2: React.FC<LogoSVGProps> = ({ small }) => {
  return <LogoSVG small={small} anime={animes[1]} />
}

const LogoSVG3: React.FC<LogoSVGProps> = ({ small }) => {
  return <LogoSVG small={small} anime={animes[2]} />
}

const LogoSVG4: React.FC<LogoSVGProps> = ({ small }) => {
  return <LogoSVG small={small} anime={animes[3]} />
}

const WrappedLogoSVG: React.FC<LogoSVGProps> = ({ small, noVideo = false }) => {
  const [index, setIndex] = useState(3)
  const location = useLocation()

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * animes.length)
    setIndex(randomIndex)
  }, [location])

  if (noVideo)
    return (
      <div className="logo-svg">
        <LogoPureSVG small={small} noVideo={noVideo} />
      </div>
    )

  if (index === 0) return <LogoSVG1 small={small} />
  else if (index === 1) return <LogoSVG2 small={small} />
  else if (index === 2) return <LogoSVG3 small={small} />
  else if (index === 3) return <LogoSVG4 small={small} />

  return <LogoSVG small={small} anime={animes[index]} />
}

export default WrappedLogoSVG
