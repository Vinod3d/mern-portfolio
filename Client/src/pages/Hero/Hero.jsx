/* eslint-disable react/no-unescaped-entities */
import "./Hero.css";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../utils";
import { Link } from "react-router-dom";
import { Facebook, Github, Instagram, Linkedin } from "lucide-react";

const Hero = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMyProfile = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/api/user/me/portfolio`, {
          withCredentials: true,
        });
        setUser(data.user);
      } catch (error) {
        console.error("Error fetching profile", error);
      } finally {
        setLoading(false);
      }
    };
    getMyProfile();
  }, []);

  return (
    <div className="hero " id="home">
      {loading ? (
        <div
          role="status"
          className="space-y-8 animate-pulse flex flex-col gap-4 justify-center items-center md:space-y-0 md:space-x-8 rtl:space-x-reverse "
        >
          <div className="flex items-center justify-center w-48 h-48 max-w-full max-h-full bg-gray-300 rounded-full sm:w-60 sm:h-60 dark:bg-gray-700">
            <svg
              className="w-10 h-10 text-gray-200 dark:text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg>
          </div>
          <div className="md:w-[600px] lg:w-[800px]">
            <div className="flex gap-2 items-center justify-center mt-4">
              <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-[230px] mb-2.5 "></div>
              <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-[350px] mb-2.5 "></div>
              <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-[170px] mb-2.5 "></div>
            </div>
            <div className="flex gap-2 items-center justify-center mt-4">
              <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-[200px] mb-2.5 "></div>
              <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-[350px] mb-2.5 "></div>
            </div>

            <div className="flex items-center justify-center my-4">
              <div className="w-[400px] h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 me-3"></div>
            </div>
            <div className="flex gap-4 items-center justify-center">
              <div className="h-10 bg-gray-300 rounded-full dark:bg-gray-700 w-10"></div>
              <div className="h-10 bg-gray-300 rounded-full dark:bg-gray-700 w-10"></div>
              <div className="h-10 bg-gray-300 rounded-full dark:bg-gray-700 w-10"></div>
              <div className="h-10 bg-gray-300 rounded-full dark:bg-gray-700 w-10"></div>
            </div>
            <div className="flex gap-2 items-center justify-center mt-4">
              <div className="h-14 bg-gray-300 rounded-full dark:bg-gray-700 w-[150px] mb-2.5 "></div>
              <div className="h-14 bg-gray-300 rounded-full dark:bg-gray-700 w-[150px] mb-2.5 "></div>
            </div>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <img
            src={user.avatar && user.avatar.url}
            alt="profile-img"
            className="profile-img"
            width="240px"
            height="240px"
          />
          <h1>
            <span>I'm {user.fullName}, </span>
            frontend developer and freelancer.
          </h1>
          <p>I am a frontend developer in India with 3 year of experience</p>
          <div
            className="w-fit px-5 flex gap-5 
        items-center "
          >
            <Link
              to={user?.instagramURL}
              target="_blank"
              aria-label="Visit my Instagram profile"
            >
              <Instagram className="text-pink-500 w-6 h-6" />
            </Link>
            <Link
              to={user?.facebookURL}
              target="_blank"
              aria-label="Visit my Facebook profile"
            >
              <Facebook className="text-blue-800 w-6 h-6" />
            </Link>
            <Link
              to={user?.linkedInURL}
              target="_blank"
              aria-label="Visit my LinkedIn profile"
            >
              <Linkedin className="text-sky-500 w-6 h-6" />
            </Link>
            <Link
              to={user?.githubURL}
              target="_blank"
              aria-label="Visit my GitHub profile"
            >
              <Github className="text-sky-500 w-6 h-6" />
            </Link>
          </div>

          <div className="hero-action">
            <AnchorLink href="#contact" className="anchor-link" offset={50}>
              <div className="hero-connect">Connect with me</div>
            </AnchorLink>
            <Link to="https://drive.google.com/file/d/1tKu77Hc13iq6n1pLLhYNfEBOle4EtTFg/view">
              <div className="hero-resume">My resume</div>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Hero;
