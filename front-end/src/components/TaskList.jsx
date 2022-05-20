import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';
import { apiDelete, apiUpdate } from '../services';
import formatDate from '../services/constants';

export default function TaskList({ tasks, changeButton }) {
  const [errors, setErrors] = useState([]);

  const deleteTask = async (id) => {
    try {
      await apiDelete('/tasks', id);
      changeButton();
    } catch (error) {
      setErrors(error);
    }
  };

  const startTask = async (id, title) => {
    const data = {
      title,
      status: 'Começada',
      startedAt: new Date().toISOString(),
    };
    try {
      await apiUpdate('/tasks', id, data);
      changeButton();
    } catch (error) {
      setErrors(error);
    }
  };

  const completedTask = async (id, title) => {
    const data = {
      title,
      status: 'Concluída',
      finishedAt: new Date().toISOString(),
    };
    try {
      await apiUpdate('/tasks', id, data);
      changeButton();
    } catch (error) {
      setErrors(error);
    }
  };

  return (
    <>
      {tasks.map((task) => (
        <Card key={task.id}>
          <Card.Header>
            <div>
              <Button
                disabled={task.startedAt}
                onClick={() => startTask(task.id, task.title)}
              >
                Começar
              </Button>
              <Button
                disabled={task.finishedAt}
                onClick={() => completedTask(task.id, task.title)}
              >
                Finalizar
              </Button>
            </div>
            <CloseButton onClick={() => deleteTask(task.id)} />
          </Card.Header>
          <Card.Body>
            <Card.Title>{task.title}</Card.Title>
            <Card.Text>{task.description}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <Card.Text>{task.status}</Card.Text>
            <Card.Subtitle className="text-muted">
              {`Criada em: ${formatDate(
                task.createdAt,
              )}`}

            </Card.Subtitle>
            <Card.Subtitle className="text-muted">
              {`Começada em: ${formatDate(
                task.startedAt,
              )}`}

            </Card.Subtitle>
            <Card.Subtitle className="text-muted">
              {`Finalizada em: ${formatDate(
                task.finishedAt,
              )}`}

            </Card.Subtitle>
          </Card.Footer>
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
