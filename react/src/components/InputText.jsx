import { ErrorMessage, Field } from "formik";
import { PropTypes } from "prop-types";
import EnvelopeIcon from "./icons/EnvelopeIcon";
import ExclamationIcon from "./icons/ExclamationIcon";
import EyeIcon from "./icons/EyeIcon";
import PhoneIcon from "./icons/PhoneIcon";
import UserIcon from "./icons/UserIcon";

export default function InputText({
  label,
  name,
  icon,
  placeholder,
  type = "text",
}) {
  const showPassword = () => {
    const input = document.getElementsByName(name)[0];
    input.type = input.type === "password" ? "text" : "password";
  };
  return (
    <>
      <label className="text-sm block mb-2">{label}</label>
      <div className="relative flex items-center">
        <Field
          name={name}
          type={type}
          className="w-full text-sm bg-transparent border-b border-gray-300 focus:border-[#333] px-2 py-3 outline-none dark:border-white dark:focus:border-white"
          placeholder={placeholder}
        />
        {icon === "envelope" && <EnvelopeIcon />}
        {icon === "phone" && <PhoneIcon/>}
        {icon === "user" && <UserIcon/>}
        {icon === "serie" && <i className="bi bi-badge-hd -translate-x-5"></i>}

        {icon === "eye" && (
          <div onClick={showPassword}>
            <EyeIcon />
          </div>
        )}
      </div>
      <ErrorMessage name={name}>
        {(msg) => (
          <div className="flex">
            <div className="mt-2">
              <ExclamationIcon />
            </div>
            <span className="text-red-600 dark:text-red-500 mt-[5px]  ml-2">
              {msg}
            </span>
          </div>
        )}
      </ErrorMessage>
    </>
  );
}

InputText.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  icon: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
};
