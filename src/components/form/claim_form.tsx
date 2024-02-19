import useClaim from '@hooks/use_claim';
import Form from '.';
import Skeleton from 'react-loading-skeleton';
import { ClaimableAccount } from 'src/interfaces';
import { useIntl } from 'react-intl';
import Countdown, {
  CountdownRenderProps,
  CountdownRendererFn,
} from 'react-countdown';

function ClaimFormLoading() {
  return (
    <>
      <Skeleton className="h-10" />
      <p className="mt-2">
        <Skeleton count={2} />
      </p>
      <Skeleton className="mt-8 h-32" />
      <Skeleton className="mt-8 h-10" />
    </>
  );
}

function AccountData({
  claimableAccount,
  claimApollo,
  claimLoading,
}: {
  claimableAccount: ClaimableAccount | null;
  claimApollo: () => void;
  claimLoading: boolean;
}) {
  const intl = useIntl();

  if (claimableAccount) {
    if (claimableAccount.balance > 0) {
      return (
        <>
          <h2 className="font-bold text-grey text-3xl md:text-4xl lg:text-5xl">
            Congrats!
          </h2>
          <p className="mt-5 text-base md:text-lg lg:text-xl">
            The connected account is eligible for the following amount of
            APOLLO.
          </p>
          <div className="bg-backgroundBody text-pinkText mt-8 rounded-3xl border-2 border-border p-8 flex flex-col items-center justify-center gap-y-2">
            <span className="font-medium text-base md:text-lg lg:text-xl">
              APOLLO Amount to claim
            </span>
            <span className="font-extrabold text-3xl md:text-4xl lg:text-5xl">
              {intl.formatNumber(claimableAccount.balance, {
                maximumFractionDigits: 4,
              })}
            </span>
          </div>
          {claimableAccount.hasClaimed ? (
            <div className="mt-10 w-full bg-backgroundBody rounded-3xl p-4 text-center">
              <span className="font-semibold text-grey">
                Allocation claimed!
              </span>
            </div>
          ) : (
            <button
              onClick={() => claimApollo()}
              disabled={claimLoading}
              className="outline-none mt-10 w-full bg-pinkButton rounded-3xl p-4 text-center"
            >
              <span className="font-semibold text-white">Claim</span>
            </button>
          )}
        </>
      );
    } else {
      return (
        <>
          <h2 className="font-bold text-grey text-3xl md:text-4xl lg:text-5xl">
            Claim APOLLO!
          </h2>
          <p className="mt-5 text-base md:text-lg lg:text-xl">
            Unfortunately, you are not eligible for APOLLO airdrop.
          </p>
        </>
      );
    }
  }

  return (
    <>
      <h2 className="font-bold text-grey text-3xl md:text-4xl lg:text-5xl">
        Claim APOLLO!
      </h2>
      <p className="mt-5 text-base md:text-lg lg:text-xl">
        Connect your wallet to see how much APOLLO you are eligible for and to
        confirm your presence.
      </p>
    </>
  );
}

function ClaimData() {
  const { loading, claimableAccount, claimApollo, claimLoading } = useClaim();

  return (
    <>
      {loading ? (
        <ClaimFormLoading />
      ) : (
        <div className="text-center">
          <AccountData
            claimableAccount={claimableAccount}
            claimApollo={claimApollo}
            claimLoading={claimLoading}
          />
        </div>
      )}
    </>
  );
}

export default function ClaimForm() {
  const countDownRenderer: CountdownRendererFn = ({
    formatted: { days, hours, minutes, seconds },
    completed,
  }: CountdownRenderProps) => {
    if (completed) {
      return (
        <div className="rounded-3xl py-2 px-4 text-center bg-grey">
          <span className="text-white font-medium text-center">
            Claiming period ended
          </span>
        </div>
      );
    }

    return (
      <div className="flex flex-col justify-center items-center gap-x-4">
        <span className="font-medium text-grey">Claiming period ends in:</span>
        <div className="rounded-3xl py-2 px-4 text-center bg-grey">
          <span className="text-white font-medium text-center text-sm">
            {days} days, {hours} hours, {minutes} minutes, {seconds} seconds
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-y-28">
      <Countdown date={1710511200000} renderer={countDownRenderer} />
      <Form>
        <ClaimData />
      </Form>
    </div>
  );
}
