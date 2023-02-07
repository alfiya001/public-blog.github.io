package com.cts.valueobject;

import java.time.LocalDate;

import com.cts.model.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class UserDto {
	private String firstName;
	private String lastName;
	private String email;
	private String password;
	private LocalDate createdAt;
	private Role role;
}
