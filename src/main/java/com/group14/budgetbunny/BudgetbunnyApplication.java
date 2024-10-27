package com.group14.budgetbunny;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan(basePackages = "com.group14.budgetbunny.entity")
public class BudgetbunnyApplication {
    public static void main(String[] args) {
        SpringApplication.run(BudgetbunnyApplication.class, args);
    }
}
