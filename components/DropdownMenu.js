import { useState } from 'react';

import { fonts } from '../styles/theme';

const DropdownMenu = ({ children, trigger, rightMargin, leftMargin }) => {
  const [open, setOpen] = useState(false);
  let [timeoutId, settimeoutId] = useState(null);

  // When opening the menu on touch devices we set an event listener to the
  // document that closes it on click
  const openDropdown = () => {
    setOpen(true);
    document.addEventListener('click', () => closeDropdown());
  };

  const closeDropdown = () => {
    setOpen(false);
    document.removeEventListener('click', () => setOpen(false));
  };

  // On desktop the menu opens and closes with hover state, so no event handlers
  // are needed.
  const onEnter = () => {
    setOpen(true);
  };

  const onLeave = () => {
    setOpen(false);
  };

  // For touchscreen-devices
  const onTouch = () => {
    if (open) {
      closeDropdown();
    } else {
      openDropdown();
    }
  };

  const onBlurHandler = () => {
    let newTimeout = setTimeout(() => {
      setOpen(false);
	});
	settimeoutId(newTimeout);
  };

  // If a child receives focus, do not close the popover.
  const onFocusHandler = () => {
	setOpen(true);
    clearTimeout(timeoutId);
  };

  return (
    <li
      className={`nav-item dropdown${rightMargin ? ' right-margin' : ''}${
        leftMargin ? ' left-margin' : ''
      }`}
      onMouseLeave={onLeave}
	  onFocus={onFocusHandler}
      onBlur={onBlurHandler}
    >
      <div onMouseEnter={onEnter} onTouchStart={onTouch} onTouchEnd={(e) => e.preventDefault()}>
        {trigger}
      </div>
      {open && children}

      <style jsx>{`
        /* Style whatever is passed as trigger. Children are styled in parent component: */
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
