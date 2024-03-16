import useClaim from '@hooks/use_claim';
import Form from '.';
import Skeleton from 'react-loading-skeleton';
import { ClaimableAccount } from 'src/interfaces';
import { useIntl } from 'react-intl';

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
}: {
  claimableAccount: ClaimableAccount | null;
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
              {claimableAccount.hasClaimed
                ? 'APOLLO amount claimed'
                : 'Unfortunately, you have not claimed your APOLLO'}
            </span>
            <span className="font-extrabold text-3xl md:text-4xl lg:text-5xl">
              {intl.formatNumber(claimableAccount.balance, {
                maximumFractionDigits: 4,
              })}
            </span>
          </div>
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
        Connect your wallet to see how much APOLLO you are eligible for.
      </p>
    </>
  );
}

function ClaimData() {
  const { loading, claimableAccount } = useClaim();

  return (
    <>
      {loading ? (
        <ClaimFormLoading />
      ) : (
        <div className="text-center">
          <AccountData claimableAccount={claimableAccount} />
        </div>
      )}
    </>
  );
}

export default function ClaimForm() {
  return (
    <div className="flex flex-col gap-y-28">
      <span className="font-semibold text-center text-grey">
        Claiming period ended. Stay tuned!
      </span>
      <Form>
        <ClaimData />
      </Form>
    </div>
  );
}
