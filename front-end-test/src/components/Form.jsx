import React, { useEffect, useState } from 'react';
import { Alert, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function Form(props) {
  const { name, remove } = props;
  const history = useHistory();
  const [ token, setToken ] = useState('');
  const [ balance, setBalance ] = useState('');
  const [ editToken, setEditToken ] = useState({})
  const [ disabled, setDisabled ] = useState(true);
  const [ show, setShow ] = useState(false);
  const [ certainty, setCertainty ] = useState(false);

  useEffect(() => {
    const path = history.location.pathname;
    if(path === '/edit-token') {
      const tokenId = JSON.parse(localStorage.getItem('TokenEdit'));
      const storage = JSON.parse(localStorage.getItem('userTokens'));
      const token = storage.filter((tok) => tok.id === tokenId);
      setEditToken(token)
      setToken(token[0].name)
      setBalance(token[0].value)
    }
  }, [])

  useEffect(() => {
    if(token.length > 0 && balance.length > 0) {
      setDisabled(false)
    } else {
      setDisabled(true)
    };
  }, [token, balance])

  const balanceChange = ({target}) => {
    const value = target.value;
    const regex = /^[0-9.,]+$/
    const validation = value.length === 0 ? true : regex.test(value);
    const maxlength = 12;
    if (validation && value.length < maxlength) {
      setBalance(value)
    }
  }

  const saveToken = () => {
    const storage = JSON.parse(localStorage.getItem('userTokens')) || [];
    const newToken = {
      id: uuidv4(),
      name: token,
      value: balance,
    };
    const newStorage = [...storage, newToken];
    localStorage.setItem('userTokens', JSON.stringify(newStorage));
    history.push('/');
  }

  const reSaveToken = () => {
    const storage = JSON.parse(localStorage.getItem('userTokens'));
    const tokens = storage.filter((token) => token.id !== editToken[0].id)
    const newToken = {
      id: editToken[0].id,
      name: token,
      value: balance,
    };
    const newStorage = [...tokens, newToken];
    localStorage.setItem('userTokens', JSON.stringify(newStorage));
    history.push('/');
  }

  const verifyToken = () => {
    const path = history.location.pathname;
    if(path === '/edit-token') {
      reSaveToken()
    } else {
      const storage = JSON.parse(localStorage.getItem('userTokens')) || [];
      const tokenIsDuplicated = storage.some(({ name }) => name === token);
      if(tokenIsDuplicated) {
        setShow(true);
      } else {
        saveToken()
      }
    }
  }

  const removeButton = () => {
    const storage = JSON.parse(localStorage.getItem('userTokens'));
    const tokens = storage.filter((token) => token.id !== editToken[0].id);
    localStorage.setItem('userTokens', JSON.stringify(tokens));
    history.push('/');
  }

  return(
    <div className='form'>
      { show 
        && (
          <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>Token Name Error!</Alert.Heading>
          <p>
            The Token already exist, please choose another name for the Token.
          </p>
        </Alert>
      )}
      { certainty
        && (
          <Alert show={certainty} variant="warning">
        <Alert.Heading>Are you sure about this?</Alert.Heading>
        <p>
          This action is irreversible and you will lose your token. Are you sure?
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={ removeButton } variant="outline-success">
            Yes
          </Button>
          <Button className="no-button" onClick={() => setCertainty(false)} variant="outline-danger">
            No
          </Button>
        </div>
      </Alert>
        ) }
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
              maxLength="6"
              required
            />
          </label>
          <label htmlFor='balance'>
            Balance
            <input
              type="text"
              name="number"
              id="balance"
              value={ balance }
              onChange={ balanceChange }
              min="1"
              max="5"
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
            onClick={ () => setCertainty(true) }
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