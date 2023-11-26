import { signOut } from "firebase/auth";
import MessageView from "../components/MessageView"
import Sidebar from "../components/Sidebar"
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import { UseUserProps } from "../context/UserProvider";
import useUser from "../hooks/useUser";
import { toast } from 'react-toastify';
import { useState } from 'react'
import axios from "../api/axios";
import { io } from "socket.io-client";

export const socket = io(`${import.meta.env.VITE_API_URL}`)

function Home() {
  const navigate = useNavigate();
  const { setUser, user }: UseUserProps = useUser();
  const [selectedMessage, setSelectedMessage] = useState<any>('')
  const [contact, setContact] = useState<any>(null)


  const selectConversation = (id:string) => {               
    setSelectedMessage(id)
    axios.post(`/users/get-members`, {
      uid: user?.uid,
      conversationName: id
    })
    .then(res => setContact(res.data))
    .catch(err => console.log(err))
    socket.emit('join-conversation', id)
  }

  const setNewContact = (data:{}) => {               
    console.log(data)
    setContact(data)
  }

  const sendMessage = async(e: React.FormEvent, message: string) => {
    e.preventDefault();
    const res = await axios.post(`/message`, {
      message,
      senderEmail:user?.email,
      conversationName: selectedMessage,
    });
    console.log(res?.data)
    socket.emit('send-message', message, selectedMessage)
  }
  
  const notify = (message:string) => 
  toast.success(message, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });

  const handleLogout = () => {         
    signOut(auth).then(() => {
    // Sign-out successful.
        navigate("/");
      setUser? setUser({}) : console.log("NO USER")
      localStorage.setItem("user",JSON.stringify({}))
      console.log("Signed out successfully")
      notify("Signed out successfully")
    }).catch((error) => {
    // An error happened.
    console.log(error);
    });
  }

  return (
    <div className="h-screen p-4 flex gap-4">
      <Sidebar 
      handleLogout={handleLogout} 
      selectConversation={selectConversation}
      setNewContact={setNewContact}
      />
      {
      contact ? 
      <MessageView
      contact={contact}
      sendMessage={sendMessage}
      selectedMessage={selectedMessage}
      />
       : 
      <div className="flex items-center justify-center">
        <h1 className="text-4xl">No Conversation Selected</h1>
      </div>
       }
      
    </div>
  )
}

export default Home