package com.cts.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cts.model.UserAuthority;

public interface UserAuthorityRepository extends JpaRepository<UserAuthority, Long> {

}
