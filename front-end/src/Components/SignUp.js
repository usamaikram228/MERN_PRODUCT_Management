import React,{useState,useEffect}  from "react";
import{useNavigate}from 'react-router-dom';


const SignUp = ()=>{
    const [name,setName] = useState("") ;
    const [email,setEmail] = useState("") ;
    const [password,setPassword] = useState("") ;
    const navigate = useNavigate(); 

    useEffect(()=>
    {
        const auth = localStorage.getItem('user');
        if(auth)
        {
            navigate('/');
        }
    })
    const collectData=async()=>{
       let result = await fetch("http://localhost:5000/register",
       {
        method:'post',
        body:JSON.stringify({name,email,password}),
        headers:{
            'content-Type':'application/json'
        }
       })
       //console.log(result);
       
      if(result.ok)
      {
        const data = await result.json();
        console.warn(data);
        localStorage.setItem('user',JSON.stringify(data));
        navigate('/')
      }
      else{
        console.error("Error resistering user")
      }
      
    }
    return(
        <div className="sign_up_div">
            <h2>Register</h2>
            <input className="sign_up" type="text" value={name} onChange={(e)=>setName(e.target.value)} 
            placeholder="Enter name"/>
            <input className="sign_up" type="text" value={email} onChange={(e)=>setEmail(e.target.value)} 
            placeholder="Enter email"/>
            <input className="sign_up" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} 
            placeholder="Enter password"/>
            <button onClick={collectData} className="sign_up_button" type="submit">SignUp</button>
        </div>
    )
}
export default SignUp;