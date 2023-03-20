import { useEffect, useState } from "react";
import {ToastContainer, toast} from "react-toastify";
import Task from "./Task";
import TaskForm from "./TaskForm";
import TaskHookForm from "./TaskHookForm";
import PeopleForm from "./PeopleForm";
import { initialTasks, initialTeam } from "./data";

import "./app.css";
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [team, setTeam] = useState(initialTeam);

  function handleTaskSubmit(yeniTask) {
    setTasks([yeniTask, ...tasks])
  }

  function handlePeopleSubmit(yeniKisi) {
    setTeam([...team, yeniKisi])
  }

  function handleComplete(id) {
    /* setTasks(...tasks, tasks.id) */
    console.log(tasks);
    const selectedTask= tasks.filter(e =>{
      return e.id === id;
    })
    selectedTask[0].status = "yapıldı"
    setTasks([...tasks, selectedTask]);
    setTimeout(()=>{
      toast.success('Görev tamamlandı', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    },100)
   
  }
  useEffect(()=>{    
    toast('Görev ekleyebilirsiniz', {   
      autoClose: 2000,
      theme: "dark",
   });
  },[])

  return (
    <div className="app">
      <div className="formColumn">
        <div className="form-container">
          <h2>Yeni Task</h2>
          {/* {<TaskForm kisiler={team} submitFn={handleTaskSubmit} />} */}
          <TaskHookForm kisiler={team} submitFn={handleTaskSubmit} />
        </div>

        <div className="form-container">
          <h2>Yeni Kişi</h2>
          <PeopleForm kisiler={team} submitFn={handlePeopleSubmit} />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <h2 className="column-title">Yapılacaklar</h2>
          <div className="column-list">
            {tasks
              .filter((t) => t.status === "yapılacak")
              .map((t) => (
                <Task key={t.id} taskObj={t} onComplete={handleComplete} />
              ))}
          </div>
        </div>
        <div className="column">
          <h2 className="column-title">Tamamlananlar</h2>
          <div className="column-list">
            {tasks
              .filter((t) => t.status === "yapıldı")
              .map((t) => (
                <Task key={t.id} taskObj={t} />
              ))}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
