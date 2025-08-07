import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInitialData } from './redux/actions/dataActions';
import Sidebar from './components/Sidebar';
import CalendarView from './components/CalendarView';
import TodoList from './components/TodoList';
import FilterControls from './components/FilterControls';
import Modal from './components/Modal';
import TodoForm from './components/TodoForm';
import { Plus } from 'lucide-react';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const { loading, locationData, weatherData, error } = useSelector((state) => state.data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    dispatch(fetchInitialData());
  }, [dispatch]);

  const renderWeather = () => {
    if (!weatherData || !weatherData.current_weather) return 'Memuat cuaca...';
    const { temperature } = weatherData.current_weather;
    return `${temperature}°C`;
  };

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) return 'Selamat Pagi';
    if (currentHour < 18) return 'Selamat Siang';
    return 'Selamat Malam';
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null); // Reset editing task when modal closes
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* SECTION 1: SIDEBAR */}
      <Sidebar />

      {/* SECTION 2: MAIN CONTENT (TO-DO LIST) */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Header Section */}
        <header className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              {loading ? 'Memuat...' : `${getGreeting()}, ${locationData?.city || 'Pengguna'}`}
            </h1>
            <p className="text-slate-500">{loading ? '...' : renderWeather()}</p>
          </div>
          
        </header>

        {/* Filter and To-Do List */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <FilterControls setIsModalOpen={setIsModalOpen} setEditingTask={setEditingTask} />
          <TodoList setEditingTask={setEditingTask} setIsModalOpen={setIsModalOpen} />
        </div>
      </main>

      {/* SECTION 3: CALENDAR VIEW */}
      <CalendarView />

      {/* Modal for Add/Edit Task */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingTask ? 'Edit Tugas' : 'Tambah Tugas Baru'}>
        <TodoForm currentTask={editingTask} setEditingTask={setEditingTask} onClose={handleCloseModal} />
      </Modal>
    </div>
  );
}

export default App;