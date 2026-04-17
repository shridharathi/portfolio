import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub, faMedium } from '@fortawesome/free-brands-svg-icons';
import Masonry from '@mui/lab/Masonry';
import CylImageStripStack from '../../components/CylImageStripStack';
import WORK from '../../assets/work';
import EXPERIENCE from '../../assets/experience';
import ART from '../../assets/art';

const SHOW_PROJECT_IMAGES = true;

export default function Work() {
  return (
    <main className="mx-auto flex w-full max-w-[720px] flex-col pt-12 pb-[6vh] max-md:px-[4vw]">
      <header className="mb-2 w-full pb-1">
        <h1 className="m-0 text-[1.3rem] font-medium font-franklin dark:text-white">
          <a
            href="/"
            data-cyl="line-root"
            className="text-black no-underline dark:text-white"
          >
            Shridhar Athinarayanan
          </a>
        </h1>
        <p
          data-cyl="line-root"
          className="m-0 mt-1 text-[1.3rem] font-medium font-franklin dark:text-white"
        >
          I'm an AI product engineer passionate about data and creative tech.
        </p>
      </header>
      <div
        data-cyl="warp"
        className="cyl-warp-ready mt-[2.75rem] flex gap-5"
      >
        <a
          href="mailto:shriathi@stanford.alumni.edu"
          aria-label="Email"
          className="hover:opacity-70"
        >
          <FontAwesomeIcon icon={faEnvelope} size="xl" />
        </a>
        <a
          href="https://www.linkedin.com/in/shridhar-athinarayanan-638493199/"
          aria-label="LinkedIn"
          target="_blank"
          rel="noreferrer"
          className="hover:opacity-70"
        >
          <FontAwesomeIcon icon={faLinkedin} size="xl" />
        </a>
        <a
          href="https://github.com/shridharathi"
          aria-label="GitHub"
          target="_blank"
          rel="noreferrer"
          className="hover:opacity-70"
        >
          <FontAwesomeIcon icon={faGithub} size="xl" />
        </a>
        <a
          href="https://medium.com/@shridharathi"
          aria-label="Medium"
          target="_blank"
          rel="noreferrer"
          className="hover:opacity-70"
        >
          <FontAwesomeIcon icon={faMedium} size="xl" />
        </a>
      </div>

      <section className="mt-[2.75rem]">
        <h2
          data-cyl="line-root"
          className="mb-5 text-[1.3rem] font-bold dark:text-white"
        >
          Experience
        </h2>
        <div className="flex flex-col gap-5">
          {EXPERIENCE.map((exp) => (
            <Experience
              key={exp.name}
              {...exp}
              year={exp.year}
            />
          ))}
        </div>
      </section>

      <section className="mt-20">
        <h2
          data-cyl="line-root"
          className="mb-5 text-[1.3rem] font-bold dark:text-white"
        >
          Projects
        </h2>
        <div className="flex flex-col gap-20">
          {WORK.map((item) => (
            <div key={item.name}>
              {SHOW_PROJECT_IMAGES ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${item.name} (opens in new tab)`}
                  className="mx-auto flex h-[min(420px,max(240px,50vw))] w-full min-h-[240px] gap-0 overflow-visible transition-all duration-[250ms] ease-in-out hover:opacity-70 max-md:h-[min(360px,max(220px,56vw))]"
                >
                  {item.images.map((img, index) => (
                    <CylImageStripStack
                      key={`${item.name}-${index}`}
                      src={`images/${img}`}
                      alt={`${item.name} preview ${index + 1}`}
                      stripCount={64}
                      className="min-h-0 min-w-0 flex-1 basis-0 pr-[1vh] last:pr-0"
                    />
                  ))}
                </a>
              ) : null}
              <div
                className={`flex flex-col gap-3 ${SHOW_PROJECT_IMAGES ? 'pt-[3vh]' : 'pt-0'}`}
              >
                <p
                  data-cyl="line-root"
                  className="m-0 text-xl font-bold uppercase text-black dark:text-white"
                  id={item.name.replace(' ', '_')}
                >
                  {SHOW_PROJECT_IMAGES ? (
                    item.name
                  ) : (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-inherit no-underline hover:opacity-70"
                    >
                      {item.name}
                    </a>
                  )}
                </p>
                <p
                  data-cyl="line-root"
                  className="stack m-0 text-[#3d3d3dad] dark:text-[#b0b0b0]"
                  dangerouslySetInnerHTML={{ __html: item.stack }}
                />
                <div
                  data-cyl="line-root"
                  data-cyl-line-mode="description"
                  className="[&_a]:text-body-grey [&_a]:underline dark:[&_a]:text-neutral-300"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-[2.75rem]">
        <h2
          data-cyl="line-root"
          className="mb-5 text-[1.3rem] font-bold dark:text-white"
        >
          Education
        </h2>
        <p
          data-cyl="line-root"
          className="pb-[0.5vh] text-base font-normal dark:text-neutral-200"
        >
          Stanford University
        </p>
        <p
          data-cyl="line-root"
          className="pb-[0.5vh] text-[0.8rem] font-normal text-[#3d3d3d] dark:text-[#b0b0b0]"
        >
          M.S. Computer Science, AI (2024)
        </p>
        <p
          data-cyl="line-root"
          className="pb-[0.5vh] text-[0.8rem] font-normal text-[#3d3d3d] dark:text-[#b0b0b0]"
        >
          B.S. Data Science and Studio Art (2023)
        </p>
      </section>

      <section className="mt-[2.75rem]">
        <h2
          data-cyl="line-root"
          className="mb-5 text-[1.3rem] font-bold dark:text-white"
        >
          Artwork
        </h2>
        <div className="mt-8">
          <Masonry columns={4} spacing={1.5} className="!hidden md:!block">
            {ART.map((item, index) => (
              <div key={index} data-cyl="image">
                <img
                  src={`art/${item.img}`}
                  alt={item.title}
                  loading="lazy"
                  className="mx-auto block w-full max-w-[168px] align-top"
                />
              </div>
            ))}
          </Masonry>
          <Masonry columns={2} spacing={1.5} className="!block md:!hidden">
            {ART.map((item, index) => (
              <div key={index} data-cyl="image">
                <img
                  src={`art/${item.img}`}
                  alt={item.title}
                  loading="lazy"
                  className="mx-auto block w-full max-w-[188px] align-top"
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
    <div>
      <div
        data-cyl="line-root"
        data-cyl-warp-bundle=""
        className="experience-header mb-0.5"
      >
        <span className="shrink-0 text-[0.9rem] font-normal text-[#3d3d3d] dark:text-[#b0b0b0]">
          {year}
        </span>
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="min-w-0 text-black no-underline dark:text-white"
        >
          {name}
        </a>
      </div>
      <div className="experience-content">
        <p
          data-cyl="line-root"
          className="experience-position m-0 pb-[0.4vw] text-body-grey dark:text-[#b0b0b0]"
        >
          {position}
        </p>
        <p
          data-cyl="line-root"
          className="experience-description m-0 text-[0.9rem] font-normal text-[#3d3d3d] dark:text-[#b0b0b0]"
          dangerouslySetInnerHTML={{ __html: description.replace(/\n/g, '<br>') }}
        />
      </div>
    </div>
  );
}
