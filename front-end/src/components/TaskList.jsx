import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import CloseButton from 'react-bootstrap/CloseButton';
import { apiDelete } from '../services/axiosAPI';

export default function TaskList({ tasks, changeButton }) {
  const [errors, setErrors] = useState([]);

  const handleClick = async (id) => {
    try {
      await apiDelete(`/tasks/${id}`);
      changeButton();
    } catch (error) {
      setErrors(error);
    }
  };

  return (
    <>
      {tasks.map((task) => (
        <Card key={task.id} style={{ width: '18rem' }}>
          <Card.Header>
            <CloseButton onClick={() => handleClick(task.id)} />
          </Card.Header>
          <Card.Body>
            <Card.Title>{task.title}</Card.Title>
            <Card.Text>{task.description}</Card.Text>
            <small className="text-muted">{task.status}</small>
          </Card.Body>
          {errors && <div>{errors}</div>}
        </Card>
      ))}
    </>
  );
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      status: PropTypes.string.isRequired,
    }),
  ).isRequired,
  changeButton: PropTypes.func.isRequired,
};
