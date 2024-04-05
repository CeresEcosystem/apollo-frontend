import { Link } from 'react-router-dom';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { FaTelegramPlane, FaTwitter } from 'react-icons/fa';
import { IoChatboxSharp } from 'react-icons/io5';

const socials = [
  { href: 'https://t.me/cerestoken', icon: FaTelegramPlane },
  { href: 'https://twitter.com/TokenCeres', icon: FaTwitter },
  { href: 'https://t.me/ceres_polkaswap_bot', icon: IoChatboxSharp },
];

const links = [
  { href: '/privacy-policy', title: 'Privacy Policy', external: false },
  { href: '/terms-of-use', title: 'Terms of Use', external: false },
  {
    href: 'https://apollo-protocol.gitbook.io/apollo-protocol/get-started/what-is-apollo-protocol',
    title: 'Litepaper',
    external: true,
  },
];

const logos = ['/ceres.webp', '/demeter.webp', '/hermes.webp', '/apollo.webp'];

export default function Footer() {
  return (
    <div className="border-t-4 border-t-grey3 py-10 px-5 md:px-16">
      <div className="flex flex-col gap-y-8 max-w-[1740px] mx-auto">
        <div className="flex flex-col gap-y-8 gap-x-6 justify-between items-center sm:flex-row">
          <div className="max-w-md w-full flex flex-wrap justify-center gap-y-4 gap-x-10 sm:justify-start lg:gap-x-16">
            <div className="flex flex-col gap-y-5 items-center">
              <a href="https://polkaswap.io/#/swap" target="_blank">
                <img src="/polkaswap.webp" alt="polkaswap" />
              </a>
              <span className="text-grey font-medium text-xs">Follow us</span>
              <div className="flex gap-x-2">
                {socials.map(social => {
                  const Icon = social.icon;

                  return (
                    <a
                      key={social.href}
                      href={social.href}
                      target="_blank"
                      className="cursor-pointer bg-border bg-opacity-40 p-2 rounded-md"
                    >
                      <Icon className="text-xl text-grey text-center" />
                    </a>
                  );
                })}
              </div>
            </div>
            <ul
              role="list"
              className="flex flex-col gap-y-5 justify-center items-center"
            >
              {links.map(link => {
                if (link.external) {
                  return (
                    <a key={link.title} href={link.href} target="_blank">
                      <span className="text-grey text-sm font-medium flex gap-x-1">
                        {link.title}
                        <ArrowTopRightOnSquareIcon className="h-4 text-pinkText" />
                      </span>
                    </a>
                  );
                }

                return (
                  <Link
                    key={link.title}
                    to={link.href}
                    className="text-grey text-sm font-medium"
                  >
                    {link.title}
                  </Link>
                );
              })}
            </ul>
          </div>
          <span className="text-grey hidden text-center 2xl:block text-base">
            Copyright© 2024{' '}
            <a href="https://ceresblockchain.solutions/" target="_blank">
              <span className="text-pinkText">CBS LLC</span>
            </a>
            . All rights reserved.
          </span>
          <div className="max-w-md flex gap-x-4 w-full items-center justify-center sm:justify-end sm:gap-x-2 md:gap-x-6">
            {logos.map(logo => (
              <img
                key={logo}
                src={logo}
                alt={logo}
                className="h-12 xs:h-14 md:h-16 lg:h-20"
              />
            ))}
          </div>
        </div>
        <span className="text-grey text-xs text-center sm:text-sm md:text-base 2xl:hidden">
          Copyright© 2024{' '}
          <a href="https://ceresblockchain.solutions/" target="_blank">
            <span className="text-pinkText">CBS LLC</span>
          </a>
          . All rights reserved.
        </span>
      </div>
    </div>
  );
}
