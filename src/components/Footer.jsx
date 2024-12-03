

const Footer = () => {
  return (
    <footer className="bg-white/20 backdrop-blur-lg py-6 mt-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-white mb-4 md:mb-0">
              © 2024 Dynamic Form App. All rights reserved.
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-indigo-200 transition-colors">Privacy Policy</a>
              <a href="#" className="text-white hover:text-indigo-200 transition-colors">Terms of Service</a>
            </div>
          </div>
          <div className="mt-4 text-sm text-white/70">
            Built with React, Tailwind CSS, and Framer Motion
          </div>
        </div>
      </footer>
      
  )
}

export default Footer