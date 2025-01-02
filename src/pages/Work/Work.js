import React, { useState } from 'react';
import './Work.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import WORK from '../../assets/work';
import EXPERIENCE from '../../assets/experience';

export default function Work() {
  const [work, setWork] = useState(WORK[0]);
  return (
    <div className="about work">
      <Sidebar
        items={EXPERIENCE.map((exp) => (
          <Experience
            {...exp}
            dates={[exp.dates.start, exp.dates.end ?? 'Present']}
          />
        ))}
      >
        <div className="description projects-header">
          <p className="bio">
            I'm an AI product engineer passionate about
             user-centric design.
          </p>
          <br />
          <p className='school'> Stanford University<br /></p>
          <p className='school-degrees'>  M.S. Computer Science, AI (2024)<br /> </p>
          <p className='school-degrees'> B.S. Data Science and Studio Art (2023) </p>
          <p className="section-header pt-5">EXPERIENCE</p>
        </div>
      </Sidebar>
      <div className="intro-container">
        <p className="section-header projects-header">PROJECTS</p>
        <div className="project-links">
          {WORK.map((w) => (
            <p
              onClick={() => setWork(w)}
              className={work.name === w.name && 'selected-project'}
            >
              {w.name}
            </p>
          ))}
        </div>
        <div className="projects-container">
          <div>
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
                  style={{ maxWidth: `${100 / work.images.length}%`}}
                  key={`${work.name} number ${index}`}
                />
              ))}
            </a>
            <div className="project-info">
              <p className="heading project-heading" id={work.name.replace(' ', '_')}> {work.name} </p>
              <p className="stack" dangerouslySetInnerHTML={{ __html: work.stack }}></p>
            </div>
            <br />
            <br />
            <div dangerouslySetInnerHTML={{ __html: work.description }}></div>
            <br />
            <br />
          </div>
        </div>
        <div className="mobile-project-info">
          {WORK.map((work) => (
            <div>
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
                    key={`${work.name} number ${index}`}
                  />
                ))}
              </a>
              <p
                className="heading project-heading"
                id={work.name.replace(' ', '_')}
              >
                {work.name}
              </p>
              <br />
              <div dangerouslySetInnerHTML={{ __html: work.description }}></div>
              <br />
              <br />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Experience({ name, dates, description, position, link }) {
  return (
    <div className="experience-container">
      <div className="experience-header">
        <a href={link} target="_blank" rel="noreferrer">
          {name}
        </a>
        <p className="experience-dates">{dates.join('-')}</p>
      </div>
      <p className="experience-position">{position}</p>
      <p className="experience-description" dangerouslySetInnerHTML={{ __html: description.replace(/\n/g, '<br>') }}></p>
    </div>
  );
}