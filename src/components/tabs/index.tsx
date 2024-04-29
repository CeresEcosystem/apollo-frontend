import classNames from 'classnames';

export default function Tabs({
  tabs,
  selectedTab,
  onChange,
  setSelectedTab,
}: {
  tabs: string[];
  selectedTab: string;
  onChange: (event: React.FormEvent<HTMLSelectElement>) => void;
  setSelectedTab: (name: string) => void;
}) {
  return (
    <div className="relative pb-5 sm:pb-0 sm:border-b-2 sm:border-borderLight">
      <div className="sm:flex" />
      <div>
        <div className="relative sm:hidden after:content-['▼'] after:top-3.5 after:text-grey after:text-xs after:right-4 after:absolute">
          <label htmlFor="current-tab" className="sr-only">
            Select a tab
          </label>
          <select
            id="current-tab"
            name="current-tab"
            className="block appearance-none w-full text-grey bg-transparent rounded-3xl border-2 border-borderLight py-2 pl-3 pr-10 capitalize font-medium focus:outline-none focus:border-pinkBorder focus:ring-0"
            defaultValue={selectedTab}
            onChange={onChange}
          >
            {tabs.map(tab => (
              <option key={tab}>{tab}</option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <nav className="-mb-px flex">
            {tabs.map((tab: string) => {
              const current = tab === selectedTab;

              return (
                <div
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={classNames(
                    current
                      ? 'border-pinkBorder text-grey'
                      : 'border-transparent text-grey text-opacity-40 hover:text-grey',
                    'text-base capitalize whitespace-nowrap pb-4 px-14 border-b-2 font-semibold md:text-lg cursor-pointer',
                  )}
                  aria-current={current ? 'page' : undefined}
                >
                  {tab}
                </div>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
