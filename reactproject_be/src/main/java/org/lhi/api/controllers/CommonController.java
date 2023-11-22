package org.lhi.api.controllers;

import org.lhi.commons.exceptions.CommonException;
import org.lhi.commons.rests.JSONData;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice("org.lhi.api.controllers")
public class CommonController {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<JSONData> errorHandler(Exception e) {

        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
        Object message = e.getMessage();

        if (e instanceof CommonException) {
            CommonException commonException = (CommonException) e;
            status = commonException.getStatus();

            if (commonException.getMessages() != null) message = commonException.getMessages();

            // 처리 하지 않을 시 500에러를 출력하는 Exception
            // BadCredentialsException  500 -> 401
            // AccessDeniedException  500 -> 403
        } else if (e instanceof BadCredentialsException) {

            status = HttpStatus.UNAUTHORIZED; // 401

        } else if (e instanceof AccessDeniedException) {

            status = HttpStatus.FORBIDDEN; // 403
        }


        JSONData data = new JSONData();
        data.setSuccess(false);
        data.setStatus(status);
        data.setMessage(message);

        e.printStackTrace();

        return ResponseEntity.status(status).body(data);
    }
}
