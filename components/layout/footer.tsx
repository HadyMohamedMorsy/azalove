import { Book, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-r from-rose-50 to-pink-50 overflow-hidden">
      {/* Romantic curved shape */}
      <div className="absolute top-0 left-0 w-full overflow-hidden">
        <svg
          className="relative block w-full h-20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            fill="rgba(251, 113, 133, 0.1)"
          ></path>
        </svg>
      </div>

      <div className="relative container mx-auto px-6 py-12">
        {/* Main Content */}
        <div className="text-center max-w-2xl mx-auto">
          {/* Brand */}
          <div className="flex items-center justify-center mb-6">
            <Book className="h-8 w-8 text-rose-500 mr-3" />
            <h3 className="text-2xl font-bold text-rose-800">Azalove</h3>
            <Heart className="h-6 w-6 text-rose-400 ml-3 animate-pulse" />
          </div>

          {/* Tagline */}
          <p className="text-rose-600 text-lg mb-8 italic">
            "Where every story is a journey of the heart"
          </p>

          {/* Simple Links */}
          <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm">
            <a
              href="#"
              className="text-rose-500 hover:text-rose-700 transition-colors"
            >
              New Releases
            </a>
            <a
              href="#"
              className="text-rose-500 hover:text-rose-700 transition-colors"
            >
              Bestsellers
            </a>
            <a
              href="#"
              className="text-rose-500 hover:text-rose-700 transition-colors"
            >
              Authors
            </a>
            <a
              href="#"
              className="text-rose-500 hover:text-rose-700 transition-colors"
            >
              Reviews
            </a>
          </div>

          {/* Newsletter */}
          <div className="bg-white/60 backdrop-blur-sm rounded-full p-1 max-w-md mx-auto mb-8">
            <div className="flex">
              <input
                type="email"
                placeholder="Enter email for love stories..."
                className="flex-1 px-4 py-3 bg-transparent focus:outline-none text-rose-700 placeholder-rose-400"
              />
              <button className="bg-rose-500 text-white px-6 py-3 rounded-full hover:bg-rose-600 transition-colors flex items-center">
                <Heart className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Copyright */}
          <div className="flex items-center justify-center text-sm text-rose-500">
            <span>© 2024 Romance Library</span>
            <Heart className="h-3 w-3 mx-2 text-rose-400" />
            <span>Made with love</span>
          </div>
        </div>
      </div>

      {/* Bottom romantic shape */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden rotate-180">
        <svg
          className="relative block w-full h-16"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            fill="rgba(251, 113, 133, 0.05)"
          ></path>
        </svg>
      </div>
    </footer>
  );
};

export default Footer;
