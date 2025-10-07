package com.example;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    private final MicroTerminalHandler microTerminalHandler;
    private final TestTerminalHandler testTerminalHandler;

    public WebSocketConfig(MicroTerminalHandler microTerminalHandler,
                          TestTerminalHandler testTerminalHandler) {
        this.microTerminalHandler = microTerminalHandler;
        this.testTerminalHandler = testTerminalHandler;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(microTerminalHandler, "/micro")
                .setAllowedOrigins("*");
        registry.addHandler(testTerminalHandler, "/test")
                .setAllowedOrigins("*");
    }
}