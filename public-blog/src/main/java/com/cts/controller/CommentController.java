package com.cts.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.cts.exception.ResourceNotFoundException;
import com.cts.model.Comment;
import com.cts.repository.CommentRepository;
import com.cts.repository.PostRepository;
import com.cts.service.CommentService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

import javax.validation.Valid;

@Slf4j
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@RestController
public class CommentController {

    private final CommentService commentService;

    private final PostRepository postRepository;

    // api to get all comments by postId By Alfiya Khan on 26/4/2022
//    @PreAuthorize("hasRole('USER') or hasRole('ADMIN') or hasRole('AUTHOR')")
//    @GetMapping("/post/{postId}/comments")
//    public Page<Comment> getAllCommentsByPostId(@PathVariable (value = "postId") Long postId,
//                                                Pageable pageable) {
//        return commentService.findByPostId(postId, pageable);
//    }
    
//    @PreAuthorize("hasRole('USER') or hasRole('ADMIN') or hasRole('AUTHOR')")
    @GetMapping("/post/{postId}/comments")
    public ResponseEntity<?> getAllCommentsByPostId(@PathVariable (value = "postId") Long postId) {
        List<Comment> commentList = commentService.findByPostId(postId);
        return ResponseEntity.ok(commentList);
    }

    // api to add comment to the post By Alfiya Khan on 26/094/2022
    @PostMapping("/post/{postId}/comments")
    public Comment createComment(@PathVariable (value = "postId") Long postId,
                                 @Valid @RequestBody Comment comment) {
    	log.info("comment cntroller "+comment + postId);
        return commentService.saveComment(comment, postId);    }

    // api to update comment by post id By Alfiya Khan on 26/4/2022
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN') or hasRole('AUTHOR')")
    @PutMapping("/post/{postId}/comments/{commentId}")
    public Comment updateComment(@PathVariable (value = "postId") Long postId,
                                 @PathVariable (value = "commentId") Long commentId,
                                 @Valid @RequestBody Comment commentRequest) {
        if(!postRepository.existsById(postId)) {
            throw new ResourceNotFoundException("PostId " + postId + " not found");
        }

        return commentService.updateComment(commentId, commentRequest);
    }

    // api to delete comment by comment id by Alfiya Khan on 26/4/2022
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN') or hasRole('AUTHOR')")
    @DeleteMapping("/post/{postId}/comments/{commentId}")
    public ResponseEntity<?> deleteComment(@PathVariable (value = "postId") Long postId,
                              @PathVariable (value = "commentId") Long commentId) {
        return commentService.delete(commentId, postId);
    }
}