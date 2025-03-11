//import logo from './logo.svg';
import './App.css';

function App() {
  return (
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          Test Tailwind CSS
        </h1>
        <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
          <p className="text-gray-700">
            Si vous voyez ce texte dans un cadre blanc arrondi avec de l'ombre, et que le titre ci-dessus est en bleu et en gras, Tailwind fonctionne correctement !
          </p>
          <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors">
            Bouton de test
          </button>
        </div>
      </div>
  );
}

export default App;
