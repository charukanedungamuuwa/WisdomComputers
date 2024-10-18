package com.example.WisdomComputerTechnologies.DAO;

import com.example.WisdomComputerTechnologies.Model.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface UserInfoDAO extends JpaRepository<UserInfo,Integer> {

    Optional<UserInfo> findByEmail(String email); // Use 'email' if that is the correct field for login
    Optional<UserInfo> findByName(String name); // Use 'email' if that is the correct field for login


}
