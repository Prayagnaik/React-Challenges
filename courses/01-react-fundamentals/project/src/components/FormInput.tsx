import type { ChangeEvent } from "react";

/**
 * Reusable form input for text fields and textareas.
 */
interface FormInputProps {
  id: string;
  value: string;
  onChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  label: string;
  type?: string;
  placeholder?: string;
  error?: string;
  multiline?: boolean;
}

export default function FormInput({
  id,
  value,
  onChange,
  label,
  type = "text",
  placeholder,
  error,
  multiline = false,
}: FormInputProps) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>

      {multiline ? (
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      )}

      {error && <p>{error}</p>}
    </div>
  );
}