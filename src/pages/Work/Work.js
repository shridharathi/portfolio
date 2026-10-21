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
              {work.video ? (
                <div className="project-images project-video-wrap">
                  <video
                    className={`project-video${work.name === 'Visual Agent' ? ' project-video-contained' : ''}${work.name === 'SLATE' ? ' project-video-top' : ''}`}
                    src={`videos/${work.video}`}
                    poster={`video-posters/${work.poster}`}
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls
                    aria-label={`${work.name} project preview`}
                  />
                </div>
              ) : (
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
                      className={`${work.imageAspectRatio ? 'project-image-fixed' : ''}${work.name === 'Replicate Agent' ? ' project-image-contain' : ''}`}
                      style={{
                        maxWidth: `${100 / work.images.length}%`,
                        aspectRatio: work.imageAspectRatio,
                        objectPosition: work.imageObjectPosition,
                      }}
                      key={`${work.name}-${index}`}
                    />
                  ))}
                </a>
              )}
              <div className="project-info">
                <p className="heading project-heading" id={work.name.replace(' ', '_')}>
                  {work.name}
                </p>
                <p className="stack" dangerouslySetInnerHTML={{ __html: work.stack }} />
              </div>
              <div className="project-desc" dangerouslySetInnerHTML={{ __html: work.description }} />
              <br />
            </div>

            {/* Mobile: show all projects stacked */}
            <div className="mobile-project-info">
              {WORK.map((w) => (
                <div key={w.name}>
                  {w.video ? (
                    <div className="project-images project-video-wrap">
                      <video
                        className={`project-video${w.name === 'Visual Agent' ? ' project-video-contained' : ''}${w.name === 'SLATE' ? ' project-video-top' : ''}`}
                        src={`videos/${w.video}`}
                        poster={`video-posters/${w.poster}`}
                        autoPlay
                        muted
                        loop
                        playsInline
                        controls
                        aria-label={`${w.name} project preview`}
                      />
                    </div>
                  ) : (
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
                          className={`${w.imageAspectRatio ? 'project-image-fixed' : ''}${w.name === 'Replicate Agent' ? ' project-image-contain' : ''}`}
                          style={{
                            maxWidth: `${100 / w.images.length}%`,
                            aspectRatio: w.imageAspectRatio,
                            objectPosition: w.imageObjectPosition,
                          }}
                          key={`${w.name}-${index}`}
                        />
                      ))}
                    </a>
                  )}
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
              <div
                key={index}
                className={`art-item ${item.cropAspectRatio ? 'art-item-cropped' : ''}`}
                style={item.cropAspectRatio ? { aspectRatio: item.cropAspectRatio } : undefined}
              >
                <img
                  src={`art/${item.img}`}
                  alt={item.title}
                  loading="lazy"
                  className={item.cropAspectRatio ? 'art-image-cropped' : undefined}
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
