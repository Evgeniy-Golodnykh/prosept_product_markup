import React from 'react';

import './Footer.css';

import { copyrightProsept } from '../../utils/constants';

function Footer() {

  return (
    <footer className='footer'>
      <p className='footer__copyright'>{copyrightProsept}</p>
    </footer>
  )
};

export default Footer;
