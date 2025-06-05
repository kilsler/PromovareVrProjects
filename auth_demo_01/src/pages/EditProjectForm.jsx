import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditProjectForm() {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(null);
    const [existingPhotos, setExistingPhotos] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8080/api/projects/${projectId}`)
            .then((res) => res.json())
            .then((data) => {
                const project = data;
                if (project) {
                    setFormData({
                        name: project.name || "",
                        description: project.description || "",
                        authors: project.authors?.map((a) => a.id).join(", ") || "",
                        links: project.links?.map((l) => l.url).join(", ") || "",
                        photos: [], // новые фото будут здесь, старые просто показываем
                    });
                    setExistingPhotos(project.photos || []);
                }
            });
    }, [projectId]);

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

        let base64Photos = [];

        if (formData.photos.length > 0) {
            const convertToBase64 = (file) =>
                new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => {
                        const base64 = reader.result.split(",")[1];
                        resolve({ image: base64 });
                    };
                    reader.onerror = reject;
                });

            base64Photos = await Promise.all(
                Array.from(formData.photos).map(convertToBase64)
            );
        }

        const payload = {
            name: formData.name,
            description: formData.description,
            authors: formData.authors
                .split(",")
                .map((id) => ({ id: parseInt(id.trim()) })),
            links: formData.links
                .split(",")
                .map((url) => ({ url: url.trim() }))
                .filter((link) => link.url.length > 0),
            photos: base64Photos, // если пустой массив — фото не меняются
        };

        const res = await fetch(
            `http://localhost:8080/api/projects/${projectId}/update`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            }
        );

        if (!res.ok) {
            alert("Ошибка при обновлении проекта");
            return;
        }

        navigate("/");
    };

    if (!formData) return <div>Загрузка...</div>;

    return (
        <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
            <h2>Редактировать проект</h2>
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

                {/* Отображение текущих фото */}
                {existingPhotos.length > 0 && (
                    <div style={{ marginTop: "10px" }}>
                        <label>Текущие фото:</label>
                        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                            {existingPhotos.map((photo) => (
                                <img
                                    key={photo.id}
                                    src={`data:image/jpeg;base64,${photo.image}`}
                                    alt="Фото"
                                    style={{
                                        width: "100px",
                                        height: "100px",
                                        objectFit: "cover",
                                        borderRadius: "8px",
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                )}

                <div style={{ marginTop: "10px" }}>
                    <label>Загрузить новые фото (перезапишут старые): </label>
                    <input
                        type="file"
                        name="photos"
                        accept="image/*"
                        multiple
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" style={{ marginTop: "10px" }}>
                    Сохранить изменения
                </button>
            </form>
        </div>
    );
}
