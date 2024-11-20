// package com.group14.budgetbunny;

// import org.junit.jupiter.api.Test;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.context.SpringBootTest;
// import org.springframework.boot.test.web.client.TestRestTemplate;
// import org.springframework.boot.test.web.server.LocalServerPort;
// import org.springframework.http.ResponseEntity;

// import static org.assertj.core.api.Assertions.assertThat;

// @SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
// class HomePageTests {

//     @LocalServerPort
//     private int port;

//     @Autowired
//     private TestRestTemplate restTemplate;

//     @Test
//     void homePageShouldContainDashboardTitle() {
//         String url = "http://localhost:" + port + "/";
//         ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

//         assertThat(response.getStatusCode().is2xxSuccessful()).isTrue();
//         assertThat(response.getBody()).contains("Dashboard");
//     }
// }