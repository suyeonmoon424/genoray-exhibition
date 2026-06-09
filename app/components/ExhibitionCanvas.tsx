'use client';

import { forwardRef } from 'react';
import { ExhibitionData, VENUE_BG } from '@/app/lib/presets';

type Props = {
  data: ExhibitionData;
  width: number;
  height: number;
};

const ExhibitionCanvas = forwardRef<HTMLDivElement, Props>(function ExhibitionCanvas(
  { data, width, height },
  ref
) {
  // Scale factor: all design values are authored at 1080 px wide
  const s = width / 1080;
  const r = (base: number) => Math.round(base * s);

  // Background: fall back to COEX so preview is never blank
  const bgSrc = VENUE_BG[data.venueKey] ?? VENUE_BG['kr_seoul_coex_01'];

  // Year comes directly from its own field now
  const year = data.year;

  // Name/year font size: fixed large size, text wraps naturally in a capped container
  const nameFontSize = r(116);

  const ptop   = r(106);
  const pleft  = r(80);  // matches pright/pbottom for consistent edge spacing
  const pright = r(80);
  const pbottom= r(80);

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        width: `${width}px`,
        height: `${height}px`,
        overflow: 'hidden',
        fontFamily: 'Arial, Helvetica, sans-serif',
        backgroundColor: '#050505',
        flexShrink: 0,
      }}
    >
      {/* ── Background photo ── */}
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
          objectPosition: 'center right',
          display: 'block',
          pointerEvents: 'none',
        }}
      />

      {/* ── Overlay 1: left → right  (strong left, fades right)  ── */}
      {/* #3 / #6: pushed opacity higher on the left portion */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            'linear-gradient(to right,' +
            '  rgba(0,0,0,0.98)  0%,' +
            '  rgba(0,0,0,0.96) 12%,' +
            '  rgba(0,0,0,0.90) 26%,' +
            '  rgba(0,0,0,0.72) 44%,' +
            '  rgba(0,0,0,0.28) 66%,' +
            '  rgba(0,0,0,0.00) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Overlay 2: bottom → top  (anchor the bottom area) ── */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            'linear-gradient(to top,' +
            '  rgba(0,0,0,0.92)  0%,' +
            '  rgba(0,0,0,0.50) 24%,' +
            '  rgba(0,0,0,0.00) 54%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Content layer ── */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          paddingTop: `${ptop}px`,
          paddingLeft: `${pleft}px`,
          paddingRight: `${pright}px`,
          paddingBottom: `${pbottom}px`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxSizing: 'border-box',
        }}
      >

        {/* ── TOP: exhibition identity block ── */}
        <div>

          {/* Name + Year block — capped to 60% of card width so long names wrap
              naturally at word boundaries without shrinking the font size */}
          <div style={{ maxWidth: `${r(648)}px` }}>

            {/* Exhibition name — wraps to 2-3 lines for long names */}
            <div
              style={{
                fontFamily: "'GmarketSans', 'Arial Black', Arial, sans-serif",
                fontSize: `${nameFontSize}px`,
                fontWeight: 700,
                color: '#ffffff',
                lineHeight: 0.97,
                letterSpacing: '-0.02em',
                marginBottom: `${r(18)}px`,
                wordBreak: 'normal',
                overflowWrap: 'break-word',
              }}
            >
              {data.exhibitionName || 'Exhibition'}
            </div>

            {/* Year — always its own line, same size */}
            {year && (
              <div
                style={{
                  fontFamily: "'GmarketSans', 'Arial Black', Arial, sans-serif",
                  fontSize: `${nameFontSize}px`,
                  fontWeight: 700,
                  color: '#ffffff',
                  lineHeight: 0.97,
                  letterSpacing: '-0.02em',
                }}
              >
                {year}
              </div>
            )}
          </div>

          {/* Short white divider  (#5) */}
          <div
            style={{
              width: `${r(60)}px`,
              height: '2px',
              backgroundColor: '#ffffff',
              marginTop: `${r(32)}px`,
              marginBottom: `${r(32)}px`,
            }}
          />

          {/* Location — Pretendard ExtraBold, bigger  (#6) */}
          <div
            style={{
              fontFamily: "'Pretendard', Arial, sans-serif",
              fontSize: `${r(46)}px`,
              fontWeight: 600,
              color: '#ffffff',
              lineHeight: 1.15,
              letterSpacing: '-0.01em',
              marginBottom: `${r(8)}px`,
            }}
          >
            {data.location || 'City / Country'}
          </div>

          {/* Venue — Pretendard Regular */}
          <div
            style={{
              fontFamily: "'Pretendard', Arial, sans-serif",
              fontSize: `${r(28)}px`,
              fontWeight: 400,
              color: 'rgba(255,255,255,0.80)',
              lineHeight: 1.3,
              marginBottom: `${r(10)}px`,
            }}
          >
            {data.venue || 'Venue Name'}
          </div>

          {/* Date — Pretendard ExtraBold  (#6) */}
          <div
            style={{
              fontFamily: "'Pretendard', Arial, sans-serif",
              fontSize: `${r(46)}px`,
              fontWeight: 600,
              color: '#ffffff',
              lineHeight: 1.15,
              letterSpacing: '-0.01em',
            }}
          >
            {data.date || 'Date'}
          </div>

          {/* Tagline (optional) */}
          {data.tag && (
            <div
              style={{
                marginTop: `${r(20)}px`,
                fontFamily: "'Pretendard', Arial, sans-serif",
                fontSize: `${r(26)}px`,
                fontWeight: 400,
                fontStyle: 'italic',
                color: 'rgba(255,255,255,0.72)',
                lineHeight: 1.45,
              }}
            >
              {data.tag}
            </div>
          )}
        </div>

        {/* ── BOTTOM: booth card + logo ── */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          {/* ── Booth card: badge layout — white-header + outlined-transparent body ── */}
          <div
            style={{
              display: 'inline-flex',
              flexDirection: 'column',
              minWidth: `${r(240)}px`,
              borderRadius: `${r(16)}px`,
              overflow: 'hidden',
              boxShadow: `inset 0 0 0 ${r(2)}px #ffffff`,
            }}
          >
            {/* TOP — white background, "GENORAY [bold] Booth No. [regular gray]" */}
            <div
              style={{
                backgroundColor: '#ffffff',
                paddingTop: `${r(16)}px`,
                paddingBottom: `${r(16)}px`,
                paddingLeft: `${r(28)}px`,
                paddingRight: `${r(28)}px`,
                fontSize: `${r(26)}px`,
                lineHeight: 1,
                whiteSpace: 'nowrap',
                textAlign: 'center',
              }}
            >
              <span style={{ fontFamily: "'Pretendard', Arial, sans-serif", fontWeight: 600, color: '#111111' }}>GENORAY</span>
              <span style={{ fontFamily: "'Pretendard', Arial, sans-serif", fontWeight: 600, color: '#9E9E9E' }}> Booth No.</span>
            </div>

            {/* BOTTOM — transparent bg (shows dark canvas through), white border via outer card */}
            <div
              style={{
                backgroundColor: 'transparent',
                paddingTop: `${r(data.hall ? 22 : 32)}px`,
                paddingBottom: `${r(data.hall ? 26 : 32)}px`,
                paddingLeft: `${r(28)}px`,
                paddingRight: `${r(28)}px`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: data.hall ? 'flex-start' : 'center',
              }}
            >
              {/* Hall — colored, ~30px, hidden completely when empty */}
              {data.hall && (
                <div
                  style={{
                    fontFamily: "'GmarketSans', 'Arial Black', Arial, sans-serif",
                    fontSize: `${r(36)}px`,
                    fontWeight: 700,
                    color: data.color,
                    lineHeight: 1.4,
                    marginBottom: `${r(8)}px`,
                  }}
                >
                  {data.hall}
                </div>
              )}

              {/* Booth number — large dominant, ~68px */}
              <div
                style={{
                  fontFamily: "'GmarketSans', 'Arial Black', Arial, sans-serif",
                  fontSize: `${r(80)}px`,
                  fontWeight: 700,
                  color: data.color,
                  lineHeight: 1.0,
                  letterSpacing: '-0.01em',
                }}
              >
                {data.booth || '000'}
              </div>
            </div>
          </div>

          {/* GENORAY logo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="GENORAY"
            style={{
              height: `${r(110)}px`,
              maxWidth: `${r(340)}px`,
              objectFit: 'contain',
              objectPosition: 'right center',
              display: 'block',
            }}
          />
        </div>

      </div>
    </div>
  );
});

export default ExhibitionCanvas;
