'use client'

import React from 'react'

export function ElectricCardStyles() {
  return (
    <>
      <style jsx global>{`
        /* Reset and base styles */

        /* CSS Variables */
        :root {
          --electric-border-color: #c0c0c0;
          --electric-light-color: oklch(from var(--electric-border-color) l c h);
          --gradient-color: oklch(from var(--electric-border-color) 0.3 calc(c / 2) h / 0.4);
          --color-neutral-900: oklch(0.185 0 0);
          --silver-bright: #e8e8e8;
          --silver-medium: #a8a8a8;
          --silver-dark: #808080;
          
          /* Color Variants */
          --electric-blue: #00d4ff;
          --electric-blue-bright: #4de3ff;
          --electric-blue-medium: #00b8e6;
          --electric-blue-dark: #0099cc;
          
          --electric-purple: #a855f7;
          --electric-purple-bright: #c084fc;
          --electric-purple-medium: #9333ea;
          --electric-purple-dark: #7c3aed;
          
          --electric-cyan: #06b6d4;
          --electric-cyan-bright: #22d3ee;
          --electric-cyan-medium: #0891b2;
          --electric-cyan-dark: #0e7490;
          
          --electric-green: #10b981;
          --electric-green-bright: #34d399;
          --electric-green-medium: #059669;
          --electric-green-dark: #047857;
          
          --electric-orange: #f59e0b;
          --electric-orange-bright: #fbbf24;
          --electric-orange-medium: #d97706;
          --electric-orange-dark: #b45309;
        }

        /* SVG positioning */
        .svg-container {
          position: absolute;
        }

        /* Card container */
        .card-container {
          padding: 2px;
          border-radius: 24px;
          position: relative;
          background: linear-gradient(-30deg, var(--gradient-color), transparent, var(--gradient-color)),
            linear-gradient(to bottom, var(--color-neutral-900), var(--color-neutral-900));
        }

        /* Inner container */
        .inner-container {
          position: relative;
        }

        /* Border layers */
        .border-outer {
          border: 2px solid rgba(192, 192, 192, 0.5);
          border-radius: 24px;
          padding-right: 4px;
          padding-bottom: 4px;
        }

        .main-card {
          width: 100%;
          min-height: 350px;
          height: 100%;
          border-radius: 24px;
          border: 2px solid var(--electric-border-color);
          margin-top: -4px;
          margin-left: -4px;
          filter: url(#turbulent-displace);
        }

        /* Glow effects */
        .glow-layer-1 {
          border: 2px solid rgba(192, 192, 192, 0.6);
          border-radius: 24px;
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          filter: blur(1px);
        }

        .glow-layer-2 {
          border: 2px solid var(--electric-light-color);
          border-radius: 24px;
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          filter: blur(4px);
        }

        /* Overlay effects */
        .overlay-1 {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 24px;
          opacity: 1;
          mix-blend-mode: overlay;
          transform: scale(1.1);
          filter: blur(16px);
          background: linear-gradient(-30deg, white, transparent 30%, transparent 70%, white);
        }

        .overlay-2 {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 24px;
          opacity: 0.5;
          mix-blend-mode: overlay;
          transform: scale(1.1);
          filter: blur(16px);
          background: linear-gradient(-30deg, white, transparent 30%, transparent 70%, white);
        }

        /* Background glow */
        .background-glow {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 24px;
          filter: blur(32px);
          transform: scale(1.1);
          opacity: 0.3;
          z-index: -1;
          background: linear-gradient(-30deg, var(--silver-bright), transparent, var(--electric-border-color));
        }

        /* Content container */
        .content-container {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        /* Content sections */
        .content-top {
          display: flex;
          flex-direction: column;
          padding: 48px;
          padding-bottom: 16px;
          height: 100%;
        }

        .content-bottom {
          display: flex;
          flex-direction: column;
          padding: 48px;
          padding-top: 16px;
        }

        /* Scrollbar glass component */
        .scrollbar-glass {
          background: radial-gradient(47.2% 50% at 50.39% 88.37%, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 100%),
            rgba(255, 255, 255, 0.04);
          position: relative;
          transition: background 0.3s ease;
          border-radius: 14px;
          width: fit-content;
          height: fit-content;
          padding: 6px 12px;
          text-transform: uppercase;
          font-weight: bold;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 16px;
        }

        .scrollbar-glass:hover {
          background: radial-gradient(47.2% 50% at 50.39% 88.37%, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 100%),
            rgba(255, 255, 255, 0.08);
        }

        .scrollbar-glass::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          padding: 1px;
          background: linear-gradient(
            150deg,
            rgba(255, 255, 255, 0.48) 16.73%,
            rgba(255, 255, 255, 0.08) 30.2%,
            rgba(255, 255, 255, 0.08) 68.2%,
            rgba(255, 255, 255, 0.6) 81.89%
          );
          border-radius: inherit;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: xor;
          -webkit-mask-composite: xor;
          pointer-events: none;
        }

        /* Typography */
        .title {
          font-size: 24px;
          font-weight: 600;
          margin-top: auto;
          color: white;
          margin-bottom: 8px;
        }

        .description {
          opacity: 0.8;
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.6;
          font-size: 14px;
        }

        /* Divider */
        .divider {
          margin-top: auto;
          border: none;
          height: 1px;
          background-color: currentColor;
          opacity: 0.1;
          mask-image: linear-gradient(to right, transparent, black, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black, transparent);
        }

        /* Color Variants */
        .electric-blue {
          --electric-border-color: var(--electric-blue);
          --electric-light-color: var(--electric-blue-bright);
          --silver-bright: var(--electric-blue-bright);
          --silver-medium: var(--electric-blue-medium);
          --silver-dark: var(--electric-blue-dark);
          --gradient-color: rgba(0, 212, 255, 0.12);
        }

        .electric-purple {
          --electric-border-color: var(--electric-purple);
          --electric-light-color: var(--electric-purple-bright);
          --silver-bright: var(--electric-purple-bright);
          --silver-medium: var(--electric-purple-medium);
          --silver-dark: var(--electric-purple-dark);
          --gradient-color: rgba(168, 85, 247, 0.12);
        }

        .electric-cyan {
          --electric-border-color: var(--electric-cyan);
          --electric-light-color: var(--electric-cyan-bright);
          --silver-bright: var(--electric-cyan-bright);
          --silver-medium: var(--electric-cyan-medium);
          --silver-dark: var(--electric-cyan-dark);
          --gradient-color: rgba(6, 182, 212, 0.12);
        }

        .electric-green {
          --electric-border-color: var(--electric-green);
          --electric-light-color: var(--electric-green-bright);
          --silver-bright: var(--electric-green-bright);
          --silver-medium: var(--electric-green-medium);
          --silver-dark: var(--electric-green-dark);
          --gradient-color: rgba(16, 185, 129, 0.12);
        }

        .electric-orange {
          --electric-border-color: var(--electric-orange);
          --electric-light-color: var(--electric-orange-bright);
          --silver-bright: var(--electric-orange-bright);
          --silver-medium: var(--electric-orange-medium);
          --silver-dark: var(--electric-orange-dark);
          --gradient-color: rgba(245, 158, 11, 0.12);
        }
      `}</style>
    </>
  )
}
