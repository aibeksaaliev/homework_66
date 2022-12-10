import React from 'react';
import {Container} from "react-bootstrap";
import {Link} from "react-router-dom";

const Layout: React.FC<React.PropsWithChildren> = ({children}) => {
  return (
    <>
      <header className="bg-dark p-3">
        <Link to="/" className="text-decoration-none">
          <h1 className="text-center fw-bold text-white text-uppercase">Calories Tracker</h1>
        </Link>
      </header>
      <main>
        <Container>
          {children}
        </Container>
      </main>
      <footer>

      </footer>
    </>
  );
};

export default Layout;