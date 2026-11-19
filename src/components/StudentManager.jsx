import { useState } from "react";

function StudentManager() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  function handleToggleStatus(id) {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === id
          ? {
              ...student,
              status: student.status === "Active" ? "Inactive" : "Active",
            }
          : student,
      ),
    );
  }

  function handleAddStudent(e) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      return;
    }
    const newStudent = {
      id: Date.now(),
      name: name,
      email: email,
      status: "Active",
      createdAt: new Date().toISOString(),
    };
    setStudents((prevStudents) => [...prevStudents, newStudent]);
    setName("");
    setEmail("");
  }
  function handleSaveEdit(e) {
    e.preventDefault();
    if (!editName.trim() || !editEmail.trim()) {
      return;
    }
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        editingId === student.id
          ? { ...student, name: editName, email: editEmail }
          : student,
      ),
    );
    setEditingId(null);
    setEditName("");
    setEditEmail("");
  }

  function handleDeleteStudent(id) {
    if (editingId === id) {
      setEditingId(null);
      setEditName("");
      setEditEmail("");
    }
    setStudents((prevStudents) =>
      prevStudents.filter((student) => student.id !== id),
    );
  }
  function handleCancelEdit() {
    setEditingId(null);
    setEditName("");
    setEditEmail("");
  }
  const activeStudents = students.filter(
    (student) => student.status === "Active",
  );

  const recentlyAdded = students.filter((student) => {
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

    return new Date(student.createdAt).getTime() >= sevenDaysAgo;
  });

  const inactiveStudents = students.filter(
    (student) => student.status === "Inactive",
  );
  return (
    <div className="mx-auto max-w-7xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Student Management
        </h1>

        <p className="mt-2 text-slate-500">
          Manage your students and their information.
        </p>
      </header>
      <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Total Students</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-800">
            {students.length}
          </h2>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Active Students</p>
          <h2 className="mt-2 text-3xl font-bold text-green-600">
            {activeStudents.length}
          </h2>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Inactive Students
          </p>
          <h2 className="mt-2 text-3xl font-bold text-red-600">
            {inactiveStudents.length}
          </h2>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Recently Added</p>
          <h2 className="mt-2 text-3xl font-bold text-blue-600">
            {recentlyAdded.length}
          </h2>
        </div>
      </div>

      <div className="space-y-6 px-4 py-8">
        <form
          onSubmit={handleAddStudent}
          className="mb-8 rounded-xl bg-white p-6 shadow-sm"
        >
          <h2 className="mb-5 text-xl font-bold text-slate-800">
            Add New Student
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Student Name"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Student Email"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          <button
            type="submit"
            className="mt-5 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 transition cursor-pointer focus:ring-2 focus:ring-blue-500"
          >
            Add Student
          </button>
        </form>
        <hr />
        {students.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
            <h3 className="text-lg font-bold text-slate-800">
              No student added yet.
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Add your first student to get started.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {students.map((student) => (
              <div
                key={student.id}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                {editingId === student.id ? (
                  <form onSubmit={handleSaveEdit} className="space-y-4">
                    <input
                      className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />
                    <input
                      className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="email"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="rounded-lg px-3 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 transition cursor-pointer"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteId(student.id)}
                      className="rounded-lg mx-2 px-3 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition cursor-pointer
"
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="rounded-lg px-3 py-2 text-sm font-medium bg-slate-200 hover:bg-slate-300 transition cursor-pointer"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>
                  </form>
                ) : (
                  <>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-bold text-slate-800">
                          {student.name}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          {student.email}
                        </p>
                      </div>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          student.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {student.status}
                      </span>
                    </div>

                    <button
                      className="rounded-lg mt-3 px-3 py-2 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition cursor-pointer"
                      onClick={() => {
                        setEditingId(student.id);
                        setEditName(student.name);
                        setEditEmail(student.email);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="rounded-lg mt-3 mx-2 px-3 py-2 text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition cursor-pointer"
                      onClick={() => setDeleteId(student.id)}
                    >
                      Delete
                    </button>
                    <button
                      className={`mt-3 rounded-lg px-3 py-2 text-sm font-medium text-white transition cursor-pointer ${
                        student.status === "Active"
                          ? "bg-red-600 hover:bg-red-700"
                          : "bg-green-600 hover:bg-green-700"
                      }`}
                      onClick={() => handleToggleStatus(student.id)}
                    >
                      {student.status === "Active" ? "Deactivate" : "Activate"}
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
        {deleteId !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
              <h3 className="text-xl font-bold text-slate-800">
                Confirm Delete
              </h3>
              <p className="mt-2 text-sm text-slate-500 leading-6">
                Are you sure you want to delete this student?
              </p>

              <button
                className="mt-6 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700 cursor-pointer"
                onClick={() => {
                  handleDeleteStudent(deleteId);
                  setDeleteId(null);
                }}
              >
                Yes, Delete
              </button>

              <button
                className="mt-6 ml-2 rounded-lg bg-slate-200 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-300 cursor-pointer"
                onClick={() => setDeleteId(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentManager;
