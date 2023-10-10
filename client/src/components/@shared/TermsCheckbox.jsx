import React from 'react';
import { useForm } from 'react-hook-form';

const TermsCheckbox = ({ fieldName, linkUrl, linkText,register,errors }) => {
  return (
    <div>
      <input
        {...register(fieldName, {
          required: {value: true, message:'Ce champ est obligatoire'}
        })}
        type="checkbox"
        id={fieldName}
      />
      <label htmlFor={fieldName}>
        J'accepte les{' '}
        <a href={linkUrl} target="_blank" rel="noopener noreferrer">
          {linkText}
        </a>
      </label>
      <div>
        {errors[fieldName] && <small>{errors[fieldName].message}</small>}
      </div>
    </div>
  );
};

export default TermsCheckbox;