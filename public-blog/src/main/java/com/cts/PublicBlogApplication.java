package com.cts;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.cts.model.Role;
import com.cts.model.Tag;
import com.cts.model.AppUser;
import com.cts.model.Post;
import com.cts.model.UserAuthority;
import com.cts.model.UserLogin;
import com.cts.repository.PostRepository;
import com.cts.repository.TagRepository;
import com.cts.repository.UserAuthorityRepository;
import com.cts.repository.UserLoginRepository;
import com.cts.repository.UserRepository;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;

import lombok.extern.slf4j.Slf4j;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Slf4j
@SpringBootApplication
@EnableSwagger2
//@OpenAPIDefinition()
public class PublicBlogApplication {

	public static void main(String[] args) {
//		log.info("Log for sprint1");
		SpringApplication.run(PublicBlogApplication.class, args);
	}

	@Bean
	public BCryptPasswordEncoder encoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	CommandLineRunner init(BCryptPasswordEncoder encoder, UserLoginRepository userLoginRepository, UserRepository userRepository,
			 PostRepository postRepository, TagRepository tagRepository, UserAuthorityRepository authorityRepository) {
		return args -> {

			Arrays.asList(UserAuthority.builder()
					.authority("ADMIN")
					.build(),
					UserAuthority.builder()
							.authority("USER")
							.build(),
					UserAuthority.builder()
							.authority("AUTHOR")
							.build())
					.forEach(at -> authorityRepository.save(at));

			List<UserAuthority> authorities = authorityRepository.findAll();

			UserAuthority roleUser = authorities.stream()
					.filter(authority -> authority.getAuthority()
							.equals("ADMIN"))
					.findFirst()
					.get();

			LocalDateTime localDateTime = LocalDateTime.now();
			AppUser user = AppUser.builder()
					.firstName("admin")
					.lastName("Admin")
					.createdAt(localDateTime.toLocalDate())	
					.build();
			userRepository.save(user);
			
			UserLogin userLogin = UserLogin.builder()
					.email("admin1@gmail.com")
					.password(encoder.encode("Admin@123"))
					.role(Role.ADMIN)					
					.authorities(authorities)
					.user(user)
					.build();
			userLoginRepository.save(userLogin);


//			
//			AppUser usera = AppUser.builder()
//					.firstName("Alfiya")
//					.lastName("Khan")
//					.createdAt(localDateTime.toLocalDate())	
//					.build();
//			userRepository.save(usera);
//			
//			UserLogin userLogina = UserLogin.builder()
//					.email("auth@gmail.com")
//					.password(encoder.encode("Auth@123"))
//					.role(Role.AUTHOR)			
//					.authorities(authorities)
//					.user(usera)
//					.build();
//			userLoginRepository.save(userLogina);
			

			Tag tag = Tag.builder()
					.name("Food")
					.build();
			tagRepository.save(tag);
			List<Tag> list = new ArrayList<Tag>();
			list.add(tag);
//			Post post = Post.builder()
//					.title("Initial Post")
//					.description("Testing purpose only. qwerty qwerty qwerty qwerty qwerty qwe Testing purpose only. qwerty qwerty qwerty qwerty qwerty qwe")
////					.tags(list)
//					.user(user)
//					.build();
//			postRepository.save(post);
			
			Tag tag2 = Tag.builder()
					.name("Sports")
					.build();
			tagRepository.save(tag2);
			
			Tag tag3 = Tag.builder()
					.name("Technology")
					.build();
			tagRepository.save(tag3);
		};
	}
}
