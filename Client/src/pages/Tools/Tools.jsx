import { Card } from "@/components/ui/card";
import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../../utils";
import theme_pattern from "../../assets/theme_pattern.svg";


const Tools = () => {
  const [apps, setApps] = useState([]);
  useEffect(() => {
    const getMyApps = async () => {
      const { data } = await axios.get(
        `${baseUrl}/api/application/getall`,
        { withCredentials: true }
      );

      setApps(data.softwareApplication);
    };
    getMyApps();
  }, []);

  return (
    <div className="skills w-full flex flex-col items-center gap-8 sm:gap-12 px-[4%] md:px-[10%] my-20">
      <div className="title-box">
        <h1>My Tools</h1>
        <img src={theme_pattern} alt="" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {apps &&
          apps.map((app) => {
            return (
              <Card className="card h-fit p-7 flex flex-col justify-center items-center gap-3" key={app._id}>
                <img
                  src={app?.image && app?.image.url}
                  alt="skill"
                  className="h-12 sm:h-24 w-auto"
                />
                <p className="text-muted-foreground text-center">
                  {app.title}
                </p>
              </Card>
            );
          })}
      </div>
    </div>
  );
};

export default Tools;
