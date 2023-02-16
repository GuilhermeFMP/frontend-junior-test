import React from 'react';
import Form from '../components/Form';
import Header from '../components/Header';

function EditToken() {
  return(
    <div>
      <Header />
      <Form name='Edit Token' remove />
    </div>
  );
}

export default EditToken;
