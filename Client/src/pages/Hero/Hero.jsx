/* eslint-disable react/no-unescaped-entities */
import "./Hero.css";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../utils";
import { Link } from "react-router-dom";
import {
  Facebook,
  Github,
  Instagram,
  Linkedin,
} from "lucide-react";

const Hero = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getMyProfile = async () => {
      const { data } = await axios.get(
        `${baseUrl}/api/user/me/portfolio`,
        { withCredentials: true }
      );
      setUser(data.user);
    };
    getMyProfile();
  }, []);
  
  return (
    <div className="hero" id="home">
      <img src={user.avatar && user.avatar.url} alt="profile-img" className="profile-img" />
      <h1>
        <span>I'm {user.fullName}, </span>
        frontend developer and freelancer.
      </h1>
      <p>I am a frontend developer in India with 3 year of experience</p>
      <div className="w-fit px-5 flex gap-5 
        items-center ">
          <Link to={user?.instagramURL} target="_blank">
            <Instagram className="text-pink-500 w-6 h-6" />
          </Link>
          <Link to={user?.facebookURL} target="_blank">
            <Facebook className="text-blue-800 w-6 h-6" />
          </Link>
          <Link to={user?.linkedInURL} target="_blank">
            <Linkedin className="text-sky-500 w-6 h-6" />
          </Link>
          <Link to={user?.githubURL} target="_blank">
            <Github className="text-sky-500 w-6 h-6" />
          </Link>
        </div>
      <div className="hero-action">
        <AnchorLink href="#contact" className="anchor-link" offset={50}>
          <div className="hero-connect">Connect with me</div>
        </AnchorLink >
        <Link to="https://drive.google.com/file/d/1tKu77Hc13iq6n1pLLhYNfEBOle4EtTFg/view">
          <div className="hero-resume">My resume</div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
