// package com.group14.budgetbunny;

// import org.junit.jupiter.api.BeforeAll;
// import org.junit.jupiter.api.Test;
// import org.springframework.boot.test.context.SpringBootTest;
// import org.springframework.test.context.ActiveProfiles;
// import org.springframework.test.context.TestPropertySource;
// import io.github.cdimascio.dotenv.Dotenv;

// @SpringBootTest
// @ActiveProfiles("test")
// @TestPropertySource(properties = {
//     "spring.datasource.url=${DATABASE_URL}",
//     "spring.datasource.username=${DATABASE_USERNAME}",
//     "spring.datasource.password=${DATABASE_PASSWORD}"
// })
// class BudgetbunnyApplicationTests {

//     @BeforeAll
//     static void setUp() {
//         Dotenv dotenv = Dotenv.configure().load();
//         System.setProperty("DATABASE_URL", dotenv.get("DATABASE_URL"));
//         System.setProperty("DATABASE_USERNAME", dotenv.get("DATABASE_USERNAME"));
//         System.setProperty("DATABASE_PASSWORD", dotenv.get("DATABASE_PASSWORD"));
//     }

//     @Test
//     void contextLoads() {
//         // This test will pass if the application context loads successfully
//     }

	
// }
