import { Popover } from '@headlessui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Fragment } from 'react';
import { hexToString } from '@polkadot/util';
import { GovernancePollDetails } from 'src/interfaces';
import { ArrowLeftIcon, ShareIcon } from '@heroicons/react/24/outline';
import {
  LinkedinShareButton,
  LinkedinIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
} from 'react-share';
import { SITE_URL } from '@constants/index';

function Description({ description }: { description: string | undefined }) {
  if (description) {
    if (description.startsWith('0x')) {
      description = hexToString(description);
    }
    const lines = description.split('\n');

    return (
      <p className="my-6 text-xs text-grey2 lg:text-sm">
        {lines.map((line, index) => (
          <Fragment key={index}>
            {line}
            <br />
          </Fragment>
        ))}
      </p>
    );
  }

  return null;
}

export default function PollDetails({ poll }: { poll: GovernancePollDetails }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className="md:col-span-2 lg:col-span-3">
      <div className="flex items-center justify-between">
        <span
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-sm text-grey font-medium cursor-pointer"
        >
          <ArrowLeftIcon className="mr-1 h-4" />
          Back
        </span>
        <Popover className="relative">
          <Popover.Button className="inline-flex items-center focus:outline-none">
            <ShareIcon className="text-grey h-4" />
            <span className="text-sm text-grey font-medium pl-2">Share</span>
          </Popover.Button>
          <Popover.Panel className="absolute -right-1/4 z-10 max-w-xs transform md:right-auto md:left-1/2 md:-translate-x-1/2">
            <div className="h-2" />
            <div className="overflow-hidden shadow-lg rounded-3xl">
              <div className="relative grid gap-y-4 bg-white p-5">
                <LinkedinShareButton
                  className="inline-flex items-center"
                  url={`${SITE_URL}${pathname}`}
                  source={`${SITE_URL}${pathname}`}
                  title={poll.title}
                  summary={poll.description}
                >
                  <LinkedinIcon size={30} round={true} />
                  <p className="text-sm font-medium text-grey pl-2 pr-4">
                    LinkedIn
                  </p>
                </LinkedinShareButton>
                <TelegramShareButton
                  className="inline-flex items-center"
                  url={`${SITE_URL}${pathname}`}
                  title={poll.title}
                >
                  <TelegramIcon size={30} round={true} />
                  <p className="text-sm font-medium text-grey pl-2 pr-4">
                    Telegram
                  </p>
                </TelegramShareButton>
                <TwitterShareButton
                  className="inline-flex items-center"
                  url={`${SITE_URL}${pathname}`}
                  title={poll.title}
                >
                  <TwitterIcon size={30} round={true} />
                  <p className="text-sm font-medium text-grey pl-2 pr-4">
                    Twitter
                  </p>
                </TwitterShareButton>
              </div>
            </div>
          </Popover.Panel>
        </Popover>
      </div>
      <div className="mt-8 px-4 py-1 bg-pinkBorder bg-opacity-20 rounded-3xl w-min">
        <span className="font-semibold capitalize text-pinkBorder">
          {poll.status}
        </span>
      </div>
      <h1 className="mt-4 text-grey font-bold text-lg">{poll.title}</h1>
      <Description description={poll.description} />
      <span className="text-sm text-grey text-center">
        <span className="pr-1 text-pinkBorder font-bold text-base">
          {'NOTE -'}
        </span>
        Once poll is finished, you are able to claim your tokens back.
      </span>
    </div>
  );
}
