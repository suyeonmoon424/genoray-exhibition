'use client';

import { forwardRef, useState, useEffect, useRef } from 'react';
import { ExhibitionData, VENUE_BG, getEmailLogoSrc } from '@/app/lib/presets';

type Props = {
  data: ExhibitionData;
  width: number;
  height: number;
  customBgUrl?: string;
  bgPositionY?: number;
  logoKey?: string;
};

const EmailBannerCanvas = forwardRef<HTMLDivElement, Props>(function EmailBannerCanvas(
  { data, width, height, customBgUrl, bgPositionY = 50, logoKey = 'GENORAY' },
  ref
) {
  const s = width / 700;
  const r = (base: number) => Math.round(base * s);

  // Background: custom upload takes priority over dropdown selection
  const bgSrc = customBgUrl ?? VENUE_BG[data.venueKey] ?? VENUE_BG['kr_seoul_coex_01'];

  const rightW = r(200);
  const leftW  = Math.round(width * 0.35);
  const midW   = width - leftW - rightW;

  // Right section: scale name/year font based on exhibition name length
  const nameLen = (data.exhibitionName || '').length;
  const rightNameSize = nameLen >= 13 ? r(20) : nameLen >= 7 ? r(24) : r(28);

  // Auto-fit font sizes — start at max, shrink 1px/pass until scrollWidth fits
  const maxVisit = r(15);  const minVisit = r(11);
  const maxBooth = r(22);  const minBooth = r(13);
  const [visitSize, setVisitSize] = useState(maxVisit);
  const [boothSize, setBoothSize] = useState(maxBooth);
  const visitRef  = useRef<HTMLDivElement>(null);
  const boothRef  = useRef<HTMLDivElement>(null);

  // Reset to max whenever content or scale changes
  useEffect(() => { setVisitSize(maxVisit); }, [data.exhibitionName, data.year, maxVisit]);
  useEffect(() => { setBoothSize(maxBooth); }, [data.booth, maxBooth]);

  // Shrink visit line one px at a time until it fits
  useEffect(() => {
    const el = visitRef.current;
    if (el && el.scrollWidth > el.clientWidth && visitSize > minVisit)
      setVisitSize(v => Math.max(v - 1, minVisit));
  }, [visitSize, data.exhibitionName, data.year, minVisit]);

  // Shrink booth line one px at a time until it fits
  useEffect(() => {
    const el = boothRef.current;
    if (el && el.scrollWidth > el.clientWidth && boothSize > minBooth)
      setBoothSize(b => Math.max(b - 1, minBooth));
  }, [boothSize, data.booth, minBooth]);

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
          padding: `${r(14)}px ${r(16)}px`,
          boxSizing: 'border-box',
          flexShrink: 0,
        }}
      >
        {/* 1. Logo + 2. Divider — pinned to top */}
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={getEmailLogoSrc(logoKey)}
            alt={logoKey}
            style={{
              height: `${r(26)}px`,
              objectFit: 'contain',
              objectPosition: 'left center',
              display: 'block',
              filter: 'brightness(0) invert(1)',
              opacity: 1,
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
          {/* "Visit us at [name] [year]" — auto-shrinks to fit */}
          <div ref={visitRef} style={{ lineHeight: 1.3, whiteSpace: 'nowrap', overflow: 'hidden' }}>
            <span
              style={{
                fontFamily: "'Pretendard', Arial, sans-serif",
                fontSize: `${visitSize}px`,
                fontWeight: 400,
                color: 'rgba(255,255,255,0.70)',
              }}
            >
              {'Visit us at '}
            </span>
            <span
              style={{
                fontFamily: "'GmarketSans', 'Arial Black', Arial, sans-serif",
                fontSize: `${visitSize}px`,
                fontWeight: 700,
                color: '#ffffff',
              }}
            >
              {data.exhibitionName || 'Exhibition'} {data.year}
            </span>
          </div>

          {/* "Booth No. [number]" — auto-shrinks to fit */}
          <div ref={boothRef} style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
            <span
              style={{
                fontFamily: "'Pretendard', Arial, sans-serif",
                fontSize: `${Math.round(boothSize * 0.65)}px`,
                fontWeight: 400,
                color: 'rgba(255,255,255,0.55)',
              }}
            >
              {'Booth No. '}
            </span>
            <span
              style={{
                fontFamily: "'GmarketSans', 'Arial Black', Arial, sans-serif",
                fontSize: `${boothSize}px`,
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
            objectPosition: `center ${bgPositionY}%`,
            display: 'block',
            pointerEvents: 'none',
          }}
        />
        {/* Left-to-right fade: dark at photo's left edge, transparent at right */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to right,' +
              '  rgba(0,0,0,0.90) 0%,' +
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
            fontSize: `${rightNameSize}px`,
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
              fontSize: `${rightNameSize}px`,
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
