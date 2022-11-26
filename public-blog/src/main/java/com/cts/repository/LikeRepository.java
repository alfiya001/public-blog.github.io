package com.cts.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.cts.model.LikePost;

public interface LikeRepository extends JpaRepository<LikePost, Long> {

	List<LikePost> findByPost(long id);
	
	@Query(value = "select count(*) from likewhere name id=:id", nativeQuery = true)
	Long countByLikePostId(@Param("id") Long id);

}