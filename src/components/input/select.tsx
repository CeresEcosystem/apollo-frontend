import { ChangeEvent } from 'react';
import { SelectOption } from 'src/interfaces';

export default function Select({
  name,
  id,
  options,
  selectedOption,
  onChange,
  label = '',
}: {
  name: string;
  id?: string;
  options: SelectOption[];
  selectedOption: SelectOption | '';
  // eslint-disable-next-line no-unused-vars
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  label?: string;
}) {
  return (
    <div className="flex-shrink-0">
      {label !== '' && (
        <label htmlFor={id} className="block mb-1 text-grey">
          {label}
        </label>
      )}
      <div className="relative w-full after:content-['▼'] after:top-3.5 after:text-grey2 after:text-xs after:right-4 after:absolute">
        <select
          name={name}
          id={id}
          className={
            'w-full rounded-3xl appearance-none border border-border bg-inputBackground py-2 px-6 text-grey font-medium placeholder:text-grey2 focus:outline-none'
          }
          value={selectedOption !== '' ? selectedOption.value : ''}
          onChange={onChange}
        >
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
