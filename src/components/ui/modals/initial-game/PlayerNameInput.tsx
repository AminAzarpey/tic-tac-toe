import { Player } from "@tictactoe/types";

interface PlayerNameInputProps {
  player: Player;
  value: string;
  onChange: (value: string) => void;
  label: string;
}

const PlayerNameInput = ({
  value,
  onChange,
  label,
}: PlayerNameInputProps) => {

  return (
    <div>
      <label className="block text-gray-700 dark:text-gray-300 text-lg mb-2">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white border-2 border-transparent focus:border-primary focus:outline-hidden text-lg"
        required
      />
    </div>
  );
};

export default PlayerNameInput;
