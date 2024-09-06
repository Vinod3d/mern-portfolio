import "./MyWork.css";
import theme_pattern from "../../assets/theme_pattern.svg";
import arrow_icon from '../../assets/arrow_icon.svg';
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../../utils/index.js";

const MyWork = () => {
  const [viewAll, setViewAll] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading

  useEffect(() => {
    const getMyProjects = async () => {
      const { data } = await axios.get(`${baseUrl}/api/project/getall`, {
        withCredentials: true,
      });
      setProjects(data.projects);
      setLoading(false); // Data has been fetched
    };
    getMyProjects();
  }, []);

  return (
    <div className="mywork" id="portfolio">
      <div className="title-box">
        <h1>My Latest Work</h1>
        <img src={theme_pattern} alt="" />
      </div>

      <div className="mywork-container">
        {loading ? (
          // Skeleton while loading
          Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded shadow animate-pulse dark:border-gray-700"
            >
              <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700"></div>
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            </div>
          ))
        ) : viewAll ? (
          // If viewAll is true, display all projects
          projects &&
          [...projects].reverse().map((element) => (
            <Link to={`/project/${element._id}`} key={element._id}>
              <img
                src={element.projectBanner && element.projectBanner.url}
                alt={element.title}
                width="100%"
                height="100%"
              />
            </Link>
          ))
        ) : (
          // If viewAll is false, display only 6 projects
          projects &&
          projects
            .slice(0, 6)
            .reverse()
            .map((element) => (
              <Link to={`/project/${element._id}`} key={element._id}>
                <img
                  src={element.projectBanner && element.projectBanner.url}
                  alt={element.title}
                  width="100%"
                  height="100%"
                />
              </Link>
            ))
        )}
      </div>

      {projects && projects.length > 6 && (
        <div className="mywork-showmore" onClick={() => setViewAll(!viewAll)}>
          <p>{viewAll ? "Show Less" : "Show More"}</p>
          <img src={arrow_icon} alt="" width="20px" height="15px" />
        </div>
      )}
    </div>
  );
};

export default MyWork;
