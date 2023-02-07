package com.cts.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.cts.errors.ErrorMessage;
import com.cts.model.Role;
import com.cts.model.AppUser;
import com.cts.model.UserInfo;
import com.cts.model.UserLogin;
import com.cts.repository.UserLoginRepository;
import com.cts.repository.UserRepository;
import com.cts.service.UserService;
import com.cts.valueobject.UserDto;

/*
 ************************************User Rest Controller to create all user API's - 4/7/2022************************
 * */

@CrossOrigin(origins = "*")
@Slf4j
@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

	private final UserService userService;
	
	private final UserLoginRepository loginRepository;

	// This function is used to get All Users
	@PreAuthorize("hasAuthority('ADMIN')")
	@RequestMapping(method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<List<AppUser>> getAllUsers() {
		log.info("findAllUsers Controller");
		try {
			List<AppUser> users = userService.findAllUsers();

			return ResponseEntity.ok(users);
		} catch (Exception e) {
			return ResponseEntity.internalServerError().build();
		}

	}

	// This function is used to get All Users
	@PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN') or hasAuthority('AUTHOR')")
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<?> getUser(@PathVariable("id") long id) {
		log.info("getUser Controller");
		try {
			Optional<AppUser> user = userService.findUserById(id);

			return user.isPresent() ? ResponseEntity.ok(user.get())
					: ResponseEntity.badRequest().body(ErrorMessage.builder().message("User not Found").build());

		} catch (Exception e) {
			return ResponseEntity.internalServerError().build();
		}

	}

	// This function is used to delete User
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteUser(@PathVariable long id) {
		log.info("deleteUser Controller");
		AppUser user = AppUser.builder().id(id).build();
		userService.deleteUser(user);
		
		return ResponseEntity.ok().body(ErrorMessage.builder().message("User Deleted").build());
	}

	// This function is used to get user by id
	@PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN') or hasAuthority('AUTHOR')")
	@PatchMapping("/{id}")
	public ResponseEntity<?> updateUser(@RequestBody AppUser user, @PathVariable long id) {
		log.info("updateUser Controller");

		Optional<AppUser> userOptional = userService.findUserById(id);

		if (userOptional.isEmpty())
			return ResponseEntity.badRequest().body(ErrorMessage.builder().message("User not found").build());

		user.setId(id);
		try {
			userService.saveUser(user);
			return ResponseEntity.ok().header("Location", "").build();
		} catch (Exception e) {
			log.info("Exception: ", e);
			return ResponseEntity.badRequest().body(ErrorMessage.builder().message("Internal Server Error").build());
		}
	}

	// This function is used to get User by email
	@PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN') or hasAuthority('AUTHOR')")
	@RequestMapping(value = "/email/{email}", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<?> getByEmail(@PathVariable String email) {
		log.info("getByEmail Controller"+email);
		try {
			UserLogin findByEmail = userService.findByEmail(email);

			return ResponseEntity.ok(findByEmail);
		} catch (Exception e) {
			return ResponseEntity.internalServerError().build();
		}

	}

	// This function is used to get User by email
//	@PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN') or hasAuthority('AUTHOR')")
	@RequestMapping(value = "/userrole/{role}", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<?> getByRole(@PathVariable Role role) {
		log.info("getByRole Controller"+role);
		try {
			List<UserLogin> userList = userService.findByRole(role);

			return ResponseEntity.ok(userList);
		} catch (Exception e) {
			return ResponseEntity.internalServerError().build();
		}

	}
}
