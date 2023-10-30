import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Avatar,
} from "@material-tailwind/react";
import {
  PowerIcon,
} from "@heroicons/react/24/solid";
import useUser from "../hooks/useUser";
import { UseUserProps } from "../context/UserProvider";
import { useEffect } from "react";
import axios from "../api/axios";

const userLocal = JSON.parse(localStorage.getItem("user") || "{}");

export default function Sidebar({handleLogout, selectMessage}:{handleLogout:()=>void, selectMessage:(id:number)=>void}) {
  const { user, setUser }: UseUserProps = useUser();

  useEffect(() => {
    setUser? setUser(userLocal) : console.log("NO USER")
    console.log("this ran");
  }, [userLocal])

  useEffect(() => {
    axios.post(`/users/email`, {
      email:user?.email,
      username:user?.username,
      photoURL:user?.photoURL

    })
    .then(res => console.log(res.data))
    .catch(err => console.log(err))
  }, [userLocal])
  
  return (
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-6 p-2">
        <Typography variant="h6" color="blue-gray" className="max-w-xs truncate">
          <Avatar
            variant="circular"
            alt="user"
            className="mx-6 w-10 h-10 rounded-full"
            src={ user?.photoURL ? user.photoURL : "https://www.eventfulnigeria.com/wp-content/uploads/2021/04/Avatar-PNG-Free-Download.png"}
          />
          {user?.username || user?.email || "NO USER"}
        </Typography>
      </div>
      <List className="h-auto overflow-y-scroll">
        <div className="flex flex-col gap-2">
          <ListItem onClick={()=>selectMessage(1)}>
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
          
          <ListItem onClick={()=>selectMessage(2)}>
            <ListItemPrefix>
              <Avatar
                variant="circular"
                alt="user 2"
                className="w-8 h-8 hover:z-10 focus:z-10"
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80"
              />
            </ListItemPrefix>
            <div className="flex flex-col">
              <Typography variant="paragraph">
              William Shakespeare
              </Typography>
              <Typography variant="small" className="font-bold">
              New Message
              </Typography>
            </div>
            <ListItemSuffix className="relative">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            </ListItemSuffix>
          </ListItem>

          <ListItem>
            <ListItemPrefix>
              <Avatar
                variant="circular"
                alt="user 2"
                className="w-8 h-8 hover:z-10 focus:z-10"
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80"
              />
            </ListItemPrefix>
            <div className="flex flex-col">
              <Typography variant="paragraph">
              William Shakespeare
              </Typography>
              <Typography variant="small" className="max-w-[130px] truncate">
              This is not a new message asjfsjkdflksadfj
              </Typography>
            </div>
            <ListItemSuffix className=" relative">
              {/* <span className="w-2 h-2 bg-blue-500 rounded-full z-10"></span> */}
            </ListItemSuffix>
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <Avatar
                variant="circular"
                alt="user 2"
                className="w-8 h-8 hover:z-10 focus:z-10"
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80"
              />
            </ListItemPrefix>
            <div className="flex flex-col">
              <Typography variant="paragraph">
              William Shakespeare
              </Typography>
              <Typography variant="small" className="max-w-[130px] truncate">
              This is not a new message asjfsjkdflksadfj
              </Typography>
            </div>
            <ListItemSuffix className=" relative">
              {/* <span className="w-2 h-2 bg-blue-500 rounded-full z-10"></span> */}
            </ListItemSuffix>
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <Avatar
                variant="circular"
                alt="user 2"
                className="w-8 h-8 hover:z-10 focus:z-10"
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80"
              />
            </ListItemPrefix>
            <div className="flex flex-col">
              <Typography variant="paragraph">
              William Shakespeare
              </Typography>
              <Typography variant="small" className="max-w-[130px] truncate">
              This is not a new message asjfsjkdflksadfj
              </Typography>
            </div>
            <ListItemSuffix className=" relative">
              {/* <span className="w-2 h-2 bg-blue-500 rounded-full z-10"></span> */}
            </ListItemSuffix>
          </ListItem>
          
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