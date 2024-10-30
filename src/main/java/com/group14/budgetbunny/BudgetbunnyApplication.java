package com.group14.budgetbunny;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories("group14")
@ComponentScan(basePackages = { "group14" })
@EntityScan("group14")
public class BudgetbunnyApplication {
    public static void main(String[] args) {
        SpringApplication.run(BudgetbunnyApplication.class, args);
    }
    
}
