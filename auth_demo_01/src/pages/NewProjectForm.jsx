import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewProjectForm() {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        authors: "",
        links: "",
        photos: [],
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "photos") {
            setFormData({ ...formData, photos: files });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const convertToBase64 = (file) =>
            new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
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
            photos: base64Photos,
        };

        const res = await fetch("http://localhost:8080/api/projects/create", {
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

        alert("Проект успешно добавлен!");
        navigate("/");
    };

    return (
        <div>
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

export default NewProjectForm;
