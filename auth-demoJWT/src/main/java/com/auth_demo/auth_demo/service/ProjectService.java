package com.auth_demo.auth_demo.service;

import com.auth_demo.auth_demo.entity.Author;
import com.auth_demo.auth_demo.entity.Photo;
import com.auth_demo.auth_demo.entity.Project;
import com.auth_demo.auth_demo.entity.Link;
import com.auth_demo.auth_demo.repository.AuthorRepository;
import com.auth_demo.auth_demo.repository.PhotoRepository;
import com.auth_demo.auth_demo.repository.ProjectRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final PhotoRepository photoRepository;
    private final AuthorRepository authorRepository;

    public ProjectService(ProjectRepository projectRepository, PhotoRepository photoRepository, AuthorRepository authorRepository) {
        this.projectRepository = projectRepository;
        this.photoRepository = photoRepository;
        this.authorRepository = authorRepository;
    }

    public void savePhoto(Long projectId, MultipartFile file) throws IOException {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Проект не найден"));

        Photo photo = new Photo();
        photo.setProject(project);
        photo.setImage(file.getBytes()); // сохраняем содержимое файла в byte[]

        photoRepository.save(photo);
    }

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    @Transactional
    public Project createProject(Project project) {
        // Привязка авторов из базы
        List<Author> authors = project.getAuthors().stream()
                .map(a -> authorRepository.findById(a.getId()).orElseThrow())
                .collect(Collectors.toList());
        project.setAuthors(authors);

        // Привязка проекта к фотографиям
        if (project.getPhotos() != null) {
            for (Photo photo : project.getPhotos()) {
                photo.setProject(project);
            }
        }

        return projectRepository.save(project);
    }
}

