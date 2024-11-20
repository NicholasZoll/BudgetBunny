package com.group14.budgetbunny;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.ResponseEntity;
import static org.assertj.core.api.Assertions.assertThat;
import org.springframework.test.context.ActiveProfiles;


@ActiveProfiles("test")
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class WebPagesTests {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    void homePageShouldContainDashboardTitle() {
        String url = "http://localhost:" + port + "/";
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

        assertThat(response.getStatusCode().is2xxSuccessful()).isTrue();
        assertThat(response.getBody()).contains("Dashboard");
    }

    @Test
    void loginPageShouldContainLoginTitle() {
        String url = "http://localhost:" + port + "/loginaccount.html";
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

        assertThat(response.getStatusCode().is2xxSuccessful()).isTrue();
        assertThat(response.getBody()).contains("Sign in");
    }

    @Test
    void createAccountPageShouldContainCreateAccountTitle() {
        String url = "http://localhost:" + port + "/createaccount.html";
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

        assertThat(response.getStatusCode().is2xxSuccessful()).isTrue();
        assertThat(response.getBody()).contains("Create an Account");
    }

    @Test
    void addEditPageShouldContainAddEditTitle() {
        String url = "http://localhost:" + port + "/addedit.html";
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

        assertThat(response.getStatusCode().is2xxSuccessful()).isTrue();
        assertThat(response.getBody()).contains("Envelopes");
    }

    @Test
    void addTransactionPageShouldContainAddTransactionTitle() {
        String url = "http://localhost:" + port + "/addtransaction.html";
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

        assertThat(response.getStatusCode().is2xxSuccessful()).isTrue();
        assertThat(response.getBody()).contains("Add Transaction");
    }

    @Test
    void editTransactionsPageShouldContainEditTitle() {
        String url = "http://localhost:" + port + "/edittransaction.html";
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

        assertThat(response.getStatusCode().is2xxSuccessful()).isTrue();
        assertThat(response.getBody()).contains("Edit");
    }

    @Test
    void fillEnvelopePageShouldContainfillTitle() {
        String url = "http://localhost:" + port + "/fillenvelope.html";
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

        assertThat(response.getStatusCode().is2xxSuccessful()).isTrue();
        assertThat(response.getBody()).contains("Fill");
    }

    @Test
    void helpPageShouldContainTitle() {
        String url = "http://localhost:" + port + "/helppage.html";
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

        assertThat(response.getStatusCode().is2xxSuccessful()).isTrue();
        assertThat(response.getBody()).contains("Phone");
    }

    @Test
    void learnPageShouldContainTitle() {
        String url = "http://localhost:" + port + "/learnpage.html";
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

        assertThat(response.getStatusCode().is2xxSuccessful()).isTrue();
        assertThat(response.getBody()).contains("Tips");
    }

    @Test
    void accountSettingsPageShouldContainTitle() {
        String url = "http://localhost:" + port + "/accountsettings.html";
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

        assertThat(response.getStatusCode().is2xxSuccessful()).isTrue();
        assertThat(response.getBody()).contains("Change");
    }
}
