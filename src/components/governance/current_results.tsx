import ProgressBarLinear from '@components/progress_bar/progress_bar_linear';
import { TOKEN_NAME } from '@constants/index';
import { GovernacePollResults } from 'src/interfaces';

export default function CurrentResults({
  results,
}: {
  results?: GovernacePollResults;
}) {
  if (results) {
    return (
      <div className="border-2 bg-white rounded-3xl border-borderLight md:col-span-2">
        <span className="py-5 mx-5 inline-flex items-center text-lg text-grey font-bold">
          <img src="/current_results.webp" alt="Poll info" className="mr-2" />
          Current results
        </span>
        <hr className="border border-borderLight" />
        {results && (
          <div className="p-5 space-y-4">
            {Object.keys(results).map(option => {
              return (
                <div key={option}>
                  <span className="font-semibold text-grey">{`${option} (${results[option].sumFormatted} ${TOKEN_NAME.toUpperCase()})`}</span>
                  <ProgressBarLinear progress={results[option].percentage} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  return null;
}
