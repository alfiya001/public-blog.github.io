package com.cts.service.impl;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.cts.service.CommentService;
import com.cts.service.PostService;
import com.cts.exception.ResourceNotFoundException;
import com.cts.model.Comment;
import com.cts.repository.CommentRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class CommentServiceImpl implements CommentService {

	private final CommentRepository commentRepository;
	
	private final PostService postService;
	
	@Override
	public Optional<Comment> findById(Long postId) {
		log.info("findById Service");
		return commentRepository.findById(postId);
	}

	@Override
	public Optional<Comment> findByIdAndPostId(Long commentId, Long postId) {
		log.info("findByIdAndPostId Service");
		return commentRepository.findByIdAndPostId(commentId, postId);
	}

	@Override
	public ResponseEntity<?> delete(Long commentId, Long postId) {
		log.info("delete Service");
		return commentRepository.findByIdAndPostId(commentId, postId).map(comment -> {
            commentRepository.delete(comment);
            return ResponseEntity.ok().build();
		}).orElseThrow(() -> new ResourceNotFoundException("Comment not found with id " + commentId + " and postId " + postId));
	}

	@Override
	public List<Comment> findByPostId(Long postId) {
		log.info("findByPostId Service");
		 return commentRepository.findByPostId(postId);
	}

	@Override
	public Comment saveComment(Comment comment, Long postId) {
		log.info("saveComment Service");
		return postService.findById(postId).map(post -> {
            comment.setPost(post);
            return commentRepository.save(comment);
        }).orElseThrow(() -> new ResourceNotFoundException("PostId " + postId + " not found"));
	}

	@Override
	public Comment updateComment(Long commentId, @Valid Comment commentRequest) {
		log.info("updateComment Service");
		return commentRepository.findById(commentId).map(comment -> {
            comment.setComment(commentRequest.getComment());
            return commentRepository.save(comment);
        }).orElseThrow(() -> new ResourceNotFoundException("CommentId " + commentId + "not found"));
	}

}
