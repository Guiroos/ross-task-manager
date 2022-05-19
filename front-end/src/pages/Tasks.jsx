import React, { useEffect, useState } from 'react';
import { apiGet } from '../services/axiosAPI';
import { TaskForm, TaskList } from '../components';

export default function Tasks() {
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);

  const changeButton = () => {
    setButtonClicked(!buttonClicked);
  };

  useEffect(() => {
    const asyncFunc = async () => {
      setIsLoading(true);
      const response = await apiGet('/tasks');
      setTasks(response.data);
      setIsLoading(false);
    };
    asyncFunc();
  }, [buttonClicked]);

  const renderLoading = () => (
    <h1>Loading...</h1>
  );

  const renderTasks = () => (
    <>
      <div>
        <h1>Tasks</h1>
      </div>
      <div>
        <TaskForm changeButton={changeButton} />
      </div>
      <div className="tasks_list_container">
        <TaskList tasks={tasks} changeButton={changeButton} />
      </div>
    </>
  );

  return (
    <main>
      {!isLoading ? renderTasks() : renderLoading()}
    </main>
  );
}
