import Image from 'next/image';
import Link from 'next/link';

import { Map } from 'components/Map';

export const Footer = () => {
  return (
    <footer>
      <div className="bg-secondary-600 flex flex-col h-[32rem] sm:h-[24rem] sm:flex-row">
        <nav className="wrapper text-white flex gap-x-6 flex-1">
          <div className="space-y-2 sm:ml-6">
            <h4 className="text-2xl font-bold pb-2">Контакти</h4>
            <Link href="tel:+380679362212">
              <a className="flex items-center gap-x-3 hover:opacity-80">
                <Image
                  src="/icons/common/phone.svg"
                  alt="phone"
                  width={24}
                  height={24}
                />
                +380679362212
              </a>
            </Link>

            <Link href="mailto:iv-antik7@ukr.net">
              <a className="flex items-center gap-x-3 hover:opacity-80">
                <Image
                  src="/icons/common/mail.svg"
                  alt="email"
                  width={24}
                  height={24}
                />
                iv-antik7@ukr.net
              </a>
            </Link>

            <Link href="https://ivantik.olx.ua/uk/#items">
              <a
                className="flex items-center gap-x-3 hover:opacity-80"
                target="_blank"
              >
                <Image
                  src="/icons/common/olx-logo.svg"
                  alt="email"
                  width={24}
                  height={24}
                />
                Мій профіль OLX
              </a>
            </Link>

            <em className="block pt-4">
              Львівська область,
              <br /> м. Рудки, Садова 30
            </em>
          </div>
        </nav>

        <div className="wrapper flex-1 w-full">
          <Map />
        </div>
      </div>

      <div className="bg-primary-500">
        <h4 className="wrapper text-center text-white">
          &copy; Ivantique 2023
        </h4>
      </div>
    </footer>
  );
};
