import React from 'react';
import { Button } from 'react-bootstrap';

function Form(props) {
  const { name, remove } = props;
  return(
    <div className='form'>
      <div className='form-header'>
        <h1>{ name }</h1>
        <Button
          className='back-button'
          variant='secondary'
          size="sm"
          onClick={ () => {  } }
        >
          <strong>Voltar</strong>
        </Button>
      </div>
        <form className='form-inputs'>
          <label htmlFor='token-input'>
            Token
            <input
              type="text"
              name="text"
              id="token-input"
              placeholder='Token Name'
              required
            />
          </label>
          <label htmlFor='balance-input'>
            Balance
            <input
              type="number"
              name="number"
              id="balance-input"
              placeholder='Balance Value'
              required
            />
          </label>
        </form>
      <div className={ remove ? 'form-buttons' : 'form-button' }>
        { remove 
          && (
          <Button
            className='remove-button'
            variant="danger"
            size="sm"
            onClick={ () => {} }
          >
            <strong>Remove</strong>
          </Button>
          )
        }
        <Button
          className='button'
          variant="primary"
          size="sm"
          onClick={ () => {} }
        >
          <strong>Save</strong>
        </Button>
      </div>
    </div>
  );
}

export default Form;