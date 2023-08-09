import { GettingStartedIcon, GetKgtinIcon, KgirsLogo } from '../Icons';
import Link from 'next/link';
export const Header = () => {
  return (
    <div className="w-full font-serif mt-10">
      <div className="lg:flex md:flex justify-between items-center">
        <div className="lg:pl-20 pl-4 w-full">
          <KgirsLogo />
        </div>
        <div className="flex lg:w-1/2 mt-4 lg:mt-0 md:mt-0 pl-4 w-full items-center  justify-between  font-medium font-sans">
          <ul className="flex items-center w-full px-1">
            <GettingStartedIcon />
            <li className="list-none ml-2">Getting Started</li>
          </ul>
          <Link legacyBehavior href="https://irs.kg.gov.ng/kgtin-popup/">
            <a className="flex items-center w-full px-2">
              <GetKgtinIcon />
              <li className="list-none ml-2">Don’t have KGTIN? Get KGTIN</li>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
