import { useState } from 'react';
import ArrowIcon from './ArrowIcon';
import { colors, breakPoints, fonts } from '../styles/theme';

const FooterMenu = ({ title, children, isConnectArea }) => {
  const [open, setOpen] = useState(isConnectArea);

  const toggleCollapse = () => {
    setOpen(!open);
  };

  return (
    <nav className="footer-menu">
      <div className="title-container collapseTrigger" onClick={toggleCollapse}>
        <div className="arrow-wrapper" aria-hidden="true">
          <ArrowIcon color={colors.textred} width={20} open={open} />
        </div>
        <h3 className="footer-title">{title}</h3>
      </div>
      <ul className={`footer-items collapsible ${open ? '' : 'hideOnMobile'}`}>{children}</ul>

      <style jsx>{`
        .footer-menu {
          height: 200px;
        }

        .arrow-wrapper {
          line-height: 1.7;
          display: none;
        }

        .footer-title {
          cursor: pointer;
          display: inline-block;
          font-family: ${fonts.heading};
          font-weight: normal;
          font-size: 2.6rem;
        }

        .footer-items {
          line-height: 3;
        }

        @media only screen and (max-width: ${breakPoints.bp_md}) {
          .footer-title {
            margin-left: 10px;
            font-size: 3rem;
          }

          .footer-menu {
            width: 80%;
            height: auto;
            margin-bottom: 30px;
          }

          .arrow-wrapper {
            display: flex;
            align-items: center;
          }

          .title-container {
            width: 100%;
            border-bottom: 1px solid rgb(${colors.textred});
            display: flex;
          }

          .footer-items {
            font-size: 2rem;
            line-height: 4;
          }
        }

        @media only screen and (max-width: ${breakPoints.bp_small}) {
          .footer-menu {
            width: 100%;
          }
        }
      `}</style>
    </nav>
  );
};

export default FooterMenu;
