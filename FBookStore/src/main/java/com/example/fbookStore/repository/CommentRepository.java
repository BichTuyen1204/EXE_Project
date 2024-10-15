package com.example.fbookStore.repository;


import com.example.fbookStore.entities.Comment;
import org.springframework.data.repository.CrudRepository;

public interface CommentRepository extends CrudRepository<Comment, Long> {
}
