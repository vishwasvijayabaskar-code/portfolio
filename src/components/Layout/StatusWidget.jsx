import { useEffect, useState } from 'react';
import './status-widget.css';

const NOW_PLAYING = 'J. Cole — 4 Your Eyez Only';
const STATUS_OPTIONS = [
  'BUILDING lncRNA model',
  'WRITING this site',
  'STUDYING AP Gov',
  'TRAINING wrestling',
  'READING The Selfish Gene',
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

export default function StatusWidget() {
  const [time, setTime] = useState(getCaryTime());
  const [statusIdx, setStatusIdx] = useState(0);

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

  return (
    <div className="status-widget mono" aria-hidden="true">
      <div className="status-widget__row">
        <span className="status-widget__dot" />
        <span className="status-widget__key">LIVE</span>
        <span className="status-widget__val">{time} EST</span>
      </div>
      <div className="status-widget__row">
        <span className="status-widget__key">LOC</span>
        <span className="status-widget__val">Cary, NC · 64°F · clear</span>
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
          {NOW_PLAYING}
        </span>
      </div>
    </div>
  );
}
