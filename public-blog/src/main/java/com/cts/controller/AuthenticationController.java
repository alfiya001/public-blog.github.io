package com.cts.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cts.errors.ErrorMessage;
import com.cts.model.AppUser;
import com.cts.model.UserLogin;
import com.cts.repository.UserLoginRepository;
import com.cts.service.UserAuthenticationProvider;
import com.cts.service.UserService;
import com.cts.util.JwtUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.security.authentication.AuthenticationManager;
@Slf4j
@RestController
@RequiredArgsConstructor
@CrossOrigin
public class AuthenticationController {
	
//	@Autowired
//	private AuthenticationManager authenticationManager;
	
	private final UserAuthenticationProvider authenticationProvider;
	private final JwtUtil jwtUtil;

	private final UserService userService;
	
//	@CacheEvict(value = "users", key = "#appUser.username")
	@PostMapping("/authenticate")
	public ResponseEntity<?> user(@RequestBody UserLogin user) {
		log.info("User {} loggin in", user);
		Authentication toAuthenticate = new UsernamePasswordAuthenticationToken(user.getEmail(),
				user.getPassword());
		log.info("authenticate : "+toAuthenticate);
		try {
			final Authentication authenticatedUser = authenticationProvider.authenticate(toAuthenticate);
			
			UserLogin userDetails = userService.findByEmail(user.getEmail());
			log.info("user: "+ user.getRole()+" userDetails : "+authenticatedUser.getAuthorities());
			if(user.getRole().equals(userDetails.getRole())) {
				String token = jwtUtil.generateToken(authenticatedUser);
				return ResponseEntity.ok()
						.body(ErrorMessage.builder()
								.message(token)
								.build());
			}
			else {
				return ResponseEntity.badRequest()
						.body(ErrorMessage.builder()
								.message("User Type doesn't matched")
								.build());
			}
			
		} catch (BadCredentialsException e) {
			log.info("Exception {}", e.getMessage());
			return ResponseEntity.badRequest()
					.body(ErrorMessage.builder()
							.message(e.getMessage())
							.build());
		}
	}
	
//	@CacheEvict(value = "users", key = "#username")
	@GetMapping("/logout/{username}")
	public ResponseEntity<?> logout(@PathVariable String username) {
		log.info("User {} logged out", username);
		return ResponseEntity.ok()
				.build();
	}
}

