import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub, faMedium } from '@fortawesome/free-brands-svg-icons';
import Masonry from '@mui/lab/Masonry';
import './Work.css';
import WORK from '../../assets/work';
import EXPERIENCE from '../../assets/experience';
import ART from '../../assets/art';

export default function Work() {
  return (
    <main className="work-page">
      <p className="bio">
        I'm an AI product engineer passionate about data and creative tech.
      </p>
      <div className="profile-links">
        <a href="mailto:shriathi@stanford.alumni.edu" aria-label="Email">
          <FontAwesomeIcon icon={faEnvelope} size="xl" />
        </a>
        <a href="https://www.linkedin.com/in/shridhar-athinarayanan-638493199/" aria-label="LinkedIn" target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faLinkedin} size="xl" />
        </a>
        <a href="https://github.com/shridharathi" aria-label="GitHub" target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faGithub} size="xl" />
        </a>
        <a href="https://medium.com/@shridharathi" aria-label="Medium" target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faMedium} size="xl" />
        </a>
      </div>

      <section className="content-section">
        <h2 className="section-heading">Experience</h2>
        {EXPERIENCE.map((exp) => (
          <Experience
            key={exp.name}
            {...exp}
            year={exp.year}
          />
        ))}
      </section>

      <section className="content-section">
        <h2 className="section-heading">Projects</h2>
        {WORK.map((item) => (
        <div key={item.name} className="project-block">
          <a
            href={item.link}
            target="_blank"
            rel="noreferrer"
            className="project-images"
          >
            {item.images.map((img, index) => (
              <img
                src={`images/${img}`}
                alt={`${item.name} number ${index}`}
                style={{ maxWidth: `${100 / item.images.length}%` }}
                key={`${item.name}-${index}`}
              />
            ))}
          </a>
          <div className="project-info">
            <p className="heading project-heading" id={item.name.replace(' ', '_')}>
              {item.name}
            </p>
            <p className="stack" dangerouslySetInnerHTML={{ __html: item.stack }} />
          </div>
          <br />
          <br />
          <div dangerouslySetInnerHTML={{ __html: item.description }} />
          <br />
          <br />
        </div>
      ))}
      </section>

      <section className="education-section">
        <h2 className="education-heading">Education</h2>
        <p className="school">Stanford University</p>
        <p className="school-degrees">M.S. Computer Science, AI (2024)</p>
        <p className="school-degrees">B.S. Data Science and Studio Art (2023)</p>
      </section>

      <section className="content-section">
        <h2 className="section-heading">Artwork</h2>
        <div className="art-flow">
          <Masonry columns={3} spacing={2} className="art-masonry">
            {ART.map((item, index) => (
              <div key={index} className="play-gallery">
                <img
                  src={`art/${item.img}`}
                  alt={item.title}
                  loading="lazy"
                  style={{ display: 'block', width: '100%' }}
                />
              </div>
            ))}
          </Masonry>
          <Masonry columns={1} spacing={2} className="art-masonry-mobile">
            {ART.map((item, index) => (
              <div key={index} className="play-gallery-mobile">
                <img
                  src={`art/${item.img}`}
                  alt={item.title}
                  loading="lazy"
                  style={{ display: 'block', width: '100%' }}
                />
              </div>
            ))}
          </Masonry>
        </div>
      </section>
    </main>
  );
}

function Experience({ name, year, description, position, link }) {
  return (
    <div className="experience-container">
      <div className="experience-dates">{year}</div>
      <div className="experience-content">
        <div className="experience-header">
          <a href={link} target="_blank" rel="noreferrer">
            {name}
          </a>
        </div>
        <p className="experience-position">{position}</p>
        <p className="experience-description" dangerouslySetInnerHTML={{ __html: description.replace(/\n/g, '<br>') }}></p>
      </div>
    </div>
  );
}