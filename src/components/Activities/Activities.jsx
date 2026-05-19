import ActivityRow from './ActivityRow.jsx';
import MarginNote from '../Layout/MarginNote.jsx';
import './activities.css';

const ACTIVITIES = [
  { title: 'Life Scout', detail: 'Boy Scouts of America', tag: 'Leadership' },
  { title: 'JV Wrestling', detail: 'Green Level High School', tag: 'Athletics' },
  { title: 'Financial Futures', detail: 'Co-founder, nonprofit', tag: 'Nonprofit' },
  { title: 'Triangle Chess', detail: 'Teacher · 1300 OTB / 1800 online', tag: 'Teach' },
  { title: 'Capital Area Teen Court', detail: 'Bailiff · Jury', tag: 'Civic' },
  { title: '4-H Teen Council', detail: 'Member', tag: 'Civic' },
  { title: 'CORD USA', detail: '100+ hours volunteering', tag: 'Service' },
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
