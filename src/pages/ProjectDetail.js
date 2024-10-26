import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';
import Main from '../layouts/Main';

const ProjectDetail = () => {
  const [markdown, setMarkdown] = useState('');
  const { slug } = useParams();
  const location = useLocation();
  const { project } = location.state || {};

  useEffect(() => {
    if (slug && slug !== 'project-detail') {
      import(`../data/ProjectDetail/${slug}.md`)
        .then((res) => {
          fetch(res.default)
            .then((r) => r.text())
            .then(setMarkdown);
        })
        .catch(console.error);
    }
  }, [slug]);

  const count = markdown
    .split(/\s+/)
    .map((s) => s.replace(/\W/g, ''))
    .filter((s) => s.length).length;

  return (
    <Main
      title={project ? project.title : slug}
      description={
        project ? project.desc : `Details about the ${slug} project.`
      }
    >
      {' '}
      <article className="post markdown" id="about">
        <header>
          <div className="title">
            <h2>{project.title}</h2>
            <p>{project.subtitle}</p> <p>(in about {count} words)</p>
          </div>
        </header>
        {markdown ? <Markdown>{markdown}</Markdown> : <div>Under Construction 🚧🚧🚧...</div>}
      </article>
    </Main>
  );
};

export default ProjectDetail;
