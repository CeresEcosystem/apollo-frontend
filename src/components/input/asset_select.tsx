/* eslint-disable @typescript-eslint/no-explicit-any */
import { AssetSelectOption } from 'src/interfaces';
import Select, { components } from 'react-select';
import classNames from 'classnames';

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    width: '100%',
    borderRadius: '24px',
    appearance: 'none',
    border: '1px solid #CECECE',
    backgroundColor: '#F8F8F8',
    padding: '2px 10px',
    color: '#7D7D7D',
    fontWeight: '500',
    placeholder: {
      color: '#909090',
    },
    focus: {
      outline: 'none',
    },
  }),
};

export default function AssetSelect({
  options,
  selectedOption,
  handleChange,
  label = 'Select asset',
  spaceTop = false,
  isDisabled = false,
}: {
  options: AssetSelectOption[];
  selectedOption: AssetSelectOption | null;
  handleChange: (option: AssetSelectOption | null) => void;
  label?: string;
  spaceTop?: boolean;
  isDisabled?: boolean;
}) {
  const Option = ({ data, ...props }: { data: AssetSelectOption }) => (
    // @ts-expect-error  Type '{ children: Element; }' is missing the following properties
    <components.Option {...props}>
      <div className="flex items-center px-2">
        <img src={data.icon} className="h-6 w-6" alt={data.label} />
        <span className="ml-3 text-grey">{data.label}</span>
      </div>
    </components.Option>
  );

  const SingleValue = (props: any) => {
    const { data } = props;
    return (
      <components.SingleValue {...props}>
        <div className="flex items-center">
          <img src={data.icon} className="h-6 w-6" alt={data.label} />
          <span className="ml-2 text-grey">{data.label}</span>
        </div>
      </components.SingleValue>
    );
  };

  return (
    <div className={classNames('flex-shrink-0', spaceTop && 'mt-4')}>
      <label className="block mb-1 text-grey">{label}</label>
      <Select
        value={selectedOption}
        options={options}
        onChange={handleChange}
        placeholder={label}
        isSearchable={false}
        maxMenuHeight={150}
        styles={customStyles}
        isDisabled={isDisabled}
        components={{ Option, SingleValue }}
      />
    </div>
  );
}
