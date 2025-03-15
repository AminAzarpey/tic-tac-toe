import { motion } from "framer-motion";
import { Cell as CellType } from "../types";

interface CellProps {
  value: CellType;
  onClick: () => void;
}

const Cell = ({ value, onClick }: CellProps) => {
  return (
    <motion.button
      whileHover={{ scale: 0.95 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="w-24 h-24 bg-neutral dark:bg-neutral/20 rounded-lg flex items-center justify-center text-4xl font-bold text-primary transition-colors duration-300"
    >
      {value && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={value === "X" ? "text-accent" : "text-secondary"}
        >
          {value}
        </motion.span>
      )}
    </motion.button>
  );
};

export default Cell;
