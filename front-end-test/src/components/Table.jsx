import React from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

function Table() {
  const storage = JSON.parse(localStorage.getItem('userTokens')) || [];
  const history = useHistory();
  return(
    <div className='table-container'>
      <div className='tr-container'>
        <span className='token-text'>Token</span>
        <span className='balance-text'>Balance</span>
      </div>
      <div className='tokens-list'>
        { storage.map((token, index) => (
          <div className='token-container' key={ index }>
            <div className='button-and-span'>
              <button
                id='edit-button'
                type="button"
                onClick={ () => history.push('/edit-token') }
              >
                <FontAwesomeIcon id="icon" icon={ faPenToSquare } />
              </button>
              <span className='token-name'>{ token.name }</span>
            </div>
            <span className='balance-number'>{ token.value }</span>
          </div>
        )) }
      </div>
    </div>
  );
}

export default Table;