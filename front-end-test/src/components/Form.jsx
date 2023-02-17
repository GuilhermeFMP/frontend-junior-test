import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

function Form(props) {
  const [ token, setToken ] = useState('');
  const [ balance, setBalance ] = useState('');
  const [ disabled, setDisabled ] = useState(true);
  const { name, remove } = props;
  const history = useHistory();

  const saveToken = () => {
    const storage = JSON.parse(localStorage.getItem('userTokens')) || [];
    const newToken = {
      name: token,
      value: balance,
    };
    const newStorage = [...storage, newToken];
    localStorage.setItem('userTokens', JSON.stringify(newStorage));
    history.push('/');
  }

  const verifyToken = () => {
    const storage = JSON.parse(localStorage.getItem('userTokens')) || [];
    const tokenIsDuplicated = storage.some(({ name }) => name === token);
    if(tokenIsDuplicated) {
      alert('The Token already exist, please choose another name for the Token.')
    } else {
      saveToken()
    }
  }

  useEffect(() => {
    if(token.length > 0 && balance.length > 0) {
      setDisabled(false)
    } else {
      setDisabled(true)
    };
  }, [token, balance])

  return(
    <div className='form'>
      <div className='form-header'>
        <h1>{ name }</h1>
        <Button
          className='back-button'
          variant='secondary'
          size="sm"
          onClick={ () => history.push('/') }
        >
          <strong>Voltar</strong>
        </Button>
      </div>
        <form className='form-inputs'>
          <label htmlFor='token'>
            Token
            <input
              type="text"
              name="text"
              id="token"
              value={ token }
              onChange={ ({ target }) => setToken(target.value.toLocaleUpperCase()) }
              placeholder='Token Name'
              required
            />
          </label>
          <label htmlFor='balance'>
            Balance
            <input
              type="number"
              name="number"
              id="balance"
              value={ balance }
              onChange={ ({ target }) => setBalance(target.value) }
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
          onClick={ verifyToken }
          disabled={ disabled }
        >
          <strong>Save</strong>
        </Button>
      </div>
    </div>
  );
}

export default Form;