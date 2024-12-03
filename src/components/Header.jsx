import { motion } from 'framer-motion';

const Header = () => {
  return (
    <header className="bg-white/20 backdrop-blur-lg py-4 shadow-md">
    <div className="container mx-auto px-4 flex justify-between items-center">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-white text-2xl font-bold flex items-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
        Dynamic Form App
      </motion.div>
      <nav className="hidden md:flex space-x-4">
        <a href="#" className="text-white hover:text-indigo-200 transition-colors">Home</a>
        <a href="#" className="text-white hover:text-indigo-200 transition-colors">About</a>
        <a href="#" className="text-white hover:text-indigo-200 transition-colors">Contact</a>
      </nav>
    </div>
  </header>

  )
}

export default Header