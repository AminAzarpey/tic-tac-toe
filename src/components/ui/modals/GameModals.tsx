import { useGameStore } from "@tictactoe/store";
import { InitialGameModal, WinnerModal } from "@tictactoe/components";

export const GameModals = () => {
  const { winner, players, isFirstLaunch, hasGameStarted, resetGame } =
    useGameStore();

  return (
    <>
      {isFirstLaunch && !hasGameStarted && <InitialGameModal />}
      <WinnerModal
        winner={winner}
        playerName={winner === "X" ? players.X : players.O}
        onPlayAgain={resetGame}
      />
    </>
  );
};
