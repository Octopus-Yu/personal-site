import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';
import Main from '../layouts/Main';
import Loading from '../components/Template/Loading';

const About = () => {
  const [markdown, setMarkdown] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    import('../data/about.md')
      .then((res) => {
        fetch(res.default)
          .then((r) => r.text())
          .then((text) => {
            setMarkdown(text);
            setIsLoading(false);
          });
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  const count = markdown
    .split(/\s+/)
    .map((s) => s.replace(/\W/g, ''))
    .filter((s) => s.length).length;

  return (
    <Main title="About" description="Learn about Michael D'Angelo">
      <article className="post markdown" id="about">
        <header>
          <div className="title">
            <h2>
              <Link to="/about">About Me</Link>
            </h2>
            <p>(in about {isLoading ? '...' : count} words)</p>
          </div>
        </header>
        {isLoading ? <Loading /> : <Markdown>{markdown}</Markdown>}
      </article>
    </Main>
  );
};

export default About;
