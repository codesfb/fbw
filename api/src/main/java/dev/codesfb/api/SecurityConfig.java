package dev.codesfb.api;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Value("${app.admin.user:admin}")
    private String adminUser;

    @Value("${app.admin.password:admin}")
    private String adminPassword;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(Customizer.withDefaults())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        // Libera requisições pre-flight CORS
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        // Rotas públicas
                        .requestMatchers("/health").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/projects/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/media/**").permitAll()
                        .requestMatchers("/openapi.yaml", "/swagger-ui/**", "/v3/api-docs/**").permitAll()
                        // Rotas de administração restritas
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")
                        .anyRequest().authenticated()
                )
                .httpBasic(Customizer.withDefaults())
                .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    public UserDetailsService userDetailsService(PasswordEncoder passwordEncoder) {
        UserDetails admin = User.builder()
                .username(adminUser)
                .password(passwordEncoder.encode(adminPassword))
                .roles("ADMIN")
                .build();
        return new InMemoryUserDetailsManager(admin);
    }
}
