import React, { useState } from 'react';
import './Work.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import WORK from '../../assets/work';
import EXPERIENCE from '../../assets/experience';
import ART from '../../assets/art';

export default function Work() {
  const [work, setWork] = useState(WORK[0]);
  const [view, setView] = useState('projects');

  return (
    <div className="about work">
      <Sidebar
        items={EXPERIENCE.map((exp) => (
          <Experience key={exp.name} {...exp} />
        ))}
      >
        <div className="description projects-header">
          <p className="bio">
            I'm an AI product engineer into data and creative tech.
          </p>
          <br />
          <p className="school">Stanford University</p>
          <p className="school-degrees">M.S. Computer Science, AI (2024)</p>
          <p className="school-degrees">B.S. Data Science and Studio Art (2023)</p>
          <p className="section-header pt-5">EXPERIENCE</p>
        </div>
      </Sidebar>

      <div className="intro-container">
        <div className="section-tabs projects-header">
          <p
            className={`section-header tab ${view === 'projects' ? 'active-tab' : ''}`}
            onClick={() => setView('projects')}
          >
            PROJECTS
          </p>
          <p
            className={`section-header tab ${view === 'art' ? 'active-tab' : ''}`}
            onClick={() => setView('art')}
          >
            ART
          </p>
        </div>

        {view === 'projects' && (
          <>
            <div className="project-links">
              {WORK.map((w) => (
                <p
                  key={w.name}
                  onClick={() => setWork(w)}
                  className={work.name === w.name ? 'selected-project' : ''}
                >
                  {w.name}
                </p>
              ))}
            </div>
            <div className="projects-container">
              <a
                href={work.link}
                target="_blank"
                rel="noreferrer"
                className="project-images"
              >
                {work.images.map((img, index) => (
                  <img
                    src={`images/${img}`}
                    alt={`${work.name} number ${index}`}
                    style={{ maxWidth: `${100 / work.images.length}%` }}
                    key={`${work.name}-${index}`}
                  />
                ))}
              </a>
              <div className="project-info">
                <p className="heading project-heading" id={work.name.replace(' ', '_')}>
                  {work.name}
                </p>
                <p className="stack" dangerouslySetInnerHTML={{ __html: work.stack }} />
              </div>
              <br />
              <br />
              <div dangerouslySetInnerHTML={{ __html: work.description }} />
              <br />
              <br />
            </div>

            {/* Mobile: show all projects stacked */}
            <div className="mobile-project-info">
              {WORK.map((w) => (
                <div key={w.name}>
                  <a
                    href={w.link}
                    target="_blank"
                    rel="noreferrer"
                    className="project-images"
                  >
                    {w.images.map((img, index) => (
                      <img
                        src={`images/${img}`}
                        alt={`${w.name} number ${index}`}
                        style={{ maxWidth: `${100 / w.images.length}%` }}
                        key={`${w.name}-${index}`}
                      />
                    ))}
                  </a>
                  <p className="heading project-heading" id={w.name.replace(' ', '_')}>
                    {w.name}
                  </p>
                  <br />
                  <div dangerouslySetInnerHTML={{ __html: w.description }} />
                  <br />
                  <br />
                </div>
              ))}
            </div>
          </>
        )}

        {view === 'art' && (
          <div className="art-grid">
            {ART.map((item, index) => (
              <div key={index} className="art-item">
                <img
                  src={`art/${item.img}`}
                  alt={item.title}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Experience({ name, year, description, position, link }) {
  return (
    <div className="experience-container">
      <div className="experience-header">
        <a href={link} target="_blank" rel="noreferrer">
          {name}
        </a>
      </div>
      <p className="experience-position">{position}</p>
      <p
        className="experience-description"
        dangerouslySetInnerHTML={{ __html: description.replace(/\n/g, '<br>') }}
      />
    </div>
  );
}
