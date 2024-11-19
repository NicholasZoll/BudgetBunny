// package com.group14.budgetbunny.validation;

// import jakarta.validation.Constraint;
// import jakarta.validation.Payload;
// import java.lang.annotation.ElementType;
// import java.lang.annotation.Retention;
// import java.lang.annotation.RetentionPolicy;
// import java.lang.annotation.Target;

// @Constraint(validatedBy = BudgetValidator.class) 
// @Target({ ElementType.FIELD, ElementType.METHOD, ElementType.PARAMETER, ElementType.ANNOTATION_TYPE })
// @Retention(RetentionPolicy.RUNTIME)
// public @interface ValidSpentAmount {
//     String message() default "Spent amount cannot exceed the budget";
//     Class<?>[] groups() default {};
//     Class<? extends Payload>[] payload() default {};

// }