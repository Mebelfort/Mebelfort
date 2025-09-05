import React, { useState, useEffect } from "react";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const token = localStorage.getItem("token");

  const fetchCategories = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/categories`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setCategories(data);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;
    await fetch(`${process.env.REACT_APP_API_URL}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: newCategory }),
    });
    setNewCategory("");
    fetchCategories();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Удалить категорию?")) return;
    await fetch(`${process.env.REACT_APP_API_URL}/categories/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchCategories();
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Категории</h2>

      <form onSubmit={handleAdd} className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Новая категория"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Добавить
        </button>
      </form>

      {categories.length === 0 ? (
        <p className="text-gray-600">Категорий пока нет.</p>
      ) : (
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li
              key={cat._id}
              className="flex justify-between items-center border p-3 rounded"
            >
              <span>{cat.name}</span>
              <button
                onClick={() => handleDelete(cat._id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Удалить
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
