import "./MyWork.css";
import theme_pattern from "../../assets/theme_pattern.svg";
import arrow_icon from '../../assets/arrow_icon.svg'
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../../utils/index.js";

const MyWork = () => {

  const [viewAll, setViewAll] = useState(false);
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const getMyProjects = async () => {
      const { data } = await axios.get(
        `${baseUrl}/api/project/getall`,
        { withCredentials: true }
      );
      setProjects(data.projects);
    };
    getMyProjects();
  }, []);
  return (
    <div className="mywork" id="portfolio">
      <div className="title-box">
        <h1>My latest Work</h1>
        <img src={theme_pattern} alt="" />
      </div>
      <div className="mywork-container">
      {viewAll
          ? projects &&
      [...projects].reverse().map((element) => {
              return (
                <Link to={`/project/${element._id}`} key={element._id}>
                  <img
                    src={element.projectBanner && element.projectBanner.url}
                    alt={element.title}
                  />
                </Link>
              );
            })
          : projects &&
            projects.slice(0, 6).reverse().map((element) => {
              return (
                <Link to={`/project/${element._id}`} key={element._id}>
                  <img
                    src={element.projectBanner && element.projectBanner.url}
                    alt={element.title}
                  />
                </Link>
              );
            })}
      </div>
      {projects && projects.length > 6 && (
        <div className="mywork-showmore" onClick={() => setViewAll(!viewAll)}>
          <p> {viewAll ? "Show Less" : "Show More"}</p>
          <img src={arrow_icon} alt="" />
        </div>
      )}
      
    </div>
  );
};

export default MyWork;
