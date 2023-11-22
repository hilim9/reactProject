package org.lhi.models.member;

import lombok.RequiredArgsConstructor;
import org.lhi.api.controllers.members.RequestLogin;
import org.lhi.configs.jwt.TokenProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberLoginService {

    private final TokenProvider tokenProvider;

    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    public String login(RequestLogin form) {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(form.email(), form.password());

        // email, password 체크
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        // 인증 정보를 가지고 JWT 토큰 발급
        String accessToken = tokenProvider.createToken(authentication);

        return accessToken;
    }
}
