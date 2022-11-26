package com.cts.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cts.model.Role;
import com.cts.model.AppUser;

public interface UserRepository extends JpaRepository<AppUser, Long> {

//	List<User> findByRole(Role role);
	
//	Optional<User> findByEmail(String email);
	

//	List<User> findByRole(String role);
}
