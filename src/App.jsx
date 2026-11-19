import StudentManager from "./components/StudentManager";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-slate-100 md:flex">
      <aside className="bg-slate-900 p-6 text-white md:min-h-screen md:w-64">
        <h2 className="mb-8 text-2xl font-bold">StudentHub</h2>

        <nav className="space-y-3">
          <a className="block rounded-lg bg-blue-600 px-4 py-3">Dashboard</a>

          <a className="block rounded-lg bg-blue-600 text-white px-4 py-3 hover:bg-slate-800">
            Students
          </a>

          <a className="block rounded-lg px-4 py-3 hover:bg-slate-800 text-slate-300">
            Settings
          </a>
        </nav>
      </aside>

      <main className="min-w-0 flex-1 p-4 md:p-8">
        <StudentManager />
      </main>
    </div>
  );
}

export default App;
