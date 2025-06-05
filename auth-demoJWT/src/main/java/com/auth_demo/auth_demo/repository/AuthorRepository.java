package com.auth_demo.auth_demo.repository;

import com.auth_demo.auth_demo.entity.Author;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorRepository extends JpaRepository<Author, Long> {
}
