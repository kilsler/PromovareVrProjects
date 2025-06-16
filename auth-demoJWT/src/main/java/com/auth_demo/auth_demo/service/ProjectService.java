package com.auth_demo.auth_demo.service;

import com.auth_demo.auth_demo.entity.Author;
import com.auth_demo.auth_demo.entity.Photo;
import com.auth_demo.auth_demo.entity.Project;
import com.auth_demo.auth_demo.entity.Link;
import com.auth_demo.auth_demo.repository.AuthorRepository;
import com.auth_demo.auth_demo.repository.PhotoRepository;
import com.auth_demo.auth_demo.repository.ProjectRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
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

    public void savePhoto(Long projectId, String base64Image) throws IOException {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Проект не найден"));
        byte[] imageBytes = Base64.getDecoder().decode(base64Image);
        Photo photo = new Photo();
        photo.setProject(project);
        photo.setImage(imageBytes);

        photoRepository.save(photo);
    }

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Boolean existsProject(Long projectId) {
        return projectRepository.existsById(projectId);
    }

    public Optional<Project> getProjectById(Long projectId) {
        return projectRepository.findById(projectId);
    }

    @Transactional
    public Project createProject(Project project) {
        List<Author> authors = project.getAuthors().stream()
                .map(a -> authorRepository.findById(a.getId()).orElseThrow())
                .collect(Collectors.toList());
        project.setAuthors(authors);

        if (project.getPhotos() != null) {
            for (Photo photo : project.getPhotos()) {
                photo.setProject(project);
            }
        }

        return projectRepository.save(project);
    }

    @Transactional
    public Project updateProject(Long projectId,Project updatedProject) {
        Project existingProject = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Проект не найден"));

        existingProject.setName(updatedProject.getName());
        existingProject.setDescription(updatedProject.getDescription());
        existingProject.setVideoUrl(updatedProject.getVideoUrl());

        List<Author> authors = updatedProject.getAuthors().stream()
                .map(a -> authorRepository.findById(a.getId()).orElseThrow())
                .collect(Collectors.toList());
        existingProject.setAuthors(authors);

        existingProject.getLinks().clear();
        if (updatedProject.getLinks() != null) {
            for (Link link : updatedProject.getLinks()) {
                link.setProject(existingProject);
                existingProject.getLinks().add(link);
            }
        }

        if (updatedProject.getPhotos() != null && !updatedProject.getPhotos().isEmpty()) {
            existingProject.getPhotos().clear();
            for (Photo photo : updatedProject.getPhotos()) {
                photo.setProject(existingProject);
                existingProject.getPhotos().add(photo);
            }
        }

        return projectRepository.save(existingProject);
    }


    public void delete(Long projectId) {
        projectRepository.deleteById(projectId);
    }
}

