package com.robo.helloworld.config;

import com.robo.helloworld.service.security.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        return bCryptPasswordEncoder;
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.csrf().disable();

//        http.authorizeRequests().antMatchers("/", "/login", "/logout").permitAll();
//
//        http.authorizeRequests().antMatchers("/editTMP").access("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')");
//        http.authorizeRequests().antMatchers("/saveTMP").access("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')");
//        http.authorizeRequests().antMatchers("/addNewSpend").access("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')");
//        http.authorizeRequests().antMatchers("/deleteSpend").access("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')");
//        http.authorizeRequests().antMatchers("/createNewMonth").access("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')");
//        http.authorizeRequests().antMatchers("/currentMonth").access("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')");
//        http.authorizeRequests().antMatchers("/saveExistingMonth").access("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')");
//        http.authorizeRequests().antMatchers("/salary").access("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')");
//        http.authorizeRequests().antMatchers("/saveNewSalary").access("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')");
//        http.authorizeRequests().antMatchers("/editExistSalary").access("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')");
//        http.authorizeRequests().antMatchers("/delSalary").access("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')");
//        http.authorizeRequests().antMatchers("/admin").access("hasRole('ROLE_ADMIN')");

        http.authorizeRequests().and().exceptionHandling().accessDeniedPage("/403");

        http.authorizeRequests().and().formLogin()
                .loginProcessingUrl("/j_spring_security_check") // Submit URL
                .loginPage("/login")//
                .defaultSuccessUrl("/currentMonth")//
                .failureUrl("/login?error=true")//
                .usernameParameter("username")//
                .passwordParameter("password")
                .and().logout().logoutUrl("/logout").logoutSuccessUrl("/login");

    }

//    @Bean
//    public PersistentTokenRepository persistentTokenRepository() {
//        JdbcTokenRepositoryImpl db = new JdbcTokenRepositoryImpl();
//        db.setDataSource(dataSource);
//        return db;
//    }

}
