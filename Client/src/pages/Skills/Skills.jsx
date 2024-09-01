import { Card } from "@/components/ui/card";
import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../../utils";
import theme_pattern from "../../assets/theme_pattern.svg";
import './skills.css'

const Skills = () => {
  const [skills, setSkills] = useState([]);
  useEffect(() => {
    const getMySkills = async () => {
      const { data } = await axios.get(
        `${baseUrl}/api/skill/getall`,
        { withCredentials: true }
      );
      setSkills(data.skills);
    };
    getMySkills();
  }, []);
  return (
    <div className="skills w-full flex flex-col items-center gap-8 sm:gap-12 px-[4%] md:px-[10%] my-20">
      <div className="title-box">
        <h1>My Skills</h1>
        <img src={theme_pattern} alt="" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {skills &&
          skills.map((element) => {
            return (
              <Card className="card h-fit p-7 flex flex-col justify-center items-center gap-3" key={element._id}>
                <img
                  src={element.image && element.image.url}
                  alt="skill"
                  className="h-12 sm:h-24 w-auto"
                />
                <p className="text-muted-foreground text-center">
                  {element.title}
                </p>
              </Card>
            );
          })}
      </div>
    </div>
  );
};

export default Skills;
