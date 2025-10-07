package com.example;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class TestTerminalHandler extends TextWebSocketHandler {

    private final Map<String, Process> sessionProcesses = new ConcurrentHashMap<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        // Start bash for running tests
        ProcessBuilder processBuilder = new ProcessBuilder(
                "/usr/bin/script",
                "-qfc",
                "/bin/bash --norc --noprofile",
                "/dev/null"
        );
        processBuilder.redirectErrorStream(true);
        processBuilder.directory(new File("/app/exercises/src/test/java/com/example")); // Start in test directory

        Map<String, String> env = processBuilder.environment();
        env.put("TERM", "xterm-256color");
        env.put("PS1", "$ ");
        env.put("HOME", "/app/exercises/src/test/java/com/example");  // Set HOME for tests

        Process process = processBuilder.start();
        sessionProcesses.put(session.getId(), process);

        // Read output from the shell and send to the WebSocket
        new Thread(() -> {
            try (BufferedReader bufferedReader = new BufferedReader(
                    new InputStreamReader(process.getInputStream(), StandardCharsets.UTF_8))) {
                char[] buffer = new char[1024];
                int read;
                while ((read = bufferedReader.read(buffer)) != -1) {
                    String output = new String(buffer, 0, read);
                    if (session.isOpen()) {
                        session.sendMessage(new TextMessage(output));
                    }
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }).start();

        // Send initial message
        session.sendMessage(new TextMessage("Test Terminal - Run 'mvn test' to execute exercises\r\n"));
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        Process process = sessionProcesses.get(session.getId());
        if (process != null && process.isAlive()) {
            OutputStream outputStream = process.getOutputStream();
            outputStream.write(message.getPayload().getBytes(StandardCharsets.UTF_8));
            outputStream.flush();
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        Process process = sessionProcesses.remove(session.getId());
        if (process != null && process.isAlive()) {
            process.destroy();
        }
    }
}
