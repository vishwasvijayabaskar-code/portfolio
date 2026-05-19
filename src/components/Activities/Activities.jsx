import ActivityRow from './ActivityRow.jsx';
import MarginNote from '../Layout/MarginNote.jsx';
import './activities.css';

const ACTIVITIES = [
  { title: 'Life Scout', detail: 'Boy Scouts of America', tag: 'Leadership', years: '4y', micro: 'one merit badge from Eagle' },
  { title: 'Financial Futures', detail: 'Co-founder, nonprofit', tag: 'Nonprofit', years: '2y', micro: 'teaching teens money before they need it' },
  { title: 'Triangle Chess', detail: 'Teacher · 1300 OTB / 1800 online', tag: 'Teach', years: '3y', micro: 'kids teach me more than i teach them' },
  { title: 'Capital Area Teen Court', detail: 'Bailiff · Jury', tag: 'Civic', years: '2y', micro: 'peer justice, real cases' },
  { title: '4-H Teen Council', detail: 'Member', tag: 'Civic', years: '2y' },
  { title: 'CORD USA', detail: '100+ hours volunteering', tag: 'Service', years: '2y' },
  { title: 'JV Wrestling', detail: 'Green Level High School', tag: 'Athletics', years: '1y', micro: 'roadrunner phase activated' },
];

export default function Activities() {
  return (
    <section className="activities" id="activities">
      <div className="activities__inner container">
        <MarginNote side="left" rotate={-4} top="55%">
          chess kids teach me more than i teach them
        </MarginNote>
        <h2 className="activities__heading display">
          Off <span className="red">/ keyboard</span>.
        </h2>

        <div className="activities__list">
          {ACTIVITIES.map((a, i) => (
            <ActivityRow key={a.title} index={i} {...a} />
          ))}
        </div>
      </div>
    </section>
  );
}
