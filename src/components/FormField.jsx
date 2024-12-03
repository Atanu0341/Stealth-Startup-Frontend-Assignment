import { motion } from 'framer-motion';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';

const FormField = ({ field, control, errors, index }) => {
  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  const renderInput = () => {
    switch (field.type) {
      case 'text':
      case 'number':
      case 'password':
      case 'date':
        return (
          <Controller
            name={field.name}
            control={control}
            rules={{
              required: field.required ? `${field.label} is required` : false,
              validate: (value) => {
                if (field.type === 'number' && isNaN(value)) {
                  return 'Must be a valid number';
                }
                if (field.type === 'date' && !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
                  return 'Must be a valid date (YYYY-MM-DD)';
                }
                if (field.name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
                  return 'Must be a valid email address';
                }
                if (field.name === 'zipCode' && !/^\d{5}(-\d{4})?$/.test(value)) {
                  return 'Must be a valid ZIP code (e.g., 12345 or 12345-6789)';
                }
                if (field.name === 'cardNumber' && !/^\d{16}$/.test(value)) {
                  return 'Must be a valid 16-digit card number';
                }
                if (field.name === 'cvv' && !/^\d{3,4}$/.test(value)) {
                  return 'Must be a valid 3 or 4-digit CVV';
                }
                return true;
              },
            }}
            render={({ field: controllerField }) => (
              <motion.input
                {...controllerField}
                type={field.type}
                className={`w-full px-4 py-3 border ${
                  errors[field.name] ? 'border-red-500' : 'border-gray-300'
                } rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-white/90 backdrop-blur-sm`}
                whileFocus={{ scale: 1.02 }}
              />
            )}
          />
        );
      case 'dropdown':
        return (
          <Controller
            name={field.name}
            control={control}
            rules={{ required: field.required ? `${field.label} is required` : false }}
            render={({ field: controllerField }) => (
              <motion.select
                {...controllerField}
                className={`w-full px-4 py-3 border ${
                  errors[field.name] ? 'border-red-500' : 'border-gray-300'
                } rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-white/90 backdrop-blur-sm`}
                whileFocus={{ scale: 1.02 }}
              >
                <option value="">Select</option>
                {field.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </motion.select>
            )}
          />
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      className="mb-6"
      variants={inputVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <label className="block text-sm font-medium text-white mb-2">
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {renderInput()}
      {errors[field.name] && (
        <motion.p
          className="text-white text-xs mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {errors[field.name].message || 'This field is invalid'}
        </motion.p>
      )}
    </motion.div>
  );
};

FormField.propTypes = {
  field: PropTypes.shape({
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    required: PropTypes.bool,
    options: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  control: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default FormField;