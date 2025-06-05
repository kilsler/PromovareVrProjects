import { useEffect, useState } from "react";

function App() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    authors: "",
    links: "",
    photos: [],
  });

  // Загрузка всех проектов
  useEffect(() => {
    fetch("http://localhost:8080/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

  // Обновление полей формы
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photos") {
      setFormData({ ...formData, photos: files });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Отправка проекта
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Преобразуем каждое изображение в base64
    const convertToBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          // Извлекаем только base64 строку без префикса
          const base64 = reader.result.split(",")[1];
          resolve({ image: base64 });
        };
        reader.onerror = (error) => reject(error);
      });

    const base64Photos = await Promise.all(
      Array.from(formData.photos).map(convertToBase64)
    );

    const projectPayload = {
      name: formData.name,
      description: formData.description,
      authors: formData.authors
        .split(",")
        .map((id) => ({ id: parseInt(id.trim()) })),
      links: formData.links
        .split(",")
        .map((url) => ({ url: url.trim() }))
        .filter((link) => link.url.length > 0),
      photos: base64Photos, // 👈 фото прямо в JSON
    };

    const res = await fetch("http://localhost:8080/api/projects/base64", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectPayload),
    });

    if (!res.ok) {
      alert("Ошибка при создании проекта");
      return;
    }

    const newProject = await res.json();

    setProjects((prev) => [...prev, newProject]);
    setFormData({
      name: "",
      description: "",
      authors: "",
      links: "",
      photos: [],
    });
  };
  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h1>Проекты</h1>
      {projects.map((project) => (
        <div key={project.id} style={{ marginBottom: "40px" }}>
          <h2>{project.name}</h2>
          <p>{project.description}</p>
          <p>
            <strong>Авторы:</strong>{" "}
            {project.authors.map((a) => a.name).join(", ")}
          </p>
          <p>
            <strong>Ссылки:</strong>{" "}
            {project.links.map((link, idx) => (
              <span key={idx}>
                <a href={link.url} target="_blank" rel="noreferrer">
                  {link.url}
                </a>{" "}
              </span>
            ))}
          </p>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {project.photos.map((photo) => (
              <img
                key={photo.id}
                src={`data:image/jpeg;base64,${photo.image}`}
                alt="Фото"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
            ))}
          </div>
        </div>
      ))}

      <h2>Добавить новый проект</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Название: </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Описание: </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>ID авторов (через запятую): </label>
          <input
            type="text"
            name="authors"
            value={formData.authors}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Ссылки (через запятую): </label>
          <input
            type="text"
            name="links"
            value={formData.links}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Фотографии: </label>
          <input
            type="file"
            name="photos"
            accept="image/*"
            multiple
            onChange={handleChange}
          />
        </div>
        <button type="submit" style={{ marginTop: "10px" }}>
          Добавить проект
        </button>
      </form>
    </div>
  );
}

export default App;
