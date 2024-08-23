import { useDispatch, useSelector } from "react-redux"
import {Button} from '@/components/ui/button'
import {Progress} from '@/components/ui/progress'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";
import { clearAllSoftwareAppErrors, deleteSoftwareApplication, getAllSoftwareApplications, resetSoftwareApplicationSlice } from "../../store/slices/softwareApplicationSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SpecialLoadingButton from "./SpecialLoadingButton";

const Dashboard = () => {
  const {user} = useSelector((state)=> state.user);
  const { projects } = useSelector((state) => state.project);
  const {skills} = useSelector((state) => state.skill);
  const {softwareApplications, loading, error, message} = useSelector((state) => state.applications);
  const {timeline} = useSelector((state) => state.timeline);

  const dispatch = useDispatch();

  const [appId, setAppId] = useState("");
  const handleDeleteSoftwareApp = (id)=>{
    setAppId(id);
    dispatch(deleteSoftwareApplication(id));
  };

  useEffect(()=>{
    if(error){
      toast.error(error);
      dispatch(clearAllSoftwareAppErrors());
    }

    if(message){
      toast.success(message);
      dispatch(resetSoftwareApplicationSlice());
      setAppId(null);
      dispatch(getAllSoftwareApplications());
    }
    
  },[loading, error, message, dispatch, appId])

  return (
    <>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-2 xl:grid-cols">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4">
              <Card className="sm:col-span-2">
                <CardHeader className="pb-3">
                    <CardDescription className="max-w-lg text-balance leading-relaxed">
                      {user.aboutMe}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                  <Link 
                    to="https://drive.google.com/file/d/1tKu77Hc13iq6n1pLLhYNfEBOle4EtTFg/view?usp=sharing" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Button>Visit Portfolio</Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card className="flex w-full flex-col justify-center">
                <CardHeader className="pb-3">
                  <CardTitle>Projects Completed</CardTitle>
                  <CardTitle>{projects && projects.length}</CardTitle>
                </CardHeader>
                <CardFooter>
                  <Link to={"/manage/projects"}>
                    <Button>Manage Projects</Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card className="flex flex-col justify-center">
                <CardHeader className="pb-2">
                  <CardTitle>Skills</CardTitle>
                  <CardTitle className="text-6xl">
                    {skills && skills.length}
                  </CardTitle>
                </CardHeader>
                <CardFooter>
                  <Link to={"manage/skills"}>
                    <Button>Manage Skill</Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
            <Tabs>
              <TabsContent>
                <Card>
                  <CardHeader className="px-7">
                    <CardTitle>Projects</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead className="hidden md:table-cell">
                            Stack
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Deployed
                          </TableHead>
                          <TableHead className="md:table-cell">
                            Update
                          </TableHead>
                          <TableHead className="text-right">Visit</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {projects && projects.length > 0 ? (
                          projects.map((element) => {
                            return (
                              <TableRow className="bg-accent" key={element._id}>
                                <TableCell>
                                  <div className="font-medium">
                                    {element.title}
                                  </div>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                  {element.stack}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                  <Badge
                                    className={`text-xs ${element.deployed === "Yes"? "bg-green-400" : "bg-red-400 "}`}
                                    variant="secondary"
                                  >
                                    {element.deployed}
                                  </Badge>
                                </TableCell>
                                <TableCell className="md:table-cell">
                                  <Link to={`/update/project/${element._id}`}>
                                    <Button>Update</Button>
                                  </Link>
                                </TableCell>
                                <TableCell className="text-right">
                                  <Link
                                    to={element.projectLink}
                                    target="_blank"
                                  >
                                    <Button>Visit</Button>
                                  </Link>
                                </TableCell>
                              </TableRow>
                            );
                          })
                        ) : (
                          <TableRow>
                            <TableCell className="text-3xl overflow-y-hidden">
                              You have not added any project.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            <Tabs>
              <TabsContent>
                <Card>
                  <CardHeader className="px-7 gap-3">
                    <CardTitle>Skills</CardTitle>
                  </CardHeader>
                  <CardContent className="grid sm:grid-cols-2 gap-4">
                    {
                      skills && skills.length > 0 ? (
                        skills.map((element)=> {
                          return (
                            <Card key={element._id}>
                              <CardHeader>{element.title}</CardHeader>
                              <CardFooter>
                                <Progress value={element.proficiency }/>
                              </CardFooter>
                            </Card>
                          )
                        })
                      ) : 
                      <p className="text-3xl overflow-y-hidden">
                        You have not added any project.
                      </p>
                    }
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            <Tabs>
              <TabsContent className="grid lg:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="px-7">
                    <CardTitle>Software Applications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Icon</TableHead>
                          <TableHead>Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {
                          softwareApplications && softwareApplications.length > 0 ? (
                            softwareApplications.map((element)=> {
                              return (
                                <TableRow key={element._id}>
                                  <TableCell>{element.name}</TableCell>
                                  <TableCell>
                                    <img
                                      src={element.image && element.image.url}
                                      alt={element.name}
                                      className="w-7 h-7"
                                    />
                                  </TableCell>
                                  <TableCell>
                                    {
                                      loading && appId === element._id ? <SpecialLoadingButton content={"Deleting"} width={"w-fit"}/> 
                                     : <Button onClick={()=>handleDeleteSoftwareApp(element._id)}>Delete</Button>
                                    }
                                  </TableCell>
                                </TableRow>
                              )
                            })
                          ) : <TableRow>
                            <TableCell className="text-3xl overflow-y-hidden">
                              You have not added any software application
                            </TableCell>
                          </TableRow>
                        }
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="px-7 flex items-center justify-between flex-row">
                    <CardTitle>Timeline</CardTitle>
                    <Link to={"/manage/timeline"}>
                        <Button>Manage Timeline</Button>
                    </Link>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>From</TableHead>
                          <TableHead>To</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {timeline && timeline.length > 0 ? (
                          timeline.map((element) => {
                            return (
                              <TableRow key={element._id}>
                                <TableCell>{element.title}</TableCell>
                                <TableCell>{element.timeline.from}</TableCell>
                                <TableCell>{element.timeline.to}</TableCell>
                              </TableRow>
                            )
                          })
                        ) : (
                          <TableRow>
                            <TableCell>
                              You have not added any timeline
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </>
  )
}

export default Dashboard