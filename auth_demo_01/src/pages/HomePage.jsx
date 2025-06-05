import { useEffect, useState } from "react";
import { Link } from "react-router";

function HomePage() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/projects")
            .then((res) => res.json())
            .then((data) => setProjects(data));
    }, []);

    return (
        <div>
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
                    <Link to={`/edit/${project.id}`}>
                        <button>Редактировать</button>
                    </Link>

                </div>
            ))}
        </div>
    );
}

export default HomePage;
