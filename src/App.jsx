import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { apiResponses } from "./constants/formData";
import FormField from "./components/FormField";
import DataTable from "./components/DataTable";
import Loader from "./components/Loader";
import ConfirmationModal from "./components/ConfirmationModal";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [formType, setFormType] = useState("");
  const [formData, setFormData] = useState(null);
  const [savedData, setSavedData] = useState({
    userInformation: [],
    addressInformation: [],
    paymentInformation: [],
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [formProgress, setFormProgress] = useState(0);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const { control, handleSubmit, setValue, reset, watch, formState: { errors } } = useForm();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    const savedFormData = localStorage.getItem("formData");
    if (savedFormData) {
      setSavedData(JSON.parse(savedFormData));
    }
  }, []);

  useEffect(() => {
    if (formType) {
      setFormData(apiResponses[formType]);
      reset();
      setFormProgress(0);
    }
  }, [formType, reset]);

  useEffect(() => {
    if (formData) {
      const subscription = watch((value) => {
        const filledFields = Object.values(value).filter(Boolean).length;
        const totalFields = formData.fields.length;
        setFormProgress((filledFields / totalFields) * 100);
      });
      return () => subscription.unsubscribe();
    }
  }, [watch, formData]);

  const onSubmit = (data) => {
    const updatedData = { ...savedData };
    if (editingIndex !== null) {
      updatedData[formType][editingIndex] = data;
      setEditingIndex(null);
    } else {
      updatedData[formType].push(data);
    }
    setSavedData(updatedData);
    localStorage.setItem("formData", JSON.stringify(updatedData));
    reset();
    setFormProgress(0);

    const toast = document.getElementById("toast");
    toast.style.display = "block";
    setTimeout(() => {
      toast.style.display = "none";
    }, 3000);
  };

  const handleEdit = (index) => {
    const data = savedData[formType][index];
    Object.keys(data).forEach((key) => setValue(key, data[key]));
    setEditingIndex(index);
    setFormProgress(100);
  };

  const handleDelete = (index) => {
    setDeleteIndex(index);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = () => {
    const updatedData = { ...savedData };
    updatedData[formType].splice(deleteIndex, 1);
    setSavedData(updatedData);
    localStorage.setItem("formData", JSON.stringify(updatedData));
    setShowDeleteConfirmation(false);
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
    setDeleteIndex(null);
  };

  if (isLoading) return <Loader />;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      {/* Header */}

      <Header />

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white/20 backdrop-blur-lg rounded-xl shadow-xl overflow-hidden">
            <div className="p-8">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-bold text-white text-center mb-8"
              >
                Dynamic Form
              </motion.h1>

              <motion.div
                className="mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <label className="block text-sm font-medium text-white mb-2">
                  Select Form Type
                </label>
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-white/90 backdrop-blur-sm"
                  onChange={(e) => setFormType(e.target.value)}
                  value={formType}
                >
                  <option value="">Select</option>
                  <option value="userInformation">User Information</option>
                  <option value="addressInformation">
                    Address Information
                  </option>
                  <option value="paymentInformation">
                    Payment Information
                  </option>
                </select>
              </motion.div>

              <AnimatePresence mode="wait">
                {formData && (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-6"
                  >
                    <div className="mb-4">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                          style={{ width: `${formProgress}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-white mt-2">
                        Form Completion: {Math.round(formProgress)}%
                      </p>
                    </div>

                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-6"
                    >
                      {formData.fields.map((field, index) => (
                        <FormField
                          key={field.name}
                          field={field}
                          control={control}
                          errors={errors}
                          index={index}
                        />
                      ))}
                      <motion.button
                        type="submit"
                        className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {editingIndex !== null ? "Update" : "Submit"}
                      </motion.button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {formType && savedData[formType]?.length > 0 && (
              <DataTable
                data={savedData[formType]}
                formType={formType}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )}
          </div>
        </motion.div>
      </main>

      {/* Footer */}

      <Footer />

      <div
        id="toast"
        className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg hidden"
        style={{ zIndex: 1000 }}
      >
        Form submitted successfully!
      </div>

      <ConfirmationModal
        isOpen={showDeleteConfirmation}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        message="Are you sure you want to delete this entry?"
      />
    </div>
  );
}

export default App;
