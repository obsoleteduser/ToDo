import React from 'react'
import './footer.css'

export const Footer = () => {
  return (
    <footer className='footer'>
        <span>© {new Date().getFullYear()} ToDo App built by Tahir Dibirov II, All Rights Reserved</span>
    </footer>
  )
}
