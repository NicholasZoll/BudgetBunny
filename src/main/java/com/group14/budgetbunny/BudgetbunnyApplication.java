package com.group14.budgetbunny;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
@ComponentScan(basePackages = "com.group14") // Adjust if necessary to match your exact package structure
public class BudgetbunnyApplication {

	public static void main(String[] args) {
		// Load environment variables from .env
		Dotenv dotenv = Dotenv.configure().load();

		// test print
		// System.out.println("Database URL: " + dotenv.get("DATABASE_URL"));
    	// System.out.println("Database Username: " + dotenv.get("DATABASE_USERNAME"));
		// System.out.println("Database Username: " + dotenv.get("DATABASE_PASSWORD"));

		// Set environment variables explicitly if needed (optional step)
		System.setProperty("spring.datasource.url", dotenv.get("DATABASE_URL"));
		System.setProperty("spring.datasource.username", dotenv.get("DATABASE_USERNAME"));
		System.setProperty("spring.datasource.password", dotenv.get("DATABASE_PASSWORD"));

		SpringApplication.run(BudgetbunnyApplication.class, args);
	}

}