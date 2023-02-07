package com.cts.config;

import com.cts.filter.JwtExceptionHandlerFilter;
import com.cts.filter.JwtRequestFilter;
import com.cts.service.UserAuthenticationProvider;

import lombok.RequiredArgsConstructor;

import org.springframework.cache.CacheManager;
import org.springframework.cache.concurrent.ConcurrentMapCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@RequiredArgsConstructor
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@EnableJpaAuditing
public class UserSecurityConfiguration extends WebSecurityConfigurerAdapter  {

	private final UserAuthenticationProvider provider;
	private final JwtExceptionHandlerFilter exceptionHandlerFilter;
	private final JwtRequestFilter jwtRequestFilter;

	/*
	 * @Override protected void configure(AuthenticationManagerBuilder auth) throws
	 * Exception { auth.authenticationProvider(provider); }
	 */

	@Override
	public void configure(WebSecurity web) throws Exception {
		web.ignoring()
				.antMatchers("/static/**", "/h2-console/**","/docs/**", "/docs/v3/api-docs/**","/swagger-ui/**","/swagger-ui/index.html/**");
	}
	
	@Bean
	public CacheManager cacheManager() {
		return new ConcurrentMapCacheManager("users");
	}
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf()
				.disable()
				.cors()
				.and()
				.authorizeRequests()
				.antMatchers("/register/**", "/static/**", "/authenticate/**", "/swagger-ui**", "/post/**", "/like/**")
				.permitAll()
				.anyRequest()
				.authenticated()
				.and()
				.logout()
				.logoutUrl("/logout")
				.and()
				.sessionManagement()
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS);

		http.addFilterBefore(exceptionHandlerFilter, UsernamePasswordAuthenticationFilter.class)
				.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
	}
	
//	 @Bean
//	    public Docket api() { 
//	        return new Docket(DocumentationType.SWAGGER_2)  
//	          .select()                                  
//	          .apis(RequestHandlerSelectors.any())              
//	          .paths(PathSelectors.any())                          
//	          .build();                                           
//	    }
}
