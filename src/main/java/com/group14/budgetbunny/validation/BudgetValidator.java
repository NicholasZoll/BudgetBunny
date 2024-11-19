// package com.group14.budgetbunny.validation;

// import com.group14.budgetbunny.model.Envelope;
// import jakarta.validation.ConstraintValidator;
// import jakarta.validation.ConstraintValidatorContext;

// public class BudgetValidator implements ConstraintValidator<ValidSpentAmount, Envelope> {

//     @Override
//     public void initialize(ValidSpentAmount constraintAnnotation) {
//         // No initialization logic needed here
//     }

//     @Override
//     public boolean isValid(Envelope envelope, ConstraintValidatorContext context) {
//         // Check that spent amount is less than or equal to budget using compareTo for BigDecimal
//         return envelope.getSpent().compareTo(envelope.getBudget()) <= 0;
//     }
// }

