import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
} from "@/components/ui/tabs"
import { Button } from "@/components/ui/button";
import SpecialLoadingButton from "./SpecialLoadingButton";
import { clearAllMessageErrors, deleteMessage, getAllMessages, resetMessageSlice } from "../../store/slices/messagesSlice";
import { toast } from "react-toastify";

const Messages = () => {
  const dispatch = useDispatch();
  const {loading, messages, error, message} = useSelector(state=> state.messages);
  const [messageId, setMessageId] = useState("");
  const handleMessageDelete = (id)=>{
    setMessageId(id);
    dispatch(deleteMessage(id));
  }

  useEffect(()=>{
    if(error){
      toast.error(error);
      dispatch(clearAllMessageErrors());
    }

    if(message){
      toast.success(message);
      dispatch(resetMessageSlice());
      dispatch(getAllMessages());
    }
  },[dispatch, error, loading, message]);

  return (
    <div className="min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-20 w-full sm:max-w-6xl mx-auto">
      <Tabs>
        <TabsContent>
          <Card>
            <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
              <CardTitle>Messages</CardTitle>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-4">
              {
                messages && messages.length > 0 ? (
                  messages.map(element=>{
                    return(
                      <Card key={element._id} className="grid gap-2 p-5">
                        <CardDescription className="text-slate-950">
                          <span className="font-bold mr-2">Sender Name:</span>
                          {element.senderName}
                        </CardDescription>
                        <CardDescription className="text-slate-950">
                          <span className="font-bold mr-2">Email:</span>
                          {element.email}
                        </CardDescription>
                        <CardDescription className="text-slate-950">
                          <span className="font-bold mr-2">Message:</span>
                          {element.message}
                        </CardDescription>
                        <CardFooter className="justify-end">
                          {
                            loading && messageId === element._id ? (
                              <SpecialLoadingButton width={"w-32"} content={"Deleting"}/>
                            ) : (
                              <Button className="w-32" onClick={()=>handleMessageDelete(element._id)}>Delete</Button>
                            )
                          }
                        </CardFooter>
                      </Card>
                    )
                  })
                ) : ""
              }
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
        
    </div>
  )
}

export default Messages