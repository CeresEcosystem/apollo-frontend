import Modal from '@components/modal';
import { useDisclaimerModal } from 'src/store';

export default function DisclaimerModal() {
  const { showDisclaimerModal, closeDisclaimerModal, setDisclaimerRead } =
    useDisclaimerModal(state => state);

  return (
    <Modal
      title={'Lending & Borrowing Disclaimer'}
      showModal={showDisclaimerModal}
      closeModal={() => {}}
      showCloseButton={false}
    >
      <div className="text-justify">
        <p>
          Before you proceed, it is imperative to carefully read and understand
          the following disclaimer:
        </p>
        <br />
        <p>
          <strong>Not Financial Advice: </strong> The information provided on
          our platform, including but not limited to interest rates, loan terms,
          and cryptocurrency valuations, is for informational purposes only. It
          should not be construed as financial advice. We do not provide
          personalized investment advice or recommendations regarding the
          suitability of any specific financial products.
        </p>
        <br />
        <p>
          <strong>Volatility Risk: </strong> Cryptocurrency markets are highly
          volatile. The value of cryptocurrencies can fluctuate dramatically
          within short periods. Lending or borrowing cryptocurrencies involves
          inherent risks, including but not limited to market volatility,
          liquidity risks, and potential loss of principal.
        </p>
        <br />
        <p>
          <strong>Regulatory Considerations: </strong> Regulatory environments
          for cryptocurrencies and related financial services vary across
          jurisdictions. Users are responsible for understanding and complying
          with the applicable laws, regulations, and tax implications in their
          respective jurisdictions. Our platform does not provide legal advice,
          and users should seek independent legal counsel if they have questions
          regarding regulatory compliance.
        </p>
        <br />
        <p>
          <strong>Counterparty Risk: </strong> Lending or borrowing
          cryptocurrencies involves counterparty risk. While our platform
          employs rigorous risk management practices and security measures,
          users should be aware that there is a risk of default by borrowers or
          platform service providers. We do not guarantee the performance or
          solvency of any borrowers or third-party service providers.
        </p>
        <br />
        <p>
          <strong>Security Risks: </strong> Despite our best efforts to maintain
          the security of our platform, cryptocurrencies and blockchain
          technologies are susceptible to hacking, cyberattacks, and other
          security breaches. Users should take appropriate precautions to
          safeguard their account credentials, private keys, and personal
          information.
        </p>
        <br />
        <p>
          <strong>Liquidity Risk: </strong> Our platform relies on liquidity
          provided by lenders and borrowers. There may be instances of limited
          liquidity or inability to execute trades at desired prices. Users
          should be prepared for potential delays or restrictions on withdrawals
          and loan repayments.
        </p>
        <br />
        <p>
          <strong>No Guarantees: </strong> We do not guarantee the availability
          of loans or investment opportunities on our platform. Loan approvals,
          interest rates, and loan terms are subject to change based on market
          conditions and platform policies.
        </p>
        <br />
        <p>
          <strong>User Responsibility: </strong> Users are solely responsible
          for conducting their own research, due diligence, and risk assessment
          before engaging in lending or borrowing activities on our platform.
          Users should carefully review loan agreements, terms of service, and
          privacy policies before proceeding.
        </p>
        <br />
        <p>
          By accessing or using Apollo platform, you acknowledge and accept the
          risks outlined in this disclaimer. If you do not agree with these
          terms, we advise you to refrain from using our platform. We reserve
          the right to update or modify this disclaimer at any time without
          prior notice.
        </p>
      </div>
      <div className="mt-10 flex justify-center">
        <div
          onClick={() => {
            setDisclaimerRead();
            closeDisclaimerModal();
          }}
          className="bg-pinkBorder text-center cursor-pointer text-white w-1/2 rounded-3xl border-2 border-pinkBorder font-semibold py-2 px-8 text-xs xxs:text-sm sm:text-base mx-auto"
        >
          Close
        </div>
      </div>
    </Modal>
  );
}
