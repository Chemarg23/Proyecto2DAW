package com.app;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {

    public static final String CONTENT_PATH = "/tmp/content";
    public static final String SERIES_PATH = "/tmp/series";
    public static final String USERS_PATH = "/tmp/users";
    public static final String CHAT_PATH = "/tmp/chat";

    public static void main(String[] args) {
        mkdir(CONTENT_PATH);
        mkdir(SERIES_PATH);
        mkdir(USERS_PATH);
        mkdir(CHAT_PATH);

        SpringApplication.run(Application.class, args);
    }

    public static void mkdir(String directorio) {
        Path path = Paths.get(directorio);
        if (!Files.exists(path)) {
            try {
                Files.createDirectories(path);
            } catch (IOException e) {
                e.printStackTrace();
            }
        } else {
            System.out.println("El directorio ya existe: " + path);
        }
    }
}
