import { useEffect, useState } from 'react';
import './status-widget.css';

const NOW_PLAYING_FALLBACK = 'J. Cole — 4 Your Eyez Only';
const WEATHER_FALLBACK = 'Cary, NC · 64°F · clear';
const STATUS_OPTIONS = [
  'BUILDING lncRNA model',
  'WRITING this site',
  'STUDYING AP Gov',
  'TRAINING wrestling',
  'READING The Bhagavad Gita',
  'TRYING Konami Code',
  'CREATING 404 Error',
];

function getCaryTime() {
  const fmt = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
  return fmt.format(new Date());
}

async function fetchWeather() {
  try {
    const res = await fetch('https://wttr.in/Cary?format=j1', {
      headers: { 'Accept-Language': 'en' },
    });
    if (!res.ok) throw new Error('weather fail');
    const j = await res.json();
    const cur = j.current_condition?.[0];
    if (!cur) throw new Error('no current');
    const tempF = cur.temp_F;
    const desc = (cur.weatherDesc?.[0]?.value || '').toLowerCase();
    return `Cary, NC · ${tempF}°F · ${desc}`;
  } catch {
    return null;
  }
}

async function fetchNowPlaying() {
  try {
    const res = await fetch('/api/spotify');
    if (!res.ok) throw new Error('spotify fail');
    const j = await res.json();
    if (!j.playing || !j.title) return null;
    return `${j.artist} — ${j.title}`;
  } catch {
    return null;
  }
}

export default function StatusWidget() {
  const [time, setTime] = useState(getCaryTime());
  const [statusIdx, setStatusIdx] = useState(0);
  const [weather, setWeather] = useState(WEATHER_FALLBACK);
  const [nowPlaying, setNowPlaying] = useState(NOW_PLAYING_FALLBACK);

  useEffect(() => {
    const timer = setInterval(() => setTime(getCaryTime()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const rotate = setInterval(() => {
      setStatusIdx((i) => (i + 1) % STATUS_OPTIONS.length);
    }, 4500);
    return () => clearInterval(rotate);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      const w = await fetchWeather();
      if (!cancelled && w) setWeather(w);
    };
    load();
    const refresh = setInterval(load, 15 * 60 * 1000);
    return () => {
      cancelled = true;
      clearInterval(refresh);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    const poll = async () => {
      const np = await fetchNowPlaying();
      if (!cancelled && np) setNowPlaying(np);
    };
    poll();
    const refresh = setInterval(poll, 30 * 1000);
    return () => {
      cancelled = true;
      clearInterval(refresh);
    };
  }, []);

  return (
    <div className="status-widget mono" aria-hidden="true">
      <span className="status-widget__title">SYSTEM/ONLINE</span>
      <div className="status-widget__row">
        <span className="status-widget__dot" />
        <span className="status-widget__key">LIVE</span>
        <span className="status-widget__val">{time} EST</span>
      </div>
      <div className="status-widget__row">
        <span className="status-widget__key">LOC</span>
        <span className="status-widget__val">{weather}</span>
      </div>
      <div className="status-widget__row">
        <span className="status-widget__key">NOW</span>
        <span className="status-widget__val" key={statusIdx}>
          {STATUS_OPTIONS[statusIdx]}
        </span>
      </div>
      <div className="status-widget__row">
        <span className="status-widget__key">♪</span>
        <span className="status-widget__val status-widget__val--scroll">
          {nowPlaying}
        </span>
      </div>
    </div>
  );
}
