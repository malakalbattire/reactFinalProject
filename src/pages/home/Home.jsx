import Categories from '../categories/Categories';
import { useContext } from 'react';
import { UserContext } from '../../context/User';
import Hero from '../hero/Hero';
import { NavLink } from 'react-router-dom';
import { BiSolidUser } from 'react-icons/bi';

export default function Home() {
  const { userName } = useContext(UserContext);

  return (
    <div className="padBottom home">
      <div
        className="container d-flex flex-column gap-3
   "
      >
        {userName ? (
          <>
            <NavLink className="navLinkk " to="/profile">
              <h2 className="p-3 text-capitalize d-flex align-items-center text-decoration-none">
                <BiSolidUser />
                Hello {userName}!
              </h2>
            </NavLink>
          </>
        ) : (
          <></>
        )}
        <Hero />

        <div className=" container" align="center">
          <Categories></Categories>
        </div>
      </div>
    </div>
  );
}
