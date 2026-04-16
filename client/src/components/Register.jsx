import React,{useState} from 'react'
import API from '../api/axios'

export default function Register() {
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [mobile,setMobile]=useState("")

    function handleRegister(e){
        e.preventDefault()
        API.post("/auth/register",{name,email,password,mobile:Number(mobile)})
            .then((res)=>{
                console.log(res)
                if(res.status==201){
                    alert("Registration Successfully")
                }
            })
            .catch(err=>{
                console.log(err)
            })
    }

    return (
        <div className='container d-flex justify-content-center align-items-center vh-100'>
            <div className='row w-100 justify-content-center'>
                
                <form onSubmit={handleRegister} className='col-12 col-md-6 col-lg-4 shadow p-4 rounded bg-light'>
                    
                    <div className='mb-3 text-center'>
                        <h1>Register</h1>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input 
                            type="text" 
                            className="form-control"
                            onChange={(e)=>setName(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input 
                            type="email" 
                            className="form-control"
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input 
                            type="password" 
                            className="form-control"
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Mobile Number</label>
                        <input 
                            type="text" 
                            className="form-control"
                            onChange={(e)=>setMobile(e.target.value)}
                        />
                    </div>
                    <button className='btn w-100' style={{ backgroundColor: 'orange', borderColor: 'orange', color: 'white' }}>Register</button>
                    
                </form>

            </div>
        </div>
    )
}