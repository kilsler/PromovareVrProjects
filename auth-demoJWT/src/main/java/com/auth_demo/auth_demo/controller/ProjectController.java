package com.auth_demo.auth_demo.controller;

import com.auth_demo.auth_demo.entity.Author;
import com.auth_demo.auth_demo.entity.Project;
import com.auth_demo.auth_demo.service.AuthorService;
import com.auth_demo.auth_demo.service.ProjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ProjectController {

    private final ProjectService projectService;
    private final AuthorService authorService;

    public ProjectController(ProjectService projectService, AuthorService authorService) {
        this.authorService = authorService;
        this.projectService = projectService;
    }

    @GetMapping("/projects")
    public ResponseEntity<List<Project>> getAllProjects() {
        List<Project> projects = projectService.getAllProjects();
        return ResponseEntity.ok(projects);
    }

    @GetMapping("/authors")
    public ResponseEntity<List<Author>> getAllAuthors() {
        List<Author> authors = authorService.getAllAuthors();
        return ResponseEntity.ok(authors);
    }

    @PostMapping("/projects/{projectId}/photos")
    public ResponseEntity<String> uploadPhoto(@PathVariable Long projectId,
                                              @RequestParam("file") MultipartFile file) {
        try {
            projectService.savePhoto(projectId, file);
            return ResponseEntity.ok("Фото загружено успешно");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Ошибка при загрузке фото: " + e.getMessage());
        }
    }

    @PostMapping(value = "/projects/create", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Project> createProject(@RequestBody Project project) {
        Project saved = projectService.createProject(project);
        return ResponseEntity.ok(saved);
    }

}


