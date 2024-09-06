/* eslint-disable react/no-unescaped-entities */
import './Contact.css'
import theme_pattern from "../../assets/theme_pattern.svg";
import mail_icon from '../../assets/mail_icon.svg'
import location_icon from '../../assets/location_icon.svg'
import call_icon from '../../assets/call_icon.svg'
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { baseUrl } from "../../utils";

const Contact = () => {
    const [notiTrue, setNotiTrue] = useState("");
    const [notiFalse, setNotiFalse] = useState("");
    const [loading, setLoading] = useState(false);
    const [senderName, setSenderName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [user, setUser] = useState({});

    const onSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const formData = new FormData(event.target);
        
        formData.append("access_key", "247456aa-8171-4513-a2bb-dcfc9485a40c");
        
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

    
        try {
            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: json,
            }).then((res) => res.json());
    
            if (res.success) {
                setSenderName("");
                setEmail("");
                setMessage("");
            } else {
                toast.error("Failed to send message.");
            }
    
            await axios.post(
                `${baseUrl}/api/message/send`,
                {senderName, email, message},  // Send json directly
                {
                    withCredentials: true,
                    headers: { "Content-Type": "application/json" },
                }
            ).then((response) => {
                toast.success("Message sent successfully to your server.");
                setSenderName("");
                setEmail("");
                setMessage("");
            }).catch((error) => {
                toast.error("Failed to send message to your server.");
            });
    
        } catch (error) {
            toast.error("Error occurred while sending message.");
        } finally {
            setLoading(false);
        }
    };

    const getMyProfile = async () => {
        const { data } = await axios.get(
          `${baseUrl}/api/user/me/portfolio`,
          { withCredentials: true }
        );
        setUser(data.user);
    };
      
    

    useEffect(() => {
        getMyProfile();
        if (notiTrue) {
            toast.success(notiTrue);
            setNotiTrue("");
        }

        if (notiFalse) {
            toast.error(notiFalse);
            setNotiFalse("");
        }
    }, [notiTrue, notiFalse]);

    return (
        <div className="contact" id="contact">
            <div className="title-box">
                <h1>Get in touch</h1>
                <img src={theme_pattern} alt="" />
            </div>
            <div className="contact-section">
                <div className="contact-left">
                    <h1>Let's talk</h1>
                    <p>I'm currently available to take on new projects, so feel free to send me a message about anything that you want me to work on. You can contact me anytime.</p>
                    <div className="contact-details">
                        <div className="contact-detail">
                            <img src={mail_icon} alt="" width="25px" height="25px"/> <p>{user.email}</p>
                        </div>
                        <div className="contact-detail">
                            <img src={call_icon} alt="" width="25px" height="25px"/> <p>+91 {user.phone}</p>
                        </div>
                        <div className="contact-detail">
                            <img src={location_icon} alt="" width="25px" height="25px"/> <p>{user.address}</p>
                        </div>
                    </div>
                </div>
                <form onSubmit={onSubmit} className="contact-right">
                    <label htmlFor="name">Your Name</label>
                    <input 
                        type="text" 
                        placeholder="Enter your name" 
                        name="senderName"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        required
                    />
                    <label htmlFor="email">Your Email</label>
                    <input 
                        type="email" 
                        placeholder="Enter your email" 
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label htmlFor="message">Write your message here</label>
                    <textarea 
                        name="message" 
                        rows="8" 
                        placeholder="Enter your message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    ></textarea>
                    <button 
                        type="submit" 
                        className="contact-submit"
                        disabled={loading}
                    >
                        {loading ? "Sending..." : "Submit Now"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Contact;
