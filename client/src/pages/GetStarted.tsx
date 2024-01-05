/* eslint-disable @typescript-eslint/no-explicit-any */
import {useState} from 'react' 
import { 
    Button, 
    Typography, 
    Dialog,
    DialogBody,
    Card,
    Input,
    Checkbox,
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
    IconButton,
   } from "@material-tailwind/react";

import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup  } from 'firebase/auth';
import { auth } from '../services/firebase';
import { UseUserProps } from '../context/UserProvider';
import useUser from '../hooks/useUser';
import { toast } from 'react-toastify';
import axios from '../api/axios';

type RegisterFormObj = {
    name:string,
    email:string,
    password:string
}
type LoginFormObj = {
    email:string,
    password:string
}

function GetStarted() {
    const [open, setOpen] = useState(false);
    const [registerForm, setRegisterForm] = useState<RegisterFormObj>({name:'', email:'', password:''})
    const [loginForm, setLoginForm] = useState<LoginFormObj>({email:'', password:''})
    const navigate = useNavigate();
    const { setUser }: UseUserProps = useUser();

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


    const provider = new GoogleAuthProvider();
    const loginWithGoogle = async() => {
        signInWithPopup(auth, provider)
        .then((result) => {
          console.log(result.user)

          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential?.accessToken;
          // The signed-in user info.
          const user = result.user;
          // IdP data available using getAdditionalUserInfo(result)
          // ...
          setUser? setUser({
            username: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            accessToken: token,
            uid: user.uid,
          })
          : 
          console.log("There is no user")
          localStorage.setItem("user",JSON.stringify({
            username: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            accessToken: token,
            uid: user.uid,
          }))

          navigate("/home")
          notify("Successfully Logged In")
          console.log(user)
          console.log(token)
          window.location.reload()

        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
          console.error(errorCode);
          console.error(errorMessage);
          console.error(email);
          console.error(credential);
          errNotify("Something Went Wrong");
          
        });
    }
 
    const onRegisterSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      await createUserWithEmailAndPassword(auth, registerForm.email, registerForm.password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            // ...
            axios.post(`/user`, {...registerForm, uid:user.uid})
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
            notify("Successfully Registered")
            window.location.reload()
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            errNotify(errorMessage);
            // ..
        });
        


    }

    const onLoginSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, loginForm.email, loginForm.password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;

            setUser? setUser({
                username: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
              })
              : 
              console.log("There is no user")
              localStorage.setItem("user",JSON.stringify({
                username: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
              }))
            
            navigate("/home")
            notify("Successfully Logged In")
            console.log(user);
            window.location.reload()

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
            errNotify(errorMessage);

        });
       
    }

    const onRegisterFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const eName = e.target.name
        const eValue = e.target.value
        const newFormData:any = { ...registerForm };
        newFormData[eName.toString()] = eValue;
        setRegisterForm(newFormData)
        console.log(newFormData);
        
    }
    const onLoginFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const eName = e.target.name
        const eValue = e.target.value
        const newFormData:any = { ...loginForm };
        newFormData[eName.toString()] = eValue;
        setLoginForm(newFormData)
        console.log(newFormData);
    }
 
    const handleOpen = () => setOpen(!open);

    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <Typography variant="h1" className="text-6xl my-3 text-center">
                Real-time Chat Application
            </Typography>
            <span>
                <Button onClick={handleOpen} size='lg' variant='gradient' color='blue'>Get Started</Button>
            </span>
            <div>
            <Dialog open={open} handler={handleOpen} size='sm'>
                <DialogBody className='flex flex-col items-center'>
                    <Card color="transparent" shadow={false}>
                        <Tabs value="LogIn">
                            <TabsHeader>
                                <Tab key={"LogIn"} value={"LogIn"}>
                                    Log In
                                </Tab>
                                <Tab key={"SignUp"} value={"SignUp"}>
                                    Sign Up
                                </Tab>
                            </TabsHeader>
                            <TabsBody>
                                <TabPanel key={"LogIn"} value={"LogIn"}>
                                    <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={onLoginSubmit}>
                                        <div className="mb-1 flex flex-col gap-6">
                                        
                                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                                            Email
                                        </Typography>
                                        <Input
                                            name='email'
                                            onChange={onLoginFormChange}
                                            size="lg"
                                            placeholder="johnsmith@email.com"
                                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                            labelProps={{
                                                className: "before:content-none after:content-none",
                                            }} crossOrigin={undefined}                            />
                                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                                            Password
                                        </Typography>
                                        <Input
                                            name='password'
                                            onChange={onLoginFormChange}
                                            type="password"
                                            size="lg"
                                            placeholder="********"
                                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                            labelProps={{
                                                className: "before:content-none after:content-none",
                                            }} crossOrigin={undefined}                            />
                                        </div>
                                        
                                        <Button type='submit' className="mt-6" fullWidth>
                                        Log in
                                        </Button>
                                    </form>
                                    <span className='flex items-center justify-center my-3'>
                                        <hr className='w-1/3'/>
                                        &nbsp;
                                        &nbsp;
                                        <p>or login with</p>
                                        &nbsp;
                                        &nbsp;
                                        <hr className='w-1/3'/>
                                    </span>
                                    <div className="flex justify-center gap-4">
                                        <IconButton onClick={loginWithGoogle} className="rounded bg-[#ea4335] hover:shadow-[#ea4335]/20 focus:shadow-[#ea4335]/20 active:shadow-[#ea4335]/10">
                                            <i className="fab fa-google text-lg" />
                                        </IconButton>
                                        
                                    </div>
                                </TabPanel>

                                
                                <TabPanel key={"SignUp"} value={"SignUp"}>
                                    <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={onRegisterSubmit}>
                                        <div className="mb-1 flex flex-col gap-6">
                                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                                            Your Name
                                        </Typography>
                                        <Input
                                            name='name'
                                            onChange={onRegisterFormChange}
                                            size="lg"
                                            placeholder="John Smith"
                                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                            labelProps={{
                                                className: "before:content-none after:content-none",
                                            }} crossOrigin={undefined}                            />
                                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                                            Your Email
                                        </Typography>
                                        <Input
                                            name='email'
                                            onChange={onRegisterFormChange}
                                            size="lg"
                                            placeholder="johnsmith@email.com"
                                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                            labelProps={{
                                                className: "before:content-none after:content-none",
                                            }} crossOrigin={undefined}                            />
                                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                                            Password
                                        </Typography>
                                        <Input
                                            name='password'
                                            onChange={onRegisterFormChange}
                                            type="password"
                                            size="lg"
                                            placeholder="********"
                                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                            labelProps={{
                                                className: "before:content-none after:content-none",
                                            }} crossOrigin={undefined}                            />
                                        </div>
                                        <Checkbox
                                            label={<Typography
                                                variant="small"
                                                color="gray"
                                                className="flex items-center font-normal"
                                            >
                                                I agree the
                                                <a
                                                    href="#"
                                                    className="font-medium transition-colors hover:text-gray-900"
                                                >
                                                    &nbsp;Terms and Conditions
                                                </a>
                                            </Typography>}
                                            containerProps={{ className: "-ml-2.5" }} crossOrigin={undefined}                            />
                                        <Button type='submit' className="mt-6" fullWidth>
                                        sign up
                                        </Button>
                                        <Typography color="gray" className="mt-4 text-center font-normal">
                                        Already have an account?{" "}
                                        <a href="#" className="font-medium text-gray-900">
                                            Sign In
                                        </a>
                                        </Typography>
                                    </form>
                                </TabPanel>
                            </TabsBody>
                        </Tabs>
                    </Card>
                </DialogBody>
            </Dialog>
            </div>
        </div>

    )
}

export default GetStarted