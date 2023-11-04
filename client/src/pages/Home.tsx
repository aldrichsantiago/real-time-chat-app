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

function Home() {
  const navigate = useNavigate();
  const { setUser, user }: UseUserProps = useUser();
  const [selectedMessage, setSelectedMessage] = useState<any>('')
  const [contact, setContact] = useState<any>({})


  const selectConversation = (id:string) => {               
    console.log(id)
    setSelectedMessage(id)
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
      receiverEmail: contact.email,
      conversationId: selectedMessage,
      senderUID: user?.uid,
      receiverUID: contact.uid
    });
    console.log({
      message,
      senderEmail:user?.email,
      receiverEmail: contact.email,
      conversationId: selectedMessage,
      senderUID: user?.uid,
      receiverUID: contact.uid
    })
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
      <MessageView
      contact={contact}
      sendMessage={sendMessage}
      selectedMessage={selectedMessage}
      />
    </div>
  )
}

export default Home