import React from 'react';
import ShootingStar from '../assets/shooting-star.svg';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

function Header(props) {
  const { button } = props;
  const history = useHistory();

  return(
    <div className='header'>
      <div>
        <img src={ ShootingStar } alt='Shotting Star'/>
        <h1><strong>Wish Wallet</strong></h1>
      </div>
      <div>
        { button && <Button className='button' variant="primary" onClick={ () => history.push('/add-token') }><strong>Add Token</strong></Button>}
      </div>
    </div>
  );
}

export default Header;