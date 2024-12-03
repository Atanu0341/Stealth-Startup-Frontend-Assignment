import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const DataTable = ({ data, formType, onEdit, onDelete }) => {
  if (!data || data.length === 0) return null;

  const tableVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="p-6 bg-white/30 backdrop-blur-lg rounded-lg mt-8"
      variants={tableVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-bold text-gray-800 mb-4">{formType} Data</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse rounded-lg overflow-hidden shadow-lg">
          <thead className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={`header-${key}`} className="px-6 py-4 text-left text-sm font-medium tracking-wider">
                  {key}
                </th>
              ))}
              <th className="px-6 py-4 text-left text-sm font-medium tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((entry, index) => (
              <motion.tr
                key={`row-${index}`}
                className="hover:bg-gray-50 transition-colors duration-200"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {Object.values(entry).map((value, idx) => (
                  <td key={`cell-${index}-${idx}`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {value}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onEdit(index)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onDelete(index)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};
DataTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  formType: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DataTable;