'use client';

import { useState, useRef, type RefObject, type ReactNode } from 'react';
import ExhibitionCanvas from './ExhibitionCanvas';
import EmailBannerCanvas from './EmailBannerCanvas';
import {
  ExhibitionData,
  PRESETS,
  DEFAULT_DATA,
  COLOR_PRESETS,
  VENUE_OPTIONS,
} from '@/app/lib/presets';

type OutputFormat = 'all' | 'insta' | 'popup' | 'email';

const PREVIEW_W = 360;
const INSTA  = { w: 1080, h: 1350 };
const POPUP  = { w: 900,  h: 900  };
const EMAIL  = { w: 700,  h: 140  };

export default function ExhibitionApp() {
  const [selectedPreset, setSelectedPreset] = useState('');
  const [data, setData] = useState<ExhibitionData>(DEFAULT_DATA);
  const [format, setFormat] = useState<OutputFormat>('all');
  const [hexInput, setHexInput] = useState(DEFAULT_DATA.color);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');

  const instaRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLDivElement>(null);

  function applyPreset(key: string) {
    setSelectedPreset(key);
    if (key in PRESETS) {
      const p = PRESETS[key];
      setData({ ...p });
      setHexInput(p.color);
    }
  }

  function setField(field: keyof ExhibitionData, value: string) {
    setData(prev => ({ ...prev, [field]: value }));
  }

  function setColor(hex: string) {
    setData(prev => ({ ...prev, color: hex }));
    setHexInput(hex);
  }

  function handleHexChange(raw: string) {
    setHexInput(raw);
    if (/^#[0-9A-Fa-f]{6}$/.test(raw)) {
      setData(prev => ({ ...prev, color: raw }));
    }
  }

  async function downloadCanvas(
    ref: RefObject<HTMLDivElement>,
    filename: string
  ) {
    if (!ref.current) throw new Error('Canvas ref not found');
    const { toPng } = await import('html-to-image');
    const dataUrl = await toPng(ref.current, { pixelRatio: 1, cacheBust: true });
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  async function handleGenerate() {
    setGenerating(true);
    setError('');
    try {
      const name = (data.exhibitionName || 'exhibition').replace(/\s+/g, '_');
      if (format === 'all' || format === 'insta') {
        await downloadCanvas(instaRef, `${name}_insta_1080x1350.png`);
      }
      if (format === 'all' || format === 'popup') {
        if (format === 'all') await new Promise(r => setTimeout(r, 400));
        await downloadCanvas(popupRef, `${name}_popup_900x900.png`);
      }
      if (format === 'all' || format === 'email') {
        if (format === 'all') await new Promise(r => setTimeout(r, 400));
        await downloadCanvas(emailRef, `${name}_email_700x140.png`);
      }
    } catch (e) {
      console.error(e);
      setError('Image generation failed. Make sure background images exist in /public/bg/.');
    } finally {
      setGenerating(false);
    }
  }

  const instaScale    = PREVIEW_W / INSTA.w;
  const popupScale    = PREVIEW_W / POPUP.w;
  const emailScale    = PREVIEW_W / EMAIL.w;
  const instaPreviewH = Math.round(INSTA.h  * instaScale);
  const popupPreviewH = Math.round(POPUP.h  * popupScale);
  const emailPreviewH = Math.round(EMAIL.h  * emailScale);

  const showInsta = format === 'all' || format === 'insta';
  const showPopup = format === 'all' || format === 'popup';
  const showEmail = format === 'all' || format === 'email';

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center gap-3 shrink-0">
        <div className="w-2 h-6 rounded-sm bg-blue-500" />
        <h1 className="text-lg font-bold tracking-tight text-white">
          GENORAY Exhibition Image Generator
        </h1>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* ── Left panel: Form ── */}
        <aside className="w-[400px] shrink-0 border-r border-gray-800 overflow-y-auto p-5 space-y-4">

          {/* Preset selector */}
          <Section label="Exhibition Preset">
            <select
              value={selectedPreset}
              onChange={e => applyPreset(e.target.value)}
              className="input"
            >
              <option value="">— Select a preset —</option>
              {Object.keys(PRESETS).map(k => (
                <option key={k} value={k}>{k}</option>
              ))}
            </select>
          </Section>

          {/* Exhibition name + Year — side by side */}
          <Section label="Exhibition Name / Year">
            <div className="flex gap-2">
              <input
                className="input flex-1"
                value={data.exhibitionName}
                onChange={e => setField('exhibitionName', e.target.value)}
                placeholder="e.g. SIDEX"
              />
              <input
                className="input w-20 text-center font-mono"
                value={data.year}
                onChange={e => setField('year', e.target.value)}
                placeholder="2026"
                maxLength={4}
              />
            </div>
          </Section>

          {/* Background image */}
          <Section label="Background Image">
            <select
              value={data.venueKey}
              onChange={e => setField('venueKey', e.target.value)}
              className="input"
            >
              {VENUE_OPTIONS.map(g => (
                <optgroup key={g.group} label={g.group}>
                  {g.items.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </optgroup>
              ))}
            </select>
          </Section>

          {/* Location */}
          <Section label="Location / Country">
            <input
              className="input"
              value={data.location}
              onChange={e => setField('location', e.target.value)}
              placeholder="e.g. Seoul / Korea"
            />
          </Section>

          {/* Venue */}
          <Section label="Venue Name">
            <input
              className="input"
              value={data.venue}
              onChange={e => setField('venue', e.target.value)}
              placeholder="e.g. Coex Exhibition Center"
            />
          </Section>

          {/* Date */}
          <Section label="Date">
            <input
              className="input"
              value={data.date}
              onChange={e => setField('date', e.target.value)}
              placeholder="e.g. May. 29-31, 2026"
            />
          </Section>

          {/* Hall */}
          <Section label="Booth Hall (optional)">
            <input
              className="input"
              value={data.hall}
              onChange={e => setField('hall', e.target.value)}
              placeholder="e.g. Hall D (3F)"
            />
          </Section>

          {/* Booth number */}
          <Section label="Booth Number">
            <input
              className="input"
              value={data.booth}
              onChange={e => setField('booth', e.target.value)}
              placeholder="e.g. D125~128"
            />
          </Section>

          {/* Booth color */}
          <Section label="Booth Number Color">
            <div className="flex gap-2 mb-2 flex-wrap">
              {COLOR_PRESETS.map(cp => {
                const active = data.color.toUpperCase() === cp.value.toUpperCase();
                return (
                  <button
                    key={cp.value}
                    onClick={() => setColor(cp.value)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                      active
                        ? 'border-white ring-2 ring-white/30 scale-105'
                        : 'border-gray-600 hover:border-gray-400'
                    }`}
                    style={{
                      backgroundColor: cp.value,
                      color: cp.value === '#FFFFFF' ? '#111' : '#111',
                    }}
                  >
                    {cp.label}
                  </button>
                );
              })}
            </div>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={data.color}
                onChange={e => setColor(e.target.value)}
                className="w-9 h-9 rounded cursor-pointer border border-gray-600 bg-transparent p-0.5"
                title="Custom color"
              />
              <input
                type="text"
                value={hexInput}
                onChange={e => handleHexChange(e.target.value)}
                onBlur={() => setHexInput(data.color)}
                maxLength={7}
                placeholder="#FFC107"
                className="w-28 input font-mono text-xs"
              />
              <span className="text-xs text-gray-500">custom hex</span>
            </div>
          </Section>

          {/* Tagline */}
          <Section label="Tagline (optional)">
            <input
              className="input"
              value={data.tag}
              onChange={e => setField('tag', e.target.value)}
              placeholder="e.g. Come and discover Genoray's…"
            />
          </Section>

          {/* Output format */}
          <Section label="Output Format">
            <div className="flex gap-2">
              {(['all', 'insta', 'popup', 'email'] as OutputFormat[]).map(f => (
                <button
                  key={f}
                  onClick={() => setFormat(f)}
                  className={`flex-1 py-2 rounded-lg text-xs font-semibold border transition-all ${
                    format === f
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-200'
                  }`}
                >
                  {f === 'all' ? 'All' : f === 'insta' ? 'Insta' : f === 'popup' ? 'Popup' : 'Email'}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {format === 'all'
                ? 'Exports: 1080×1350 + 900×900 + 700×140 PNG'
                : format === 'insta'
                ? 'Exports: 1080×1350 PNG'
                : format === 'popup'
                ? 'Exports: 900×900 PNG'
                : 'Exports: 700×140 PNG (Email Banner)'}
            </p>
          </Section>

          {/* Error */}
          {error && (
            <p className="text-xs text-red-400 bg-red-950 border border-red-800 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          {/* Generate button */}
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold text-sm transition-colors flex items-center justify-center gap-2"
          >
            {generating ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Generating…
              </>
            ) : (
              '⬇ Generate & Download'
            )}
          </button>

          <p className="text-xs text-gray-600 text-center pb-2">
            Background images must be placed in <code className="text-gray-500">/public/bg/</code>
          </p>
        </aside>

        {/* ── Right panel: Previews ── */}
        <main className="flex-1 overflow-auto p-6 bg-gray-950">
          {format === 'all' ? (
            <div className="flex flex-col gap-6 items-start">
              {/* Row 1: Insta + Popup side by side */}
              <div className="flex gap-6 items-start">
                <PreviewBlock label="Instagram — 1080 × 1350">
                  <ScaledPreview
                    data={data}
                    canvasW={INSTA.w}
                    canvasH={INSTA.h}
                    previewW={PREVIEW_W}
                    previewH={instaPreviewH}
                    scale={instaScale}
                  />
                </PreviewBlock>
                <PreviewBlock label="Popup — 900 × 900">
                  <ScaledPreview
                    data={data}
                    canvasW={POPUP.w}
                    canvasH={POPUP.h}
                    previewW={PREVIEW_W}
                    previewH={popupPreviewH}
                    scale={popupScale}
                  />
                </PreviewBlock>
              </div>
              {/* Row 2: Email Banner */}
              <PreviewBlock label="Email Banner — 700 × 140">
                <ScaledPreview
                  data={data}
                  canvasW={EMAIL.w}
                  canvasH={EMAIL.h}
                  previewW={PREVIEW_W}
                  previewH={emailPreviewH}
                  scale={emailScale}
                  isEmail
                />
              </PreviewBlock>
            </div>
          ) : (
            <div className="flex flex-col gap-6 items-start">
              {showInsta && (
                <PreviewBlock label="Instagram — 1080 × 1350">
                  <ScaledPreview
                    data={data}
                    canvasW={INSTA.w}
                    canvasH={INSTA.h}
                    previewW={PREVIEW_W}
                    previewH={instaPreviewH}
                    scale={instaScale}
                  />
                </PreviewBlock>
              )}
              {showPopup && (
                <PreviewBlock label="Popup — 900 × 900">
                  <ScaledPreview
                    data={data}
                    canvasW={POPUP.w}
                    canvasH={POPUP.h}
                    previewW={PREVIEW_W}
                    previewH={popupPreviewH}
                    scale={popupScale}
                  />
                </PreviewBlock>
              )}
              {showEmail && (
                <PreviewBlock label="Email Banner — 700 × 140">
                  <ScaledPreview
                    data={data}
                    canvasW={EMAIL.w}
                    canvasH={EMAIL.h}
                    previewW={PREVIEW_W}
                    previewH={emailPreviewH}
                    scale={emailScale}
                    isEmail
                  />
                </PreviewBlock>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Hidden full-resolution canvases for export */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          opacity: 0,
          pointerEvents: 'none',
          zIndex: -100,
        }}
      >
        <ExhibitionCanvas ref={instaRef} data={data} width={INSTA.w} height={INSTA.h} />
        <ExhibitionCanvas ref={popupRef} data={data} width={POPUP.w} height={POPUP.h} />
        <EmailBannerCanvas ref={emailRef} data={data} width={EMAIL.w} height={EMAIL.h} />
      </div>
    </div>
  );
}

/* ── Sub-components ── */

function Section({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}

function PreviewBlock({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="text-xs font-mono text-gray-500 mb-2">{label}</p>
      {children}
    </div>
  );
}

function ScaledPreview({
  data,
  canvasW,
  canvasH,
  previewW,
  previewH,
  scale,
  isEmail = false,
}: {
  data: ExhibitionData;
  canvasW: number;
  canvasH: number;
  previewW: number;
  previewH: number;
  scale: number;
  isEmail?: boolean;
}) {
  return (
    <div
      style={{
        width: previewW,
        height: previewH,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 8,
        boxShadow: '0 4px 32px rgba(0,0,0,0.7)',
        flexShrink: 0,
      }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        {isEmail
          ? <EmailBannerCanvas data={data} width={canvasW} height={canvasH} />
          : <ExhibitionCanvas  data={data} width={canvasW} height={canvasH} />}
      </div>
    </div>
  );
}
