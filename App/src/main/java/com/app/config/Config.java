package com.app.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.app.web.RestExceptionHandler;

/**
 * Clase de configuración que define los beans necesarios para la aplicación.
 */
@Configuration
public class Config implements WebMvcConfigurer{

     @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("*")
                .allowedHeaders("*");
    }

   
    /**
     * Bean que proporciona una instancia de ModelMapper para mapear objetos entre diferentes tipos.
     * @return Instancia de ModelMapper.
     */
    @Bean
    public ModelMapper modelmapper(){
        return new ModelMapper();
    }

    /**
     * Bean que proporciona una instancia de PasswordEncoder para codificar contraseñas.
     * @return Instancia de PasswordEncoder.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Bean que proporciona una instancia de RestExceptionHandler para manejar excepciones en el controlador REST.
     * @return Instancia de RestExceptionHandler.
     */
    @Bean
    public RestExceptionHandler restExceptionHandler() {
        return new RestExceptionHandler();
    }
}
