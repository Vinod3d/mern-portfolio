import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Button } from "@/components/ui/button";

const ViewProject = () => {
  const [project, setProject] = useState({
    title: "",
    description: "",
    technologies: "",
    stack: "",
    gitRepoLink: "",
    deployed: "",
    projectLink: "",
    projectBanner: "",
  });

  const { id } = useParams();
  const navigateTo = useNavigate();

  useEffect(() => {
    const getProject = async () => {
      try {
        const { data } = await axios.get(
          `/api/project/get/${id}`,
          { withCredentials: true }
        );

        setProject({
          title: data.project.title,
          description: data.project.description,
          technologies: data.project.technologies,
          stack: data.project.stack,
          gitRepoLink: data.project.gitRepoLink,
          deployed: data.project.deployed,
          projectLink: data.project.projectLink,
          projectBanner: data.project.projectBanner?.url || "",
        });
      } catch (error) {
        toast.error(error.response?.data?.message || "Error fetching project");
      }
    };
    getProject();
  }, [id]);

  const handleReturnToDashboard = () => {
    navigateTo("/");
  };

  const { title, description, technologies, stack, gitRepoLink, deployed, projectLink, projectBanner } = project;
  const descriptionList = description.split(". ");
  const technologiesList = technologies.split(", ");

  return (
    <div className="flex mt-7 justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4">
      <div className="w-[100%] px-5 md:w-[1000px] pb-5">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="flex justify-end">
              <Button onClick={handleReturnToDashboard}>
                Return to Dashboard
              </Button>
            </div>
            <div className="mt-10 flex flex-col gap-5">
              <div className="w-full sm:col-span-4">
                <h1 className="text-2xl font-bold mb-4">{title}</h1>
                <img
                  src={projectBanner || "/avatarHolder.jpg"}
                  alt="projectBanner"
                  className="w-full h-auto"
                />
              </div>
              <div className="w-full sm:col-span-4">
                <p className="text-2xl mb-2">Description:</p>
                <ul className="list-disc">
                  {descriptionList.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="w-full sm:col-span-4">
                <p className="text-2xl mb-2">Technologies:</p>
                <ul className="list-disc">
                  {technologiesList.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="w-full sm:col-span-4">
                <p className="text-2xl mb-2">Stack:</p>
                <p>{stack}</p>
              </div>
              <div className="w-full sm:col-span-4">
                <p className="text-2xl mb-2">Deployed:</p>
                <p>{deployed}</p>
              </div>
              <div className="w-full sm:col-span-4">
                <p className="text-2xl mb-2">Github Repository Link:</p>
                <Link
                  className="text-sky-700"
                  target="_blank"
                  to={gitRepoLink}
                >
                  {gitRepoLink}
                </Link>
              </div>
              <div className="w-full sm:col-span-4">
                <p className="text-2xl mb-2">Project Link:</p>
                <Link
                  className="text-sky-700"
                  target="_blank"
                  to={projectLink}
                >
                  {projectLink}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProject;
