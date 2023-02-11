package com.ssafy.stackers.handler;

import com.ssafy.stackers.utils.error.ErrorResponse;
import jakarta.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.validator.internal.engine.ConstraintViolationImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@Slf4j
@ControllerAdvice
public class ValidationExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(value = {ConstraintViolationException.class})
    protected ResponseEntity<?> handleConstraintViolation(ConstraintViolationException e) {
        ConstraintViolationImpl constraintViolation =
            (ConstraintViolationImpl) e.getConstraintViolations().stream().findFirst().get();
        return ErrorResponse.toResponseEntity(HttpStatus.BAD_REQUEST,
            e.getClass().getSimpleName(),
            constraintViolation.getMessage());
    }
}