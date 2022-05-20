/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import { apiPost } from '../services/axiosAPI';

export default function TaskForm({ changeButton }) {
  const [errorMessage, setErrorMessage] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
      status: 'Em progresso',
    },
  }, []);

  const onSubmit = async (data) => {
    try {
      await apiPost('/tasks', data);
      changeButton();
    } catch (error) {
      setErrorMessage(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group controlId="formTaskTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          {...register('title', { required: true })}
        />
        {errors.title && <div>{errors.title.message}</div>}
      </Form.Group>
      <Form.Group controlId="formTaskDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          {...register('description', { required: true })}
        />
        {errors.description && <div>{errors.description.message}</div>}
      </Form.Group>
      <Form.Group>
        <Button variant="primary" type="submit" disabled={!isValid}>
          ADICIONAR
        </Button>
        {errorMessage.length > 0 && <div>{errorMessage}</div>}
      </Form.Group>
    </Form>
  );
}

TaskForm.propTypes = {
  changeButton: PropTypes.func.isRequired,
};
