package org.lhi.configs;


import jakarta.servlet.http.HttpServletResponse;
import org.lhi.configs.jwt.CustomJwtFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.filter.CorsFilter;

@Configuration
@EnableWebSecurity // 기본 웹 보안 활성화
@EnableMethodSecurity // @PreAuthorize 애노테이션 활성화 @PreAuthorize("hasAuthority('ADMIN')) -> 권한부여
public class SecurityConfig {

    @Autowired
    private CorsFilter corsFilter;

    @Autowired
    private CustomJwtFilter customJwtFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(c -> c.disable()) // csrf 사용 X (같은 서버에서만 가져올 수 있기 때문에 불가)
                .addFilterBefore(corsFilter, UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(customJwtFilter, UsernamePasswordAuthenticationFilter.class)
                .sessionManagement(c -> c.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        // 인가 실패시 발생 하는 에러

        // 일반
        http.exceptionHandling(c -> {
           c.authenticationEntryPoint((req, res, e) -> {
               res.sendError(HttpServletResponse.SC_UNAUTHORIZED); // 401 권한 없음
           });

           // 로그인 후 권한이 없을 떄
           c.accessDeniedHandler((req, res, e) -> {
              res.sendError(HttpServletResponse.SC_FORBIDDEN); // 403 금지됨
           });
        });

        //
        http.authorizeHttpRequests(c -> {
          c.requestMatchers(
                  "/api/v1/member", // 회원가입
                  "/api/v1/token").permitAll() // 로그인
                  //"/api/v1/member/exists/**").permitAll() // 존재여부
                  .anyRequest().authenticated(); // 나머지 URL은 모두 회원 인증(토큰 인증)
        });

        return  http.build();

        // SessionCreationPolicy.STATELESS
        // 스프링 시큐리티가 생성하지도 않고 기존의 것을 사용하지도 않음(JWT와 같은 토큰 방식을 쓸때 사용)

    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
