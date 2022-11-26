package com.cts.model;

import java.time.LocalDate;

import com.cts.valueobject.UserDto;

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
public class UserInfo {
	
	private String firstName;
	private String lastName;
	private LocalDate createdAt;
	private String email;
	private Role role;

}
