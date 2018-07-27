import Link from 'next/link';
import { GlobalContext } from './globalContext';

const Nav = () => (
  <GlobalContext.Consumer>
    {context => (
      <div className="nav">
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/examples">
          <a>Examples</a>
        </Link>
        <span>{context.userLogged}</span>
        <style jsx>{`
          a {
            margin-right: 15px;
          }
        `}</style>
      </div>
    )}
  </GlobalContext.Consumer>
);

export default Nav;
