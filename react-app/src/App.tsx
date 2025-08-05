import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeListPage from './components/RecipeListPage';
import RecipeDetailPage from './components/RecipeDetailPage';

function App() {
  return (
    <Router basename="/Recipe-Book">
      <div className="App">
        <Routes>
          <Route path="/" element={<RecipeListPage />} />
          <Route path="/recipes/:recipeId" element={<RecipeDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
