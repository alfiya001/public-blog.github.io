package com.cts.service.impl;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.cts.model.AppUser;
import com.cts.model.UserLogin;
import com.cts.repository.UserLoginRepository;
import com.cts.repository.UserRepository;
import com.cts.service.AuthenticationService;
import com.cts.service.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class AuthenticationServiceImpl implements AuthenticationService {

	private final UserService userService;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		log.info("Loading UserDetails for username {}", email);
//		UserLogin user = repository.findByEmail(email);
//		if(user==null) {
//			throw new UsernameNotFoundException("User404"); 
//		}
		return userService.findByEmail(email);
	}

}
