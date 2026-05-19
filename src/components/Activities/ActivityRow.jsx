export default function ActivityRow({ index, title, detail, tag, years, micro }) {
  return (
    <div className="activity" style={{ '--row-delay': `${index * 70}ms` }}>
      <span className="activity__num mono">{String(index + 1).padStart(2, '0')}</span>
      <div className="activity__body">
        <h3 className="activity__title display">{title}</h3>
        {micro && <span className="activity__micro mono">// {micro}</span>}
      </div>
      <span className="activity__detail mono">{detail}</span>
      <span className="activity__years mono">[{years}]</span>
      <span className="activity__tag mono">{tag}</span>
    </div>
  );
}
