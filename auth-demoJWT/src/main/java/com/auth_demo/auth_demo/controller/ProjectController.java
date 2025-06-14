package com.auth_demo.auth_demo.controller;

import com.auth_demo.auth_demo.entity.Author;
import com.auth_demo.auth_demo.entity.Project;
import com.auth_demo.auth_demo.repository.PhotoRepository;
import com.auth_demo.auth_demo.repository.ProjectRepository;
import com.auth_demo.auth_demo.service.AuthorService;
import com.auth_demo.auth_demo.service.ProjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class ProjectController {

    private final ProjectService projectService;
    private final AuthorService authorService;
    private final PhotoRepository photoRepository;

    public ProjectController(ProjectService projectService, AuthorService authorService, PhotoRepository photoRepository) {
        this.authorService = authorService;
        this.projectService = projectService;
        this.photoRepository = photoRepository;
    }

    @GetMapping("/authors")
    public ResponseEntity<List<Author>> getAllAuthors() {
        List<Author> authors = authorService.getAllAuthors();
        return ResponseEntity.ok(authors);
    }

    @GetMapping("/projects")
    public ResponseEntity<List<Project>> getAllProjects() {
        List<Project> projects = projectService.getAllProjects();
        return ResponseEntity.ok(projects);
    }

    @GetMapping("/projects/{projectId}")
    public ResponseEntity<Optional<Project>> getAllProjects(@PathVariable Long projectId) {
        Optional<Project> project = projectService.getProjectById(projectId);
        return ResponseEntity.ok(project);
    }

    @PostMapping("/projects/{projectId}/photos")
    public ResponseEntity<String> uploadPhoto(@PathVariable Long projectId,@RequestBody Map<String, String> request) {
        try {
            String base64Image = request.get("image");
            projectService.savePhoto(projectId, base64Image);
            return ResponseEntity.ok("Фото загружено успешно");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Ошибка при загрузке фото: " + e.getMessage());
        }
    }

    @PostMapping(value = "/projects", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Project> createProject(@RequestBody Project project) {
        Project saved = projectService.createProject(project);
        return ResponseEntity.ok(saved);
    }

    @PutMapping(value = "/projects/{projectId}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Project> updateProject(@PathVariable Long projectId,@RequestBody Project project) {
        Project saved = projectService.updateProject(projectId,project);
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/projects/photos/{photoId}")
    public ResponseEntity<String> deletePhoto(@PathVariable Long photoId) {
        try {
            if (!photoRepository.existsById(photoId)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Фото не найдено");
            }
            photoRepository.deleteById(photoId);
            return ResponseEntity.ok("Фото успешно удалено");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Ошибка при удалении фото: " + e.getMessage());
        }
    }

    @DeleteMapping("/projects/{projectId}")
    public ResponseEntity<String> deleteProject(@PathVariable Long projectId) {
        try {
            if (!projectService.existsProject(projectId)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Проект не найдено");
            }
            projectService.delete(projectId);
            return ResponseEntity.ok("Проект успешно удалено");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Ошибка при удалении проекта: " + e.getMessage());
        }
    }
}


