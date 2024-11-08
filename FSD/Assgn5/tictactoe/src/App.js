import GameBoard from './components/GameBoard';
import logo from './logo.svg';

function App() {
  return (
    <div className="flex flex-col min-h-screen justify-center">
      <h1 className="mx-auto pb-5">Tic Tac Toe</h1>
      <GameBoard />
    </div>
  );
}

export default App;
