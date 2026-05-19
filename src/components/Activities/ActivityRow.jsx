import HalftoneImage from '../Layout/HalftoneImage.jsx';

const PLACEHOLDER = '/photos/_thumb-placeholder.svg';

export default function ActivityRow({ index, title, detail, tag, years, micro, photo }) {
  return (
    <div className="activity" style={{ '--row-delay': `${index * 70}ms` }}>
      <span className="activity__num mono">{String(index + 1).padStart(2, '0')}</span>
      <div className="activity__thumb-slot">
        <HalftoneImage
          src={photo || PLACEHOLDER}
          alt={title}
          size={56}
          className="activity__thumb"
        />
      </div>
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
