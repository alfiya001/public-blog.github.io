package com.cts.model;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotEmpty;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Builder.Default;
import lombok.Data;
import lombok.NoArgsConstructor;

import lombok.EqualsAndHashCode.Exclude;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AppUser{

		@Id
		@GeneratedValue(strategy = GenerationType.AUTO)
		private Long id;
		
		
		@NotNull
		private String firstName;
		
		
		private String lastName;
		
//		@NotNull
//		@Column(unique = true)
//		private String email;
//		
//		@NotNull
//		@JsonProperty( access = Access.WRITE_ONLY)
//		private String password;
		
		private LocalDate createdAt;
//		
//		@Enumerated(EnumType.STRING)
//		private Role role;

		

		@JsonIgnore
		@OneToMany(mappedBy = "user")
		private List<Post> posts;
		
//		@ManyToMany(mappedBy = "app_user", cascade = { CascadeType.ALL })
//		private List<Post> posts;
		
		
//		@Override
//		public Collection<? extends GrantedAuthority> getAuthorities() {
//			// TODO Auto-generated method stub
//			return null;
//		}


}
