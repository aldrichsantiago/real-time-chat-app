import { Avatar, Button, Card, Popover, PopoverContent, PopoverHandler, Tooltip, Typography } from "@material-tailwind/react";
import axios from "../api/axios";
import { useState } from "react";
import useUser from "../hooks/useUser";
import { UseUserProps } from "../context/UserProvider";

function MessageViewHeader({contact}: {contact:{
    name:string, 
    photoURL:string,
    email:string
    uid:string
}}){
    console.log(contact)
    return(
        <span className="w-full flex justify-between items-center bg-gray-100 rounded-t-lg">
            <span>
            <Tooltip content="Back" placement="top">
                <Button variant="text" className="rounded-none rounded-tl-lg hover:text-gray-100 hover:bg-gray-900">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                </Button>
            </Tooltip>
            </span>
            
            <span className="mx-6 flex items-center">
                <Avatar
                    variant="circular"
                    alt="user 2"
                    className="w-8 h-8 mx-3 hover:z-10 focus:z-10"
                    src={contact?.photoURL}
                />
                <Typography>
                    {contact?.name}
                </Typography>
            </span>
            <span className="flex items-center">
                <Popover>
                    <PopoverHandler>
                    <Button variant="text" className="rounded-none rounded-tr-lg hover:text-gray-100 hover:bg-gray-900">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                    </svg>
                    </Button>
                    </PopoverHandler>
                    <PopoverContent>
                        Name: {contact?.name} <br />
                        Email: {contact?.email}
                    </PopoverContent>
                </Popover>
            </span>
        </span>
    )
}

function MessageViewFooter({contact}: {contact:{
    name:string, 
    photoURL:string,
    email:string
    uid:string
}})
{
    const [message, setMessage] = useState<string>("")
    const { user }:UseUserProps = useUser();
    const sendMessage = async(e: React.FormEvent) => {
        e.preventDefault();
        const res = await axios.post(`/message`, {
            message,
            senderEmail:user?.email,
            receiverEmail: contact.email,
            conversationId: "",
            senderUID: user?.uid,
            receiverUID: contact.uid
        });
        console.log({
            message,
            senderEmail:"",
            receiverEmail: contact.email,
            conversationId: ""
        })
    }

    return(
        <span className="w-full flex items-center absolute bottom-0 bg-blue-gray-50 rounded-b-lg">
            <div className="w-full flex items-center ">
                <span className="w-full h-10">
                    <textarea 
                    onChange={(e)=>setMessage(e.target.value)}
                    className="w-full h-full m-0 border-t-2 p-2 rounded-bl-lg overflow-hidden resize-none"
                    placeholder="Enter your message here..."
                    />
                </span>
                <a href="#buttons-with-link">
                <Tooltip content="Send" placement="top">
                    <Button onClick={sendMessage} className="rounded-b-lg !rounded-l-none rounded-tr-none p-2 hover:text-green-600 hover:bg-green-200">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                        </svg>
                    </Button>
                </Tooltip>
                </a>
            </div>

        </span>
    )
}

function MessageBody() {

    return(
        <div className="py-12 overflow-auto">

            {/* <span className="flex items-center justify-center ">
                <hr className="w-1/3 mx-3 border"/>
                <p className="text-xs">October 20, 2023</p>
                <hr className="w-1/3 mx-3 border"/>
            </span> */}

            <div className="container flex">
                <Tooltip content="18:41" placement="right-end">
                    <div className="w-auto h-auto py-1 px-2 m-px bg-gray-300 rounded-xl rounded-l-lg">
                        <p className="text-black text-sm">This is a message from others</p>
                    </div>
                </Tooltip>
            </div>
            <div className="container flex">
                <Tooltip content="18:42" placement="right-end">
                    <div className="w-auto h-auto py-1 px-2 m-px bg-gray-300 rounded-xl rounded-tl-lg rounded-bl-sm">
                        <p className="text-black text-sm">This is a message from others</p>
                    </div>
                </Tooltip>
            </div>

            <div className="container flex justify-end">
                <Tooltip content="18:42" placement="left-end">
                    <div className="w-auto h-auto py-1 px-2 m-px bg-green-500 rounded-xl rounded-r-lg">
                        <p className="text-white text-sm">This is a message from me</p>
                    </div>
                </Tooltip>
            </div>
            <div className="container flex justify-end">
                <Tooltip content="18:43" placement="right-end">
                    <div className="w-auto h-auto py-1 px-2 m-px bg-green-500 rounded-xl rounded-tr-lg rounded-br-sm">
                        <p className="text-white text-sm">Helloasdfsdfasdf</p>
                    </div>
                </Tooltip>
            </div>
            <div className="container flex">
                <Tooltip content="18:41" placement="right-end">
                    <div className="w-auto h-auto py-1 px-2 m-px bg-gray-300 rounded-xl rounded-l-lg">
                        <p className="text-black text-sm">This is a message from others</p>
                    </div>
                </Tooltip>
            </div>
            <div className="container flex">
                <Tooltip content="18:42" placement="right-end">
                    <div className="w-auto h-auto py-1 px-2 m-px bg-gray-300 rounded-xl rounded-tl-lg rounded-bl-sm">
                        <p className="text-black text-sm">This is a message from others</p>
                    </div>
                </Tooltip>
            </div>

            <div className="container flex justify-end">
                <Tooltip content="18:42" placement="left-end">
                    <div className="w-auto h-auto py-1 px-2 m-px bg-green-500 rounded-xl rounded-r-lg">
                        <p className="text-white text-sm">This is a message from me</p>
                    </div>
                </Tooltip>
            </div>
            <div className="container flex justify-end">
                <Tooltip content="18:43" placement="right-end">
                    <div className="w-auto h-auto py-1 px-2 m-px bg-green-500 rounded-xl rounded-tr-lg rounded-br-sm">
                        <p className="text-white text-sm">Helloasdfsdfasdf</p>
                    </div>
                </Tooltip>
            </div>
            
            
            
        </div>
    )
}

export default function MessageView({contact}: {contact:{
    name:string, 
    photoURL:string,
    email:string
    uid:string
}}) {
  return (
    <Card className="w-full">
        <MessageViewHeader contact={contact}/>
         <MessageBody/>
        <MessageViewFooter contact={contact}/>   
    </Card>
  )
}

