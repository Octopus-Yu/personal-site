import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

import Main from '../layouts/Main';

import Cell from '../components/Projects/Cell';
import FilterBar from '../components/Projects/FilterBar';
import data from '../data/projects';

const Projects = () => {
  const [categoryState, setCategoryState] = useState({
    All: true,
  });

  const allCategories = useMemo(() => {
    const categories = new Set(['All']);
    data.forEach((project) => {
      project?.tags?.forEach((tag) => categories.add(tag));
    });
    return Array.from(categories);
  }, []);

  const getButtons = () => allCategories.map((cat) => ({
    name: cat,
    active: categoryState[cat] || false,
  }));

  const handleChildClick = (label) => {
    const newState = {};
    allCategories.forEach((key) => {
      newState[key] = (label === key);
    });
    setCategoryState(newState);
  };

  const filteredProjects = useMemo(() => {
    if (categoryState.All) return data;
    return data.filter((project) => project?.tags?.some((tag) => categoryState[tag]));
  }, [categoryState]);

  return (
    <Main
      title="Projects"
      description="Learn about Michael D'Angelo's projects."
    >
      <article className="post" id="projects">
        <header>
          <div className="title">
            <h2>
              <Link to="/projects">Projects</Link>
            </h2>
            <p>A selection of projects that I&apos;m not too ashamed of</p>
          </div>
        </header>
        <FilterBar
          categories={getButtons()}
          handleChildClick={handleChildClick}
        />
        {filteredProjects.map((project) => (
          <Link
            to={`/projects/${project.slug || 'project-detail'}`}
            key={project.title}
            state={{ project }}
          >
            <Cell data={project} />
          </Link>
        ))}
      </article>
    </Main>
  );
};

export default Projects;
