import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Avatar,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import {
  PowerIcon,
} from "@heroicons/react/24/solid";
import useUser from "../hooks/useUser";
import { UseUserProps } from "../context/UserProvider";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import { toast } from 'react-toastify';

const userLocal = JSON.parse(localStorage.getItem("user") || "{}");

type ConversationTypes = {
  conversationName: string
  members: {
    name: string,
    photoURL: string,
    email: string,

  }[]
}

export default function Sidebar({
  handleLogout, 
  selectConversation, 
  setNewContact
}:{
  handleLogout:()=>void, 
  selectConversation:(id:string)=>void, 
  setNewContact:({})=>void
}) {
  const { user, setUser }: UseUserProps = useUser();
  const [open, setOpen] =useState(false);
  const [conversations, setConversations] = useState<ConversationTypes[]>([]);
  const [contactEmail, setContactEmail] = useState<string>('')
  const [currentSelected, setCurrentSelected] = useState('');

  const errNotify = (message:string) => 
    toast.error(message, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
  });
 
  const handleOpen = () => setOpen(!open);

  const addContact = async() => {
    const response = await axios.post(`/users/create-conversation`, {
      senderEmail: user?.email,
      receiverEmail: contactEmail
    });
    if(response.data.success === false){
      errNotify("There is no user with that email")
    } else {
      setNewContact(response.data)
      setOpen(!open);
    }
  };
  const changeChat = (id:string) => {
    setCurrentSelected(id)
    selectConversation(id)
    console.log(id)
  };

  useEffect(() => {
    setUser? setUser(userLocal) : console.log("NO USER")
  }, [userLocal])

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    axios.post(`/users/new/email`, {
      uid:user?.uid,
      email:user?.email,
      name:user?.username,
      photoURL:user?.photoURL,
    },{signal})
    .then(res => console.log(res.data))
    .catch(err => console.log(err))

    axios.post(`/users/get-conversations`, {
      uid: userLocal.uid,
    },{signal})
    .then(res => {
      setConversations(res.data)
      console.log(res.data)
    })
    .catch(err => console.log(err))

    return () => controller.abort()
  }, [])
  
  console.log(conversations)
  return (
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-6 p-2 flex items-center justify-between">
        <Typography variant="h6" color="blue-gray" className="max-w-xs truncate">
          <Avatar
            variant="circular"
            alt="user"
            className="mx-6 w-10 h-10 rounded-full"
            src={ user?.photoURL ? user.photoURL : "https://www.eventfulnigeria.com/wp-content/uploads/2021/04/Avatar-PNG-Free-Download.png"}
          />
          {user?.username || user?.email || "NO USER"}
        </Typography>
        <a onClick={handleOpen} href="#" className="py-1 px-2 rounded-md transition-colors text-black hover:text-gray-600 hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
          </svg>
        </a>
        <Dialog open={open} handler={handleOpen}>
        <DialogHeader>New Message</DialogHeader>
        <DialogBody>
        <div className="w-full">
          <Input type="email" label="Email" crossOrigin={undefined} onChange={(e)=>setContactEmail(e.target.value)}/>
        </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={addContact}>
            <span>Message</span>
          </Button>
        </DialogFooter>
      </Dialog>
        

      </div>
      <List className="h-auto overflow-y-scroll">
        <div className="flex flex-col gap-2">
          <ListItem onClick={()=>changeChat('1')}>
            <ListItemPrefix>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
            </svg>
            </ListItemPrefix>
            <div className="flex flex-col">
              <Typography variant="paragraph">
              Global Chat
              </Typography>
              <Typography variant="small" className="font-bold">
              New Message(s)
              </Typography>
            </div>
            <ListItemSuffix className="relative">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            </ListItemSuffix>
          </ListItem>
          
          { conversations?.map(({conversationName, members})=>(
            <ListItem onClick={()=>changeChat(conversationName)}>
              <ListItemPrefix>
                <Avatar
                  variant="circular"
                  alt="user 2"
                  className="w-8 h-8 hover:z-10 focus:z-10"
                  src={members[0]?.photoURL == userLocal.photoURL ?  members[1]?.photoURL || "https://www.eventfulnigeria.com/wp-content/uploads/2021/04/Avatar-PNG-Free-Download.png": members[0]?.photoURL || "https://www.eventfulnigeria.com/wp-content/uploads/2021/04/Avatar-PNG-Free-Download.png"}
                  // src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80"
                />
              </ListItemPrefix>
              <div className="flex flex-col max-w-[190px] truncate">
                <Typography variant="paragraph" className="max-w-xs truncate">
                {members[0]?.name == userLocal.username? members[1]?.name || members[1]?.email : members[0]?.name || members[0]?.email }
                </Typography>
                <Typography variant="small" className="font-bold max-w-xs truncate">
                New Message
                </Typography>
              </div>
              <ListItemSuffix className="relative">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              </ListItemSuffix>
            </ListItem>
          ))}
          
        </div>
      </List>
      <List>
        <ListItem className="hover:text-red-600" onClick={handleLogout}>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
}