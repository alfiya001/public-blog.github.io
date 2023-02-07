package com.cts.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.cts.model.Post;

public interface PostRepository extends PagingAndSortingRepository<Post, Long> {

	List<Post> findByUserId(long id);
//	List<Post> findPostsByTagsId(Long tagId);

	Page<Post> findByTagsId(long tagid, Pageable pageable);
	
	
}
