import { ExperienceTimeline } from "@/components/jordyn/experience-timeline";
import {
  profile,
  nav,
  pullQuote,
  fieldNotes,
  skillsIndex,
  selectedWork,
  qa,
  video,
  colophon,
  sections,
} from "@/lib/jordyn";

// The bio opens with a drop cap, so the first letter is split from the rest.
const dropcap = profile.bio.charAt(0);
const bioRest = profile.bio.slice(1);

export default function JordynPage() {
  return (
    <>
      {/* MASTHEAD */}
      <div className="masthead">
        <div className="wrap mast-inner">
          <span className="mast-cell side">{profile.masthead.section}</span>
          <span className="mast-cell mid">{profile.name}</span>
          <span className="mast-cell side">
            <span className="mast-dot" />
            {profile.masthead.issue}
          </span>
        </div>
      </div>

      {/* STICKY NAV */}
      <nav className="bar" aria-label="Profile sections">
        <div className="wrap bar-inner">
          <span className="bar-name">{profile.monogram}</span>
          <div className="bar-links">
            {nav.map((link) => (
              <a key={link.href} href={link.href} className={link.cta ? "bar-cta" : undefined}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* FEATURE OPENER */}
      <header className="feature">
        <div className="wrap">
          <div className="feature-top reveal">
            <span className="feature-tag">{profile.featureTag}</span>
            <span className="byline">{profile.byline}</span>
          </div>
          <h1 className="headline reveal">
            {profile.headline.lineOne}
            <br />
            {profile.headline.lineTwo} <span className="amp">{profile.headline.accent}</span>
          </h1>

          <div className="opener-grid">
            <div>
              <p className="standfirst reveal">
                <span className="dropcap">{dropcap}</span>
                {bioRest}
              </p>
              <div className="opener-meta reveal">
                <a className="meta-chip" href={`mailto:${profile.email}`}>
                  {profile.email}
                </a>
                <a className="meta-chip" href={`tel:${profile.phoneHref}`}>
                  {profile.phoneDisplay}
                </a>
                <a
                  className="meta-chip"
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener"
                >
                  LinkedIn ↗
                </a>
              </div>
            </div>
            <figure className="plate reveal">
              {/* To add a real photo, replace the monogram below with
                  <img src="/jordyn/portrait.jpg" alt="Portrait of Jordyn Moody" />
                  and drop the file in public/jordyn/. */}
              <div className="plate-img">
                <span className="monogram">{profile.monogram}</span>
              </div>
              <figcaption className="plate-cap">
                <span>{profile.name}</span>
                <span>{profile.plateCaption}</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </header>

      {/* CHAPTERS */}
      <section id="chapters">
        <div className="wrap">
          <div className="sec-label reveal">
            <span className="sec-no">{sections.chapters.no}</span>
            <div>
              <h2 className="sec-title">{sections.chapters.title}</h2>
              <p className="sec-lead">{sections.chapters.lead}</p>
            </div>
          </div>
          <ExperienceTimeline />
        </div>
      </section>

      {/* PULL QUOTE */}
      <section className="quote-sec">
        <div className="wrap">
          <p className="pullquote reveal">
            <span className="qmark">&ldquo;</span>
            {pullQuote.before}
            <em>{pullQuote.emphasis}</em>
            {pullQuote.after}
          </p>
          <p className="quote-attr reveal">{pullQuote.attribution}</p>
        </div>
      </section>

      {/* FIELD NOTES */}
      <section id="notes">
        <div className="wrap">
          <div className="sec-label reveal">
            <span className="sec-no">{sections.notes.no}</span>
            <div>
              <h2 className="sec-title">{sections.notes.title}</h2>
              <p className="sec-lead">{sections.notes.lead}</p>
            </div>
          </div>
          <div className="notes-grid reveal">
            {fieldNotes.map((note) => (
              <div className="note" key={note.number}>
                <div className="note-no">{note.number}</div>
                <div>
                  <h3>{note.title}</h3>
                  <p>{note.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INDEX OF SKILLS */}
      <section id="index">
        <div className="wrap">
          <div className="sec-label reveal">
            <span className="sec-no">{sections.index.no}</span>
            <div>
              <h2 className="sec-title">{sections.index.title}</h2>
              <p className="sec-lead">{sections.index.lead}</p>
            </div>
          </div>
          <div className="index-grid reveal">
            {skillsIndex.map((col) => (
              <div className="index-col" key={col.heading}>
                <h3>{col.heading}</h3>
                {col.items.map((item) => (
                  <div className="index-item" key={item.name}>
                    <span>{item.name}</span>
                    <span className="lead-dots" aria-hidden="true" />
                    <span className="pg">{item.page}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SELECTED WORK */}
      <section id="work">
        <div className="wrap">
          <div className="sec-label reveal">
            <span className="sec-no">{sections.work.no}</span>
            <div>
              <h2 className="sec-title">{sections.work.title}</h2>
              <p className="sec-lead">{sections.work.lead}</p>
            </div>
          </div>
          <div className="plates reveal">
            {selectedWork.map((plate) => (
              <a
                className="work-plate"
                key={plate.title}
                href={plate.href}
                {...(plate.external ? { target: "_blank", rel: "noopener" } : {})}
              >
                <div className="wp-head">{plate.kicker}</div>
                <div className="wp-body">
                  <h3>{plate.title}</h3>
                  <p>{plate.description}</p>
                  <div className="wp-go">{plate.cta}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Q&A */}
      <section id="qa">
        <div className="wrap">
          <div className="sec-label reveal">
            <span className="sec-no">{sections.qa.no}</span>
            <div>
              <h2 className="sec-title">{sections.qa.title}</h2>
              <p className="sec-lead">{sections.qa.lead}</p>
            </div>
          </div>
          <div className="qa reveal">
            {qa.map((item) => (
              <div className="qa-item" key={item.question}>
                <h3 className="qa-q">{item.question}</h3>
                <p className="qa-a">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ON THE RECORD */}
      <section id="film">
        <div className="wrap">
          <div className="sec-label reveal">
            <span className="sec-no">{sections.film.no}</span>
            <div>
              <h2 className="sec-title">{sections.film.title}</h2>
              <p className="sec-lead">{sections.film.lead}</p>
            </div>
          </div>
          <div className="film reveal">
            {video.embedUrl ? (
              <iframe src={video.embedUrl} title="Jordyn Moody introduction" allowFullScreen />
            ) : (
              <div className="film-ph">
                <div className="lbl">{video.label}</div>
                <div className="film-cap">{video.caption}</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* COLOPHON / CONTACT */}
      <footer className="colophon" id="contact">
        <div className="wrap" style={{ paddingTop: 64, paddingBottom: 64 }}>
          <div className="sec-label reveal">
            <span className="sec-no">{sections.contact.no}</span>
            <div>
              <h2 className="sec-title">{sections.contact.title}</h2>
            </div>
          </div>
          <p className="close-line reveal">{colophon.closeLine}</p>
          <div className="contact-row reveal">
            <a className="btn btn-fill" href={`mailto:${profile.email}`}>
              Email Jordyn
            </a>
            <a className="btn btn-out" href={profile.linkedin} target="_blank" rel="noopener">
              LinkedIn ↗
            </a>
            <a className="btn btn-out" href={`tel:${profile.phoneHref}`}>
              {profile.phoneDisplay}
            </a>
          </div>
          <div className="colo-meta">
            <span>{colophon.metaLeft}</span>
            <span>{colophon.metaRight}</span>
          </div>
        </div>
      </footer>
    </>
  );
}
