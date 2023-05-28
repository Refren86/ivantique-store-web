export const Input = ({
  id,
  register,
  errors,
  onChange,
  label,
  required,
  options,
  ...otherProps
}) => {
  return (
    <div className="relative my-5">
      <input
        id={id}
        name={id}
        onChange={onChange}
        className="peer px-2 h-10 w-full border-b-2 border-grey-400 text-grey-900 placeholder-transparent focus:outline-none focus:border-secondary-500"
        {...register?.(id, { ...options })}
        {...otherProps}
      />

      {label && (
        <label
          htmlFor={id}
          className="absolute pointer-events-none left-2 -top-4 text-grey-800 text-xs transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:left-0 peer-focus:text-gray-700 peer-focus:text-xs"
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
