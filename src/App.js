import React ,{useEffect,useState}from 'react';
import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';
import api from './Services/api';


function App() {
const [devs,setdevs]=useState([]);
const [github_username,setgithub_username]=useState('');
const [techs,settechs]=useState('');

const [latitude,setlatitude]=useState('');
const [longitude,setlongitude]=useState('');
useEffect(()=>{
  navigator.geolocation.getCurrentPosition(
    (position)=>{
      const {latitude,longitude}=position.coords;
      //document.getElementById('latitude').value=latitude;
       setlatitude(latitude);
       setlongitude(longitude);
    },(err)=>{
      console.log(err);
    },
    {
      timeout:30000,
    }
  )
},[]);

useEffect(()=>{
  async function loaddev(){
    const Response=await api.get('/sarch');
     
    
    setdevs(Response.data); 
  }
  loaddev();
},[]);
  async function handlAddDev(e){
    e.preventDefault();

    const response=await api.post("devs",{
      github_username,
      techs,
      latitude,
      longitude
    });

    setgithub_username('');
    settechs('');

  }
  return (
    <div id="app">
     <aside>
       <strong>cadastrar</strong>
       <form>
         <div className="input-block">
          <label htmlFor="github_username">usuário do github</label>
          <input type="text" name="github_username" id="username_github" required value={github_username} onChange={e=>setgithub_username(e.target.value)}/>
         </div>
         <div className="input-block">
        
          <label htmlFor="techs">tecnologias</label>
          <input type="text" name="techs" id="username_github" required value={techs} onChange={e=>settechs(e.target.value)}/>
         </div>
         <div className="input-block">
         <div className="input-group">
          <label htmlFor="latitude">latitude</label>
          <input type="number" name="latitude" id="latitude" required value={latitude} onChange={e=>setlatitude(e.target.value)}/>
         </div>
         <div className="input-group">
          <label htmlFor="longitude">longitude</label>
          <input type="number" name="longitude" id="longitude" required value={longitude} onChange={e=>setlongitude(e.target.value)}/>
         </div>
       </div> 
        <button type="submit">salvar</button>
       </form>

     </aside>
     <main>
      <ul>
        {devs.map(dev => (<li key={dev._id} className="dev-item">
           <header>
             <img src={dev.avatar_url} alt={dev.name}/>
             <div className="user-info">
               <strong>{dev.name} </strong>
               <span>devs.techs.join(', ')</span>

             </div>
           </header>
  <p>{dev.bio}</p>
          <a href={`https://github.com/${dev.github_username}`}>acessar perfil do github</a>
        </li>))}
        
      </ul>
     </main>

    </div>
  );
}

export default App;