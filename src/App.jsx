import React, { useState } from "react";
import pic from "./assets/pic.avif"; // Import the image

export default function App() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [mainTask, setMainTask] = useState([]);

  const submitFunction = (e) => {
    e.preventDefault();
    if (title.trim() === "" || desc.trim() === "") {
      alert("Please add both title and description!");
      return;
    }
    const newTask = { title, desc };
    setMainTask((prevTasks) => [...prevTasks, newTask]);
    setTitle("");
    setDesc("");
  };

  const deleteTask = (index) => {
    const updatedTasks = mainTask.filter((_, i) => i !== index);
    setMainTask(updatedTasks);
  };

  const renderTask =
    mainTask.length === 0 ? (
      <h2 className="text-2xl text-gray-400 text-center">No tasks available</h2>
    ) : (
      mainTask.map((task, index) => (
        <li
          key={index}
          className="flex items-center justify-between bg-white px-6 py-4 my-3 rounded-lg shadow-lg hover:bg-pink-100 transition"
        >
          <div className="flex flex-col w-2/3">
            <h3 className="text-xl font-semibold text-red-500">{task.title}</h3>
            <p className="text-md text-gray-600 mt-1">{task.desc}</p>
          </div>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition transform hover:scale-105"
            onClick={() => deleteTask(index)}
          >
            Delete
          </button>
        </li>
      ))
    );

  return (
    <div
      className="bg-cover bg-center min-h-screen text-white"
      style={{
        backgroundImage: `url(${pic})`, // Use the imported image
      }}
    >
      <div className="min-h-screen">
        <header className="text-4xl text-center py-7 font-bold text-red-600">
          My Todo List
        </header>
        <main className="text-center my-8 px-4">
          <form onSubmit={submitFunction} className="space-y-5">
            <input
              type="text"
              placeholder="Enter Task Title"
              className="w-full max-w-lg px-6 py-3 mr-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-pink-500 text-gray-800"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter Task Description"
              className="w-full max-w-lg px-6 py-3 mr-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-pink-500 text-gray-800"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <button
              type="submit"
              className="bg-pink-500 text-white px-6 py-3 mr-3 rounded-lg text-xl w-full max-w-lg hover:bg-pink-600 transition transform hover:scale-105"
            >
              Add Task
            </button>
          </form>
          <hr className="my-8 border-gray-300" />
          <section className="py-6 px-8 mx-auto max-w-3xl rounded-lg">
            <ul
              className={`overflow-y-auto ${
                mainTask.length > 3 ? "max-h-64" : ""
              }`}
            >
              {renderTask}
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
}
