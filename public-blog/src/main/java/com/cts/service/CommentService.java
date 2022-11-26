package com.cts.service;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

import com.cts.model.Comment;

public interface CommentService {

	Optional<Comment> findById(Long postId);

	Optional<Comment> findByIdAndPostId(Long commentId, Long postId);

//	Page<Comment> findByPostId(Long postId, Pageable pageable);
	List<Comment> findByPostId(Long postId);

	Comment saveComment(Comment comment, Long postId);

	Comment updateComment(Long commentId, @Valid Comment commentRequest);

	ResponseEntity<?> delete(Long commentId, Long postId);
}
