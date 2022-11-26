package com.cts.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.cts.model.Comment;
import com.cts.model.LikePost;
import com.cts.model.Post;
import com.cts.model.Tag;
import com.cts.repository.CommentRepository;
import com.cts.repository.LikeRepository;
import com.cts.repository.PostRepository;
import com.cts.service.PostService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class PostServiceImpl implements PostService {

	private final PostRepository postRepository;
	
	private final CommentRepository commentRepository;
	
	private final LikeRepository likeRepositoy;
	
	@Override
	public Post addTag(Tag tag) {
		Post post = new Post();
		post.getTags().add(tag);
		tag.getPosts().add(post);
		return post;
	}

	@Override
	public Page<Post> findAllPost(Pageable pageable) {
		Page<Post> postList = postRepository.findAll(pageable);
		log.info("findAllPost Service "+postList);
		return postList;
	}

	@Override
	public Optional<Post> findPostById(long id) {
		log.info("findPostById Service");
		return postRepository.findById(id);
	}

	@Override
	public Post savePost(Post post) {
		log.info("savePost Service");
		return postRepository.save(post);
	}

	@Override
	public Optional<Post> findById(long id) {
		log.info("findById Service");
		return postRepository.findById(id);
	}

	@Override
	public void deletePost(Long id) {
		log.info("deletePost Service"+id);
		List<Comment> comment = commentRepository.findByPostId(id);
		log.info("comment Service"+comment);
//		for (Comment cmt : comment) {
//			commentRepository.deleteById(cmt.getId());
//		}
//		
//		post.setComments(null);
//		
//		List<LikePost> likep = likeRepositoy.findByPost(post.getId());
//		log.info("LikePost Service"+likep);
//		for (LikePost like : likep) {
//			likeRepositoy.deleteById(like.getId());
//		}
//		post.setLikePosts(null);
//		
////		Tag tag = Tag.builder().posts(null)
//		post.setTags(null);
//		postRepository.delete(post);
	}
	

	@Override
	public List<Post> findPostByUser(long id) {
		log.info("findPostById Service");
		return postRepository.findByUserId(id);
	}

	@Override
	public Page<Post> findByTagsId(long tagid, Pageable pageable) {
		return postRepository.findByTagsId(tagid, pageable);
	}

}
