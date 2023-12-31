package ru.kata.spring.boot_security.demo.dao;


import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.kata.spring.boot_security.demo.model.User;

import java.util.Optional;

@Repository
public interface UserDao extends JpaRepository<User, Long> {

    User findByUsername(String username);

    @Override
    Optional<User> findById(Long id);
}