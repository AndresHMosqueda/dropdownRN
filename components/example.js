// To log the request payload (request body) in addition to the URL and response status, 
// you can further customize the log output by implementing a custom `ExchangeFilterFunction`. 
// This allows you to intercept and log the request payload before it is sent.

// Here's an example of how you can achieve this:

// ```java
// import org.slf4j.Logger;
// import org.slf4j.LoggerFactory;
// import org.springframework.http.HttpHeaders;
// import org.springframework.http.HttpMethod;
// import org.springframework.web.reactive.function.BodyInserters;
// import org.springframework.web.reactive.function.client.ExchangeFilterFunction;
// import org.springframework.web.reactive.function.client.WebClient;

// public class Main {
//     private static final Logger LOGGER = LoggerFactory.getLogger(Main.class);

//     public static void main(String[] args) {
//         WebClient webClient = WebClient.builder()
//                 .filter(logRequestPayload())
//                 .build();

//         webClient.post()
//                 .uri("https://api.example.com/endpoint")
//                 .body(BodyInserters.fromValue("Request payload"))
//                 .retrieve()
//                 .toBodilessEntity()
//                 .subscribe(responseEntity -> LOGGER.info("Response status: {}", responseEntity.getStatusCode()));
//     }

//     private static ExchangeFilterFunction logRequestPayload() {
//         return ExchangeFilterFunction.ofRequestProcessor(clientRequest -> {
//             LOGGER.info("Request URL: {}", clientRequest.url());
//             LOGGER.info("Request Method: {}", clientRequest.method());
//             LOGGER.info("Request Headers: {}", clientRequest.headers());
//             LOGGER.info("Request Payload: {}", clientRequest.body());

//             return clientRequest.exchange();
//         });
//     }
// }
// ```

// In this example, we define a custom `ExchangeFilterFunction` called `logRequestPayload()` that intercepts the outgoing requests and logs the URL, method, headers, and payload before the request is executed. The `ExchangeFilterFunction` is applied to the `WebClient` using the `filter()` method during its construction.

// Note that this example demonstrates logging the request payload for a POST request. If you have different types of requests or payloads, you can adapt the code accordingly.

// By implementing and applying this custom `ExchangeFilterFunction`, you should be able to log the request payload along with the URL and response status in your log output.