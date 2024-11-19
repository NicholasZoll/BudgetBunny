// package com.group14.controller;

// import java.util.stream.Collectors;

// import org.springframework.http.ResponseEntity;
// import org.springframework.validation.ObjectError;
// import org.springframework.web.bind.MethodArgumentNotValidException;
// import org.springframework.web.bind.annotation.ControllerAdvice;
// import org.springframework.web.bind.annotation.ExceptionHandler;

// @ControllerAdvice
// public class GlobalExceptionHandler {

//     @ExceptionHandler(MethodArgumentNotValidException.class)
//     public ResponseEntity<String> handleValidationExceptions(MethodArgumentNotValidException ex) {
//         String errorMessage = ex.getBindingResult().getAllErrors().stream()
//                                 .map(ObjectError::getDefaultMessage)
//                                 .collect(Collectors.joining(", "));
//         return ResponseEntity.badRequest().body(errorMessage);
//     }
// }
