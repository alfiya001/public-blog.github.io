package com.cts.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.cts.errors.ErrorMessage;
import com.cts.exception.ResourceNotFoundException;
import com.cts.model.Comment;
import com.cts.model.LikePost;
import com.cts.model.Post;
import com.cts.model.Tag;
import com.cts.model.AppUser;
import com.cts.repository.LikeRepository;
import com.cts.repository.PostRepository;
import com.cts.repository.UserRepository;
import com.cts.service.impl.ResponseData;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@CrossOrigin(origins = "*")
@Slf4j
@RestController
@RequiredArgsConstructor
public class LikeController {

	private final LikeRepository likeRepositoy;
	
	private final PostRepository postRepository;


	@Autowired
	private UserRepository userRepository;

	// This function is used to get All Like by alfiya Khan - 25/4/2022
//	@PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN') or hasAuthority('AUTHOR')")
	@GetMapping("/like")
	@ResponseBody
	public ResponseEntity<?> getAllLikes() {
		try {
			List<LikePost> likes = likeRepositoy.findAll();

			return ResponseEntity.ok(likes);
		} catch (Exception e) {
			return ResponseEntity.internalServerError().build();
		}

	}

	// This function is used to get Like by Postid by alfiya Khan - 25/4/2022
	@PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN') or hasAuthority('AUTHOR')")
	@RequestMapping(value = "/like/{postId}", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<?> getLikeByPost(@PathVariable("postId") long postId) {
		try {
			Long likes = likeRepositoy.countByLikePostId(postId);

			return ResponseEntity.ok(likes);

		} catch (Exception e) {
			return ResponseEntity.internalServerError().build();
		}

	}

	// api to like a post by Alfiya Khan on 28/4/2022
	@PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN') or hasAuthority('AUTHOR')")
	@PostMapping("/post/{postId}/like/{userId}")
    public LikePost likePost(@PathVariable (value = "postId") Long postId,
                                 @PathVariable (value = "userId") Long userId) {
		log.info("likerequest: "+userId);
		LikePost likeData = new LikePost();
		Post post = postRepository.findById(postId).get();
		likeData.setPost(post);
		AppUser user = userRepository.findById(userId).get();
		likeData.setUser(user);
		return likeRepositoy.save(likeData);
//        return postRepository.findById(postId).map(post -> {
//        	likeRequest.setPost(post);
//            return likeRepositoy.save(likeRequest);
//        }).orElseThrow(() -> new ResourceNotFoundException("PostId " + postId + " not found"));
    }
}	

