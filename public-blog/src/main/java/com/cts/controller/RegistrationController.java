package com.cts.controller;

import java.security.Principal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.cts.model.AppUser;
import com.cts.model.UserAuthority;
import com.cts.model.UserLogin;
import com.cts.repository.UserAuthorityRepository;
import com.cts.repository.UserLoginRepository;
import com.cts.repository.UserRepository;
import com.cts.service.UserService;
import com.cts.service.impl.ResponseData;
import com.cts.valueobject.UserDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import java.lang.RuntimeException;

@CrossOrigin(origins = "*")
@Slf4j
@RestController
@RequiredArgsConstructor
public class RegistrationController {

	private final BCryptPasswordEncoder bCryptPasswordEncoder;

	private final UserService userService;

	private final UserAuthorityRepository authorityRepository;

	private final UserLoginRepository userLoginRepository;

	private final UserRepository userRepository;

	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@RequestBody UserDto userDto) {
		log.info("registerUser::" + userDto);
		Optional<UserLogin> finduser = userLoginRepository.findByEmail(userDto.getEmail()); 
		if(finduser.isPresent()) {
			log.info("user already exists::" + userDto.getEmail());
			return ResponseEntity.internalServerError().body("User_Already_Exists");
		}
		LocalDateTime localDateTime = LocalDateTime.now();
		LocalDate localDate = localDateTime.toLocalDate();
		UserAuthority userRole = authorityRepository.findAll().stream().filter(ur -> ur.getAuthority().equals("USER"))
				.findFirst().get();
		UserLogin userLogin = UserLogin.builder().email(userDto.getEmail())
				.password(bCryptPasswordEncoder.encode(userDto.getPassword())).role(userDto.getRole())
				.authorities(Arrays.asList(userRole)).build();
		log.info("userLogin::" + userLogin);
		AppUser user = AppUser.builder().firstName(userDto.getFirstName()).lastName(userDto.getLastName())
				.createdAt(localDate).build();
		log.info("user::" + user);
		AppUser saveUser = userService.saveUser(user);
		log.info("save::" + saveUser);
		userLogin.setUser(saveUser);
		userLoginRepository.save(userLogin);
		return ResponseEntity.ok().build();
	}

	@PreAuthorize("hasRole('USER') OR hasAuthority('ADMIN') or hasAuthority('AUTHOR')")
	@GetMapping("/currentuser")
	public ResponseEntity<?> getLoggedInUser() {
		log.info("Find logged in user");
		String principal = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		UserLogin user = userService.findByEmail(principal);
		log.info("user::"+auth);
		return ResponseEntity.ok(auth.getName());
	}

}
