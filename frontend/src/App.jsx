import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import NoteDetailPage from './pages/NoteDetailPage'
import toast from 'react-hot-toast'
import { Route, Routes } from 'react-router'
import { Button } from './components/ui/button'

const App = () => {
  return (
    <div>
      <Button className="cursor-pointer" onClick={() => toast.success("Success")}>Click</Button>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
