package com.cts.model;

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
import javax.persistence.OneToOne;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Builder.Default;
import lombok.Data;
import lombok.EqualsAndHashCode.Exclude;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer"})
public class UserLogin implements UserDetails {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	@Column(unique = true)
	private String email;
	private String password;

	@Enumerated(EnumType.STRING)
	private Role role;
	@Exclude
	@ToString.Exclude
	@OneToOne(cascade = CascadeType.REMOVE, orphanRemoval = true)
	@JoinColumn(name = "user_id")
	private AppUser user;
	@Exclude
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "User_Role", joinColumns = @JoinColumn(name = "User_Id"), inverseJoinColumns = @JoinColumn(name = "Role_Id"))
	@Default
	private List<UserAuthority> authorities = new ArrayList<>();

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	@Override
	public String getUsername() {
// TODO Auto-generated method stub
		return email;
	}

}
