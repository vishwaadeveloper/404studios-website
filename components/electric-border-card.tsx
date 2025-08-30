import React from 'react'

interface ElectricBorderCardProps {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  badge?: string;
  color?: 'silver' | 'blue' | 'purple' | 'cyan' | 'green' | 'orange';
}

export default function ElectricBorderCard({ 
  icon, 
  title = "Silver Border", 
  description = "In case you'd like to emphasize something with metallic elegance.",
  badge = "Metallic",
  color = 'silver'
}: ElectricBorderCardProps) {
  const [isHovered, setIsHovered] = React.useState(false)
  
  // Create unique filter ID based on title to prevent cross-card interference
  const uniqueFilterId = `turbulent-displace-${title.replace(/\s+/g, '-').toLowerCase()}`
  
  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="transition-all duration-300"
    >
      <svg className="svg-container">
        <defs>
          <filter id={uniqueFilterId} colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="1" />
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise1">
              <animate attributeName="dy" values="700; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="1" />
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise2">
              <animate attributeName="dy" values="0; -700" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="2" />
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise3">
              <animate attributeName="dx" values="490; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="2" />
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise4">
              <animate attributeName="dx" values="0; -490" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feComposite in="offsetNoise1" in2="offsetNoise2" result="part1" />
            <feComposite in="offsetNoise3" in2="offsetNoise4" result="part2" />
            <feBlend in="part1" in2="part2" mode="color-dodge" result="combinedNoise" />

            <feDisplacementMap
              in="SourceGraphic"
              in2="combinedNoise"
              scale="30"
              xChannelSelector="R"
              yChannelSelector="B"
            />
          </filter>
        </defs>
      </svg>

      <div className={`card-container ${color !== 'silver' ? `electric-${color}` : ''}`}>
        <div className="inner-container">
          <div className="border-outer">
            <div 
              className="main-card"
              style={{
                filter: `url(#${uniqueFilterId})`,
                opacity: isHovered ? 1 : 0.3,
                transition: 'all 0.3s ease'
              }}
            ></div>
          </div>
          <div 
            className="glow-layer-1"
            style={{
              opacity: isHovered ? 1 : 0.2,
              transition: 'opacity 0.3s ease'
            }}
          ></div>
          <div 
            className="glow-layer-2"
            style={{
              opacity: isHovered ? 1 : 0.2,
              transition: 'opacity 0.3s ease'
            }}
          ></div>
        </div>

        <div 
          className="overlay-1"
          style={{
            opacity: isHovered ? 1 : 0.3,
            transition: 'opacity 0.3s ease'
          }}
        ></div>
        <div 
          className="overlay-2"
          style={{
            opacity: isHovered ? 1 : 0.3,
            transition: 'opacity 0.3s ease'
          }}
        ></div>
        <div 
          className="background-glow"
          style={{
            opacity: isHovered ? 1 : 0.1,
            transition: 'opacity 0.3s ease'
          }}
        ></div>

        <div className="content-container">
          <div className="content-top">
            {badge && <div className="scrollbar-glass">{badge}</div>}
            {icon && (
              <div className="rounded-full bg-primary/10 text-primary p-3 sm:p-4 w-fit border border-primary/20 mb-4" style={{ color: '#e8e8e8' }}>
                {icon}
              </div>
            )}
            <p className="title">{title}</p>
          </div>

          <hr className="divider" />

          <div className="content-bottom">
            <p className="description">{description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
