import { Field } from "formik";
import { PropTypes } from "prop-types";

export default function InputCheck({ label, name }) {
  return (
    <div className="flex items-center me-4">
      <label
        className="relative flex items-center p-3 rounded-full cursor-pointer"
        htmlFor="check"
      >
        <Field
          type="checkbox"
          className="peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-blue-200 transition-all  checked:border-blue-500 checked:bg-blue-500 
      dark:checked:border-purple-500 
      dark:checked:bg-purple-500 dark:bg-gray-700 hover:before:opacity-10"
          id="check"
          name={name}
        />
        <span className="absolute dark:bg-purple-500 text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            viewBox="0 0 20 20"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </span>
      </label>
      <label
        className="mt-px font-light text-black cursor-pointer select-none dark:text-white"
        htmlFor="check"
      >
        {label}
      </label>
    </div>
  );
}

InputCheck.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
};
