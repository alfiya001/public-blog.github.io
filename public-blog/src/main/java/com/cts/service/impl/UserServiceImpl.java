package com.cts.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.cts.model.Role;
import com.cts.model.AppUser;
import com.cts.model.UserInfo;
import com.cts.model.UserLogin;
import com.cts.repository.UserLoginRepository;
import com.cts.repository.UserRepository;
import com.cts.service.UserService;
import com.cts.valueobject.UserDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {
	
	private final UserRepository userRepository;
	
	private final UserLoginRepository userLoginRepository;

	@Override
	public List<AppUser> findAllUsers() {
		log.info("findAllUsers Service");
		return userRepository.findAll();
	}

	@Override
	public Optional<AppUser> findUserById(long id) {
		log.info("findUserById Service");
		return userRepository.findById(id);
	}

	@Override
	public AppUser saveUser(AppUser user) {
		log.info("saveUser Service");
		return userRepository.save(user);
	}

	@Override
	public void deleteUser(AppUser user) {
		log.info("deleteUser Service");
		userRepository.delete(user);
	}

	@Override
	public UserLogin findByEmail(String email) {
		log.info("findByEmail Service");
		return userLoginRepository.findByEmail(email).get();
	}

	@Override
	public List<UserLogin> findByRole(Role role) {
		log.info("findByRole Service");
		List<UserLogin> findByRole = userLoginRepository.findByRole(role);
		log.info("return::"+findByRole);
		return findByRole;
	}


}
