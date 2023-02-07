package com.cts.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.cts.errors.ErrorMessage;
import com.cts.model.Post;
import com.cts.model.AppUser;
import com.cts.repository.PostRepository;
import com.cts.repository.UserRepository;
import com.cts.service.PostService;
import com.cts.service.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/*
 ************************************Post Rest Controller to create all user API's************************
 * */

@CrossOrigin(origins = "*")
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/post")
public class PostController {

	private final PostService postService;

	private final PostRepository postRepository;

	private final UserService userService;

	// This function is used to get All Posts
//	@PreAuthorize("hasRole('USER') or hasRole('ADMIN') or hasRole('AUTHOR')")
	@GetMapping
	@ResponseBody
	public ResponseEntity<?> getAllPost(Pageable pageable) {
		try {
			log.info(" " + pageable);
			Page<Post> posts = postService.findAllPost(pageable);
			log.info("getAllPost " + posts);
			return ResponseEntity.ok(posts);
		} catch (Exception e) {
			return ResponseEntity.internalServerError().build();
		}

	}

	// This function is used to get Post by id
//	@PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN') or hasAuthority('AUTHOR')")
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<?> getPost(@PathVariable("id") long id) {
		try {
			Optional<Post> post = postService.findPostById(id);

			return post.isPresent() ? ResponseEntity.ok(post.get())
					: ResponseEntity.badRequest().body(ErrorMessage.builder().message("Post not Found").build());

		} catch (Exception e) {
			return ResponseEntity.internalServerError().build();
		}

	}

	// method used to add post
	@PostMapping("/{userId}")
//	@PreAuthorize("hasAuthority('AUTHOR')")
	public ResponseEntity<?> AddPost(@PathVariable Long userId, @RequestBody Post post, Errors errors) {
		try {
			if (errors.hasErrors()) {
				log.info("Validation Errors");
				List<String> errList = new ArrayList<>();
				errors.getFieldErrors().forEach(oe -> errList.add(oe.getField() + ": " + oe.getDefaultMessage()));

				return ResponseEntity.badRequest()
						.body(ErrorMessage.builder().message("Validation Error").errors(errList).build());
			}
			AppUser user = userService.findUserById(userId).get();
			post.setUser(user);
//			AppUser user = userService.findUserById(userId).get();
//			post.setUser(user);)
			post.setCreatedAt(new Date());
			Post savedPost = postService.savePost(post);
			return ResponseEntity.ok().body(ErrorMessage.builder().message("Post Added Successfully").build());
		} catch (Exception e) {
			log.info("Exception: ", e);
			return ResponseEntity.badRequest().body(ErrorMessage.builder().message("Internal Server Error").build());
		}
	}

	// method used to delete post data
//	@PreAuthorize("hasAuthority('ADMIN') or hasAuthority('AUTHOR')")
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deletePost(@PathVariable long id) {
		Post post = Post.builder().id(id).build();
		postRepository.delete(post);
		return ResponseEntity.noContent().build();
	}

	// method used to update post data
	@PatchMapping("/{id}")
	public ResponseEntity<?> updatePost(@RequestBody Post post, @PathVariable long id) {

		Optional<Post> userOptional = postService.findById(id);

		if (userOptional.isEmpty())
			return ResponseEntity.badRequest().body(ErrorMessage.builder().message("Post not found").build());

		post.setId(id);
		try {
			postService.savePost(post);
			return ResponseEntity.ok().header("Location", "").build();
		} catch (Exception e) {
			log.info("Exception: ", e);
			return ResponseEntity.badRequest().body(ErrorMessage.builder().message("Internal Server Error").build());
		}
	}

	// This function is used to get Post by id
//	@PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN') or hasAuthority('AUTHOR')")
//	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
//	@ResponseBody
//	public ResponseEntity<?> getPostBy(@PathVariable("id") long id) {
//		try {
//			Optional<Post> post = postService.findPostById(id);
//
//			return post.isPresent() ? ResponseEntity.ok(post.get())
//					: ResponseEntity.badRequest().body(ErrorMessage.builder().message("Post not Found").build());
//
//		} catch (Exception e) {
//			return ResponseEntity.internalServerError().build();
//		}
//
//	}

	// This function is used to get Post by id
//		@PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN') or hasAuthority('AUTHOR')")
	@RequestMapping(value = "/user/{id}", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<?> getPostByUser(@PathVariable("id") long id) {
		try {
			List<Post> post = postService.findPostByUser(id);

			return ResponseEntity.ok(post);

		} catch (Exception e) {
			return ResponseEntity.internalServerError().build();
		}

	}

	@RequestMapping(value = "/{tagid}/tag", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<?> getPostByTag(@PathVariable("tagid") long tagid, Pageable pageable) {
		try {
			Page<Post> post = postService.findByTagsId(tagid, pageable);

			return ResponseEntity.ok(post);

		} catch (Exception e) {
			return ResponseEntity.internalServerError().build();
		}

	}
}
