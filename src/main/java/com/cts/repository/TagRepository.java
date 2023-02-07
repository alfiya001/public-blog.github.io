package com.cts.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.cts.model.Tag;

public interface TagRepository extends PagingAndSortingRepository<Tag, Long> {
//	List<Tag> findTagsByPostsId(Long postId);
	
}