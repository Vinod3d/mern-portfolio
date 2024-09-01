import "./About.css";
import theme_pattern from "../../assets/theme_pattern.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../utils";

const About = () => {
  const [user, setUser] = useState({});
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    const getMyProfile = async () => {
      const { data } = await axios.get( 
        `${baseUrl}/api/user/me/portfolio`,
        { withCredentials: true }
      );
      setUser(data.user);
    };

    const getMyTimeline = async () => {
      const { data } = await axios.get(`${baseUrl}/api/timeline/getall`, {
        withCredentials: true,
      });
      setTimeline(data.timeline);
    };
    getMyTimeline();


    getMyProfile();
  }, []);
  
  return (
    <div className="about" id="about">
      <div className="title-box">
        <h1>About me</h1>
        <img src={theme_pattern} alt="" />
      </div>
      <div className="about-sections">
        <div className="about-left">
          <img src={user.avatar && user.avatar.url}
              alt={user.fullName} />
        </div>
        <div className="about-right">
        <div className="about-para">
          {user?.aboutMe?.split('.').filter(text => text.trim() !== '').map((text, index) => (
            <p key={index}>{text.trim()}.</p>
          ))}
        </div>

        <div>
      <h1 className="overflow-x-hidden text-[2rem] sm:text-[1.75rem] md:text-[2.2rem] lg:text-[2.8rem] mb-4 font-extrabold">
        Timeline
      </h1>
      <ol className="relative border-s border-gray-200 dark:border-gray-700">
        {timeline &&
          timeline.map((element) => {
            return (
              <li className="mb-10 ms-6" key={element._id}>
                <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                  <svg
                    className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                  </svg>
                </span>
                <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                  {element.title}
                </h3>
                <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                  {element.timeline.from} -{" "}
                  {element.timeline.to ? element.timeline.to : "Present"}
                </time>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                  {element.description}
                </p>
              </li>
            );
          })}
      </ol>
    </div>
          
        </div>
      </div>
      
      
    </div>
  );
};

export default About;