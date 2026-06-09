'use client';

import { forwardRef } from 'react';
import { ExhibitionData, VENUE_BG } from '@/app/lib/presets';

type Props = {
  data: ExhibitionData;
  width: number;
  height: number;
};

const EmailBannerCanvas = forwardRef<HTMLDivElement, Props>(function EmailBannerCanvas(
  { data, width, height },
  ref
) {
  const s = width / 700;
  const r = (base: number) => Math.round(base * s);

  const bgSrc = VENUE_BG[data.venueKey] ?? VENUE_BG['kr_seoul_coex_01'];

  const rightW = r(200);
  const leftW  = Math.round(width * 0.35);
  const midW   = width - leftW - rightW;

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        width: `${width}px`,
        height: `${height}px`,
        display: 'flex',
        overflow: 'hidden',
        fontFamily: 'Arial, Helvetica, sans-serif',
        flexShrink: 0,
      }}
    >
      {/* ── LEFT: dark background ── */}
      <div
        style={{
          width: `${leftW}px`,
          height: `${height}px`,
          backgroundColor: '#0d0d0d',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: `${r(14)}px ${r(20)}px`,
          boxSizing: 'border-box',
          flexShrink: 0,
        }}
      >
        {/* 1. Logo + 2. Divider — pinned to top */}
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo_w.png"
            alt="GENORAY"
            style={{
              height: `${r(26)}px`,
              objectFit: 'contain',
              objectPosition: 'left center',
              display: 'block',
            }}
          />
          <div style={{
            width: `${r(120)}px`,
            height: '1px',
            backgroundColor: 'rgba(255,255,255,0.40)',
            marginTop: `${r(8)}px`,
          }} />
        </div>

        {/* 3. "Visit us at..." + 4. "Booth No." — pinned to bottom */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: `${r(6)}px` }}>
          <div style={{ lineHeight: 1.3 }}>
            <span
              style={{
                fontFamily: "'Pretendard', Arial, sans-serif",
                fontSize: `${r(16)}px`,
                fontWeight: 400,
                color: 'rgba(255,255,255,0.70)',
              }}
            >
              {'Visit us at '}
            </span>
            <span
              style={{
                fontFamily: "'GmarketSans', 'Arial Black', Arial, sans-serif",
                fontSize: `${r(18)}px`,
                fontWeight: 700,
                color: '#ffffff',
              }}
            >
              {data.exhibitionName || 'Exhibition'} {data.year}
            </span>
          </div>

          <div>
            <span
              style={{
                fontFamily: "'Pretendard', Arial, sans-serif",
                fontSize: `${r(16)}px`,
                fontWeight: 400,
                color: 'rgba(255,255,255,0.55)',
              }}
            >
              {'Booth No. '}
            </span>
            <span
              style={{
                fontFamily: "'GmarketSans', 'Arial Black', Arial, sans-serif",
                fontSize: `${r(24)}px`,
                fontWeight: 700,
                color: data.color,
              }}
            >
              {data.booth || '—'}
            </span>
          </div>
        </div>
      </div>

      {/* ── MIDDLE: venue photo + overlay ── */}
      <div
        style={{
          width: `${midW}px`,
          height: `${height}px`,
          position: 'relative',
          flexShrink: 0,
          overflow: 'hidden',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={bgSrc}
          alt=""
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
            pointerEvents: 'none',
          }}
        />
        {/* Feather left edge into dark, feather right edge into white */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to right,' +
              '  rgba(13,13,13,0.92) 0%,' +
              '  rgba(0,0,0,0.20) 50%,' +
              '  rgba(0,0,0,0.00) 100%)',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* ── RIGHT: white background ── */}
      <div
        style={{
          width: `${rightW}px`,
          height: `${height}px`,
          backgroundColor: '#EAEBF0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          paddingTop: `${r(20)}px`,
          paddingBottom: `${r(12)}px`,
          paddingLeft: `${r(16)}px`,
          paddingRight: `${r(16)}px`,
          boxSizing: 'border-box',
          flexShrink: 0,
        }}
      >
        {/* Exhibition name */}
        <div
          style={{
            fontFamily: "'GmarketSans', 'Arial Black', Arial, sans-serif",
            fontSize: `${r(28)}px`,
            fontWeight: 700,
            color: data.color,
            lineHeight: 1.0,
            letterSpacing: '-0.01em',
            marginBottom: `${r(2)}px`,
          }}
        >
          {data.exhibitionName || 'Exhibition'}
        </div>

        {/* Year */}
        {data.year && (
          <div
            style={{
              fontFamily: "'GmarketSans', 'Arial Black', Arial, sans-serif",
              fontSize: `${r(28)}px`,
              fontWeight: 700,
              color: data.color,
              lineHeight: 1.0,
              letterSpacing: '-0.01em',
              marginBottom: `${r(8)}px`,
            }}
          >
            {data.year}
          </div>
        )}

        {/* City / Country */}
        {data.location && (
          <div
            style={{
              fontFamily: "'Pretendard', Arial, sans-serif",
              fontSize: `${r(14)}px`,
              fontWeight: 400,
              color: '#6b7280',
              lineHeight: 1.3,
              marginBottom: `${r(2)}px`,
            }}
          >
            {data.location}
          </div>
        )}

        {/* Date */}
        {data.date && (
          <div
            style={{
              fontFamily: "'Pretendard', Arial, sans-serif",
              fontSize: `${r(14)}px`,
              fontWeight: 600,
              color: data.color,
              lineHeight: 1.3,
            }}
          >
            {data.date}
          </div>
        )}
      </div>
    </div>
  );
});

export default EmailBannerCanvas;
