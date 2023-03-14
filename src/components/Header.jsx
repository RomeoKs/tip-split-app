import React from 'react';

import logo from "../../src/images/logo.svg";

export function Header() {
  return (
    <header className="header page__section">
      <div className="header__logo">
        <div className="logo">
          <a
            href="/#"
            className="logo__link"
          >
            <img
              className="logo__img"
              src={logo}
              alt="Logo Splitter"
            />
          </a>
        </div>
      </div>
    </header>
  );
}