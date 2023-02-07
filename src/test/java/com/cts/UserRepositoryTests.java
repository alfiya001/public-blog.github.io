package com.cts;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.LocalDate;
import java.time.Month;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import com.cts.model.Role;
import com.cts.model.AppUser;
import com.cts.valueobject.UserDto;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;


@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)


@AutoConfigureMockMvc
public class UserRepositoryTests {
	
@Autowired
private MockMvc mockMvc;


@Autowired
ObjectMapper objectMapper;


@Test
@WithMockUser(username="admin",roles = {"ADMIN"})


public void saveUserTest() throws JsonProcessingException, Exception {
	
//Role role = Role.builder().name("Author").build();

//Project project = Project.builder().name("HMS").build();
UserDto user = UserDto.builder()


.firstName("Sourav")
.lastName("Pardeshi")
.email("sourav@gmail.com")
.password("12345")
.createdAt(LocalDate.of(2001, Month.JANUARY, 22))
.role(Role.ADMIN)
.build();
mockMvc.perform(post("/register").contentType(MediaType.APPLICATION_JSON)
.content(objectMapper.writeValueAsString(user))).andExpect(status().isCreated());
}
}

