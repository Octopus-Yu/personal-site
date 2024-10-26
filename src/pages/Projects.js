import React, {
  useState, useMemo, useRef, useEffect, useCallback,
} from 'react';
import { Link } from 'react-router-dom';

import Main from '../layouts/Main';

import Cell from '../components/Projects/Cell';
import FilterBar from '../components/Projects/FilterBar';
import data from '../data/projects';

const Projects = () => {
  const [categoryState, setCategoryState] = useState({
    All: true,
  });
  const projectsRef = useRef(null);

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

  const updateLayout = useCallback(() => {
    if (projectsRef.current) {
      const projects = Array.from(projectsRef.current.children);
      const visibleProjects = projects.filter(
        (project) => filteredProjects.some((p) => p.title === project.dataset.title),
      );

      let totalHeight = 0;
      visibleProjects.forEach((project) => {
        project.setAttribute('style', `transform: translateY(${totalHeight}px);`);
        totalHeight += project.offsetHeight;
      });

      projectsRef.current.style.height = `${totalHeight}px`;
    }
  }, [filteredProjects]);

  useEffect(() => {
    if (projectsRef.current) {
      const projects = Array.from(projectsRef.current.children);
      projects.forEach((project) => {
        const shouldShow = filteredProjects.some((p) => p.title === project.dataset.title);
        project.classList.toggle('hidden', !shouldShow);
      });

      updateLayout();

      const resizeObserver = new ResizeObserver(() => {
        updateLayout();
      });

      projects.forEach((project) => resizeObserver.observe(project));

      return () => {
        resizeObserver.disconnect();
      };
    }
    return undefined;
  }, [filteredProjects, updateLayout]);

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
        <div className="projects-container" ref={projectsRef}>
          {data.map((project) => (
            <Link
              to={`/projects/${project.slug || 'project-detail'}`}
              key={project.title}
              state={{ project }}
              className="project-card"
              data-title={project.title}
            >
              <Cell data={project} />
            </Link>
          ))}
        </div>
      </article>
    </Main>
  );
};

export default Projects;
