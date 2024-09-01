import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { baseUrl } from "../utils";

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
          `${baseUrl}/api/project/get/${id}`,
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
    <div className="flex  justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 bg-gray-900 text-gray-300">
      <div className="w-full px-5 md:w-[800px] lg:w-[1000px] pb-5 bg-gray-800 shadow-xl rounded-lg">
        <div className="space-y-12 p-5">
          <div className="border-b border-gray-600 pb-12">
            <div className="flex justify-end">
              <Button onClick={handleReturnToDashboard} className="bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                Return to Dashboard
              </Button>
            </div>
            <div className="mt-10 flex flex-col gap-8">
              <div className="w-full sm:col-span-4">
                <h1 className="text-3xl font-bold mb-4 text-white">{title}</h1>
                <img
                  src={projectBanner || "/avatarHolder.jpg"}
                  alt="projectBanner"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
              <div className="w-full sm:col-span-4">
                <p className="text-xl font-semibold text-gray-300 mb-3">Description:</p>
                <ul className="list-disc list-inside text-gray-400 pl-5">
                  {descriptionList.map((item, index) => (
                    <li key={index} className="mt-2">
                      <span className="font-semibold text-white">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full sm:col-span-4">
                <p className="text-xl font-semibold text-gray-300 mb-3">Technologies:</p>
                <ul className="list-disc list-inside text-gray-400 pl-5">
                  {technologiesList.map((item, index) => (
                    <li key={index} className="mt-2">
                      <span className="text-blue-400 font-semibold italic">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full sm:col-span-4">
                <p className="text-xl font-semibold text-gray-300 mb-3">Stack:</p>
                <p className="text-gray-400"><span className="font-semibold text-white">{stack}</span></p>
              </div>
              <div className="w-full sm:col-span-4">
                <p className="text-xl font-semibold text-gray-300 mb-3">Deployed:</p>
                <p className="text-gray-400"><span className="font-semibold text-green-400">{deployed}</span></p>
              </div>
              <div className="w-full sm:col-span-4">
                <p className="text-xl font-semibold text-gray-300 mb-3">Github Repository Link:</p>
                <Link
                  className="text-blue-400 hover:text-blue-500 transition-colors"
                  target="_blank"
                  to={gitRepoLink}
                >
                  {gitRepoLink}
                </Link>
              </div>
              <div className="w-full sm:col-span-4">
                <p className="text-xl font-semibold text-gray-300 mb-3">Project Link:</p>
                <Link
                  className="text-blue-400 hover:text-blue-500 transition-colors"
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
