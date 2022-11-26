package com.cts.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.cts.model.Post;
import com.cts.model.Tag;

public interface PostService {

	Post addTag(Tag _tag);

	Page<Post> findAllPost(Pageable pageable);

	Optional<Post> findPostById(long id);

	Post savePost(Post post);

	Optional<Post> findById(long id);

	void deletePost(Long id);

	List<Post> findPostByUser(long id);

	Page<Post> findByTagsId(long tagid, Pageable pageable);
}
