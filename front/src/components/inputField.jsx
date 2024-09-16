const InputField = ({
  name,
  placeholder,
  value,
  className,
  type,
  onChange,
  ...props
}) => {
  return (
    <input
      name={name}
      placeholder={placeholder}
      value={value}
      className={`input input-bordered text-l w-3/5 ${className}`}
      type={type}
      onChange={onChange}
      {...props}
    />
  );
};

export default InputField;
