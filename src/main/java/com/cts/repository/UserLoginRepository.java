package com.cts.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.cts.model.Role;
import com.cts.model.UserInfo;
import com.cts.model.UserLogin;

public interface UserLoginRepository extends JpaRepository<UserLogin, Integer> {
	Optional<UserLogin> findByEmail(String email);

//	@Query(nativeQuery = true, value = "SELECT * FROM user us INNER JOIN user_login ul ON us.id = ul.user_id")
//	@Query("SELECT new com.cts.model.UserInfo(us.firstName, u.role, us.lastName, u.email,  us.createdAt) FROM UserLogin u JOIN u.user us WHERE u.role=:userrole")
//	@Query("SELECT new com.cts.model.UserInfo(u.firstName, u.lastName, u.createdAt, ul.email, ul.role) FROM UserLogin ul JOIN ul.user u WHERE ul.role=:userrole")
	List<UserLogin> findByRole(Role userrole);
	
//	@Query(nativeQuery = true, value = "SELECT * FROM registration_master rm INNER JOIN profile_master pm ON rm.u_id = pm.user_id WHERE rm.u_id = ?")
//	public List<UserInfo> findByRole(@Param("userrole") Role userrole);
}

