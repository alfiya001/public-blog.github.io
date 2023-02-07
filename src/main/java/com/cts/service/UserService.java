package com.cts.service;

import java.util.List;
import java.util.Optional;

import com.cts.model.Role;
import com.cts.model.AppUser;
import com.cts.model.UserInfo;
import com.cts.model.UserLogin;
import com.cts.valueobject.UserDto;

public interface UserService {

	List<AppUser> findAllUsers();

	Optional<AppUser> findUserById(long id);

	AppUser saveUser(AppUser user);

	void deleteUser(AppUser user);
	
	UserLogin findByEmail(String email);

	List<UserLogin> findByRole(Role role);

}
