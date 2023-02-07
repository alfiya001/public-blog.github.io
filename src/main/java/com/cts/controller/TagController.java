package com.cts.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
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
import com.cts.model.Post;
import com.cts.model.Tag;
import com.cts.model.AppUser;
import com.cts.repository.PostRepository;
import com.cts.repository.TagRepository;
import com.cts.service.PostService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@CrossOrigin(origins = "*")
//@RequestMapping("/tag")
@RequiredArgsConstructor
public class TagController {

	private final PostRepository postRepository;

	private final TagRepository tagRepository;
	
//	@Autowired
//	private PostService postService;

	// This function is used to get All Tags by alfiya Khan - 25/4/2022
	@GetMapping("/tag")
	@ResponseBody
	public ResponseEntity<?> getAllTag() {
		try {
			List<Tag> tags = (List<Tag>) tagRepository.findAll();
			log.info("all tags "+tags)	;		
			return ResponseEntity.ok(tags);
		} catch (Exception e) {
			return ResponseEntity.internalServerError().build();
		}
	}

	// This function is used to get tag by id by alfiya Khan - 25/4/2022
	@PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN') or hasAuthority('AUTHOR')")
	@RequestMapping(value = "/tag/{id}", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<?> getTagById(@PathVariable("id") long id) {
		try {
			Tag tag = tagRepository.findById(id)
					.orElseThrow(() -> new ResourceNotFoundException("Not found Tag with id = " + id));
			return new ResponseEntity<>(tag, HttpStatus.OK);

		} catch (Exception e) {
			return ResponseEntity.internalServerError().build();
		}

	}

	// api to get all the tags of a perticular post by postid By Alfiya Khan on
	// 26/4/2022
//	@GetMapping("/post/{postId}/tags")
//	public ResponseEntity<List<Tag>> getAllTagsByPostId(@PathVariable(value = "postId") Long postId) {
//		if (!postRepository.existsById(postId)) {
//			throw new ResourceNotFoundException("Not found Post with id = " + postId);
//		}
//		List<Tag> tags = tagRepository.findTagsByPostsId(postId);
//		return new ResponseEntity<>(tags, HttpStatus.OK);
//	}

	// api to get all the post of tag by tagid By alfiya Khan on 26/4/2022
	@PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN') or hasAuthority('AUTHOR')")
	@GetMapping("/tags/{tagId}/posts")
	public ResponseEntity<List<Post>> getAllPostByTagId(@PathVariable(value = "tagId") Long tagId) {
		if (!tagRepository.existsById(tagId)) {
			throw new ResourceNotFoundException("Not found Tag  with id = " + tagId);
		}
//		List<Post> posts = postRepository.findPostsByTagsId(tagId);
		Tag tag = tagRepository.findById(tagId).get();
		return new ResponseEntity<>(tag.getPosts(), HttpStatus.OK);
	}

	// api to add tags to the existing Post By Alfiya Khan on 26/4/2022
	@PreAuthorize("hasAuthority('ADMIN') or hasAuthority('AUTHOR')")
	@PostMapping("/posts/{postId}/tags")
	public ResponseEntity<Tag> addTagToPost(@PathVariable(value = "postId") Long postId, @RequestBody Tag tagRequest) {
		Tag tag = postRepository.findById(postId).map(post -> {
			Long tagId = tagRequest.getId();

			// tag is existed
			if (tagId != 0L) {
				Tag _tag = tagRepository.findById(tagId)
						.orElseThrow(() -> new ResourceNotFoundException("Not found Tag with id = " + tagId));
				post.addTag(_tag);
//				Post postData = postService.addTag(_tag);
				postRepository.save(post);
				return _tag;
			}

			// add and create new Tag
			post.addTag(tagRequest);
			return tagRepository.save(tagRequest);
		}).orElseThrow(() -> new ResourceNotFoundException("Not found Post with id = " + postId));
		return new ResponseEntity<>(tag, HttpStatus.CREATED);
	}

	// api to Delete a Tag from a Post By Alfiya Khan on 26/4/2022
	@PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN') or hasAuthority('AUTHOR')")
	@DeleteMapping("/posts/{postId}/tags/{tagId}")
	public ResponseEntity<HttpStatus> deleteTagFromPost(@PathVariable(value = "postId") Long postId,
			@PathVariable(value = "tagId") Long tagId) {
		Post post = postRepository.findById(postId)
				.orElseThrow(() -> new ResourceNotFoundException("Not found Post with id = " + postId));

		post.removeTag(tagId);
		postRepository.save(post);

		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	
	// api to delete a tag By Alfiya Khan on 26/4/2022
	@PreAuthorize("hasAuthority('ADMIN') or hasAuthority('AUTHOR')")
	@DeleteMapping("/tags/{id}")
	public ResponseEntity<HttpStatus> deleteTag(@PathVariable("id") long id) {
		tagRepository.deleteById(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
	
	// api to add tag By Alfiya Khan on 26/4/2022
		@PostMapping()
		@PreAuthorize("hasAuthority('AUTHOR')")
		public ResponseEntity<Tag> addTag(@RequestBody Tag tagRequest) {
			Tag tag = tagRepository.save(tagRequest);
			return new ResponseEntity<>(tag, HttpStatus.CREATED);
		}
}
