package org.lhi.models.member;

import lombok.RequiredArgsConstructor;
import org.lhi.api.controllers.members.JoinValidator;
import org.lhi.api.controllers.members.RequestJoin;
import org.lhi.commons.contants.MemberType;
import org.lhi.entities.Member;
import org.lhi.repositories.MemberRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.Errors;

@Service
@RequiredArgsConstructor
public class MemberSaveService {

    private final MemberRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JoinValidator joinValidator;

    public void save(RequestJoin form, Errors errors) {

        joinValidator.validate(form, errors);
        if (errors.hasErrors()) {
            return;
        }

        // 회원 가입 처리
        String hash = passwordEncoder.encode(form.password());
        Member member = Member.builder()
                .email(form.email())
                .name(form.name())
                .password(form.password())
                .mobile(form.mobile())
                .type(MemberType.USER)
                .build();

        save(member);
    }

    public void save(Member member) {
        String mobile = member.getMobile();
        repository.saveAndFlush(member);
        if (member != null) {
            mobile = mobile.replaceAll("\\D", "");
            member.setMobile(mobile);
        }
    }


}
