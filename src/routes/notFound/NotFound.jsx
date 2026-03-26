import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FileQuestion, Home, ArrowLeft } from "lucide-react";
import Button from "../../components/Common/Button";
function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Animated Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="inline-flex items-center justify-center p-6 bg-primary/10 rounded-full text-primary mb-8"
        >
          <FileQuestion size={64} strokeWidth={1.5} />
        </motion.div>

        {/* Error Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-8xl font-black text-primary mb-4">404</h1>
          <h2 className="text-2xl font-bold text-text mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-text/70 mb-8 leading-relaxed">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            text="Go Back"
            type="NotPrimary"
            icon={ArrowLeft}
            onClick={() => navigate(-1)}
            optionalClassName="px-8 py-3 flex-1 sm:flex-none border border-border-main"
          />
          <Button
            text="Back to Home"
            type="primary"
            icon={Home}
            onClick={() => navigate("/")}
            optionalClassName="px-8 py-3 flex-1 sm:flex-none shadow-lg shadow-primary/20"
          />
        </motion.div>
      </div>
    </div>
  );
}

export default NotFound;
