import { ChangeEvent } from 'react';
import { SelectOption } from 'src/interfaces';

export default function Select({
  name,
  id,
  options,
  selectedOption,
  onChange,
  label = '',
  defaultOption = '',
}: {
  name: string;
  id?: string;
  options: SelectOption[];
  selectedOption: SelectOption | '';
  // eslint-disable-next-line no-unused-vars
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  defaultOption?: string;
}) {
  return (
    <div className="flex-shrink-0 w-full xs:w-auto">
      {label !== '' && (
        <label
          htmlFor={id}
          className="block mb-2 text-xs font-medium text-grey"
        >
          {label}
        </label>
      )}
      <div className="relative w-full rounded-3xl bg-white after:content-['▼'] after:top-2.5 after:text-borderLight after:text-xs after:right-2 after:absolute">
        <select
          name={name}
          id={id}
          className="w-full rounded-3xl text-xs appearance-none border-0 bg-white py-2 pl-4 pr-16 text-grey placeholder:text-grey focus:ring-2 focus:ring-inset focus:ring-pinkBorder focus:outline-none"
          value={selectedOption !== '' ? selectedOption.value : ''}
          onChange={onChange}
        >
          <option value="">{defaultOption}</option>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
