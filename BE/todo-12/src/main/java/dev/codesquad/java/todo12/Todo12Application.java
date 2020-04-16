package dev.codesquad.java.todo12;

import dev.codesquad.java.todo12.JWT.JwtInterceptor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableSwagger2
@EnableAspectJAutoProxy
public class Todo12Application implements WebMvcConfigurer{

	public static void main(String[] args) { SpringApplication.run(Todo12Application.class, args); }

	@Bean
	public JwtInterceptor loginInterceptor() {
		return new JwtInterceptor();
	}

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(loginInterceptor())
				.addPathPatterns("/login/test")
				.addPathPatterns("/card/**")
				.addPathPatterns("/category/**")
				.excludePathPatterns("/login");
	}

}


