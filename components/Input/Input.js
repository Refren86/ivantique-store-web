export const Input = ({
  id,
  register,
  errors,
  onChange,
  label,
  required,
  ...otherProps
}) => {
  return (
    <div className="relative my-5">
      <input
        id={id}
        name={id}
        onChange={onChange}
        className="peer h-10 w-full border-b-2 border-grey-400 text-grey-900 placeholder-transparent focus:outline-none focus:border-secondary-500"
        {...register?.(id, { required })}
        {...otherProps}
      />

      {label && (
        <label
          htmlFor={id}
          className="absolute pointer-events-none left-0 -top-3.5 text-grey-800 text-xs transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-700 peer-focus:text-xs"
        >
          {label}
        </label>
      )}

      {errors?.[id] && (
        <div className="text-red-400 text-xs mt-1">* {errors[id]?.message}</div>
      )}
    </div>
  );
};
