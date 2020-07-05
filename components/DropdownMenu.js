import { useState } from 'react';
import Link from 'next/link';

import { fonts } from '../styles/theme';

const DropdownMenu = ({ children, trigger, rightMargin, leftMargin }) => {
  const [open, setOpen] = useState(false);

  // When openeing the menu on touch devices we set an event listener to the
  // document that closes it on click
  const openDropdown = () => {
    setOpen(true);
    document.addEventListener('click', () => closeDropdown());
  };

  const closeDropdown = () => {
    setOpen(false);
    document.removeEventListener('click', () => setOpen(false));
  };

  // On desktop we the menu opens and closes with hover state, so no event handlers
  // are needed.
  const onEnter = () => {
    console.log('onEnter');
    setOpen(true);
  };

  const onLeave = () => {
    console.log('onLeave');
    setOpen(false);
  };

  // For touchscreen-devices
  const onTouch = (e) => {
    console.log('onTouch');
    if (open) {
      closeDropdown();
    } else {
      openDropdown();
    }
  };

  return (
    <li
      className={`nav-item dropdown${rightMargin ? ' right-margin' : ''}${
        leftMargin ? ' left-margin' : ''
      }`}
      onMouseLeave={onLeave}
    >
      <div onMouseEnter={onEnter} onTouchStart={onTouch} onTouchEnd={(e) => e.preventDefault()}>
        {trigger}
      </div>
      {open && children}

      <style jsx>{`
        /* Style whatever my be passed as trigger. Children are styled in parent component: */
        .nav-item {
          font-family: ${fonts.heading};
        }

        .right-margin {
          margin-right: 3rem;
        }

        .left-margin {
          margin-left: 3rem;
        }
      `}</style>
    </li>
  );
};

export default DropdownMenu;
