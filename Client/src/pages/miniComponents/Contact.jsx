import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { baseUrl } from "../../utils";

const Contact = () => {
  const [senderName, setSenderName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [notiTrue, setNotiTrue] = useState("");
  const [notiFalse, setNotiFalse] = useState("");
  const handleMessage = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .post(
        `${baseUrl}/api/message/send`,
        { senderName, subject, message },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        setNotiTrue(res.data.message);
        setSenderName("");
        setSubject("");
        setMessage("");
        setLoading(false);
      })
      .catch((error) => {
        setNotiFalse(error.response.data.message);
        setLoading(false);
      });
  };

  useEffect(()=>{
    if(notiTrue){
      toast.success(notiTrue);
      setNotiTrue("")
    }

    if(notiFalse){
      toast.error(notiFalse);
      setNotiFalse("")
    }

  }, [notiTrue, notiFalse])
  return (
    <>
      <div className="overflow-x-hidden mb-56">
        <div className="relative mb-8">
          <h1
            className="flex gap-4 items-center text-[1.85rem] sm:text-[2.75rem] md:text-[3rem] 
            lg:text-[3rem] leading-[56px] md:leading-[67px] lg:leading-[90px] 
            tracking-[15px] mx-auto w-fit font-extrabold about-h1"
            style={{
              background: "hsl(222.2 84% 4.9%)",
            }}
          >
            CONTACT
            <span className="text-tubeLight-effect font-extrabold">ME</span>
          </h1>
          <span className="absolute w-full h-1 top-7 sm:top-7 
          md:top-8 lg:top-11 z-[-1] bg-slate-200"></span>
        </div>
        <form onSubmit={handleMessage} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2 px-1.5">
            <Label className="text-xl">Your Name</Label>
            <Input
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder="Your Name"
            />
          </div>
          <div className="flex flex-col gap-2 px-1.5">
            <Label className="text-xl">Subject</Label>
            <Input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Subject"
            />
          </div>
          <div className="flex flex-col gap-2 px-1.5">
            <Label className="text-xl">Message</Label>
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your Message"
            />
          </div>
          <div className="flex justify-end">
            {
              loading ? 
              <Button className="w-full sm:w-52">MESSAGE SENDING...</Button>  :


              <Button className="w-full sm:w-52">SEND MESSAGE</Button>
            }
            
          </div>
        </form>
      </div>
    </>
  );
};

export default Contact;
